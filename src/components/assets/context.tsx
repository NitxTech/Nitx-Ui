"use client";

import * as React from "react";

import { useNitxUiTranslation } from "../../i18n/nitxuilib";
import { useAssetsStore } from "./hooks/use-assets-store";
import { createAssetsApi } from "./lib/create-api";
import {
  DEFAULT_ASSET_IMAGES,
  type AssetImagesMap,
} from "./lib/default-images";
import type {
  AssetsApi,
  AssetsFeatureFlags,
  AssetsNavigation,
  AssetsUploadConfig,
} from "./types";

export interface AssetsProviderProps {
  /**
   * Axios-like client carrying Authorization + X-Space-Uuid. The provider
   * builds the standard AssetsApi from it — the zero-config path.
   */
  client?: any;
  /** Full custom api. Overrides `client`; use for spread-and-override setups. */
  api?: AssetsApi;
  /** Scopes the react-query cache; queries are disabled while undefined. */
  spaceUuid: string | undefined;
  features?: AssetsFeatureFlags;
  /**
   * Upload transport. `endpoint` defaults to `${NEXT_PUBLIC_API_URL}/api/tus`
   * and `companionUrl` to `NEXT_PUBLIC_COMPANION_URL`, so most apps only
   * pass `getAccessToken`.
   */
  upload?: Partial<AssetsUploadConfig>;
  /** Required when `features.links` is enabled. */
  navigation?: AssetsNavigation;
  /** Override any of the bundled card/preview images. */
  images?: Partial<AssetImagesMap>;
  /** Defaults to `true` when the app language is Arabic. */
  rtl?: boolean;
  children: React.ReactNode;
}

export interface AssetsConfig {
  api: AssetsApi;
  spaceUuid: string | undefined;
  features: Required<AssetsFeatureFlags>;
  upload?: AssetsUploadConfig;
  navigation?: AssetsNavigation;
  images: AssetImagesMap;
  rtl: boolean;
}

const DEFAULT_FLAGS: Required<AssetsFeatureFlags> = {
  folders: true,
  links: false,
  canvas: false,
  dragDrop: false,
  upload: true,
};

const AssetsContext = React.createContext<AssetsConfig | null>(null);

export function AssetsProvider({
  client,
  api,
  spaceUuid,
  features,
  upload,
  navigation,
  images,
  rtl,
  children,
}: AssetsProviderProps) {
  const { i18n } = useNitxUiTranslation();
  const language = i18n?.resolvedLanguage ?? i18n?.language;

  // Switching spaces must never show the previous space's directory state.
  const reset = useAssetsStore((s) => s.reset);
  React.useEffect(() => {
    reset();
  }, [spaceUuid, reset]);

  const resolvedApi = React.useMemo<AssetsApi>(() => {
    if (api) return api;
    if (client) return createAssetsApi(client);
    throw new Error("AssetsProvider requires either an `api` or a `client`.");
  }, [api, client]);

  const resolvedUpload = React.useMemo<AssetsUploadConfig | undefined>(() => {
    if (!upload?.getAccessToken) return undefined;
    return {
      endpoint:
        upload.endpoint ?? `${process.env.NEXT_PUBLIC_API_URL}/api/tus`,
      companionUrl:
        upload.companionUrl ??
        process.env.NEXT_PUBLIC_COMPANION_URL ??
        "http://localhost:3020",
      getAccessToken: upload.getAccessToken,
      maxFileSize: upload.maxFileSize,
      allowedFileTypes: upload.allowedFileTypes,
    };
  }, [upload]);

  const value = React.useMemo<AssetsConfig>(
    () => ({
      api: resolvedApi,
      spaceUuid,
      features: { ...DEFAULT_FLAGS, ...features },
      upload: resolvedUpload,
      navigation,
      images: { ...DEFAULT_ASSET_IMAGES, ...images },
      rtl: rtl ?? language?.toLowerCase().startsWith("ar") ?? false,
    }),
    [
      resolvedApi,
      spaceUuid,
      features,
      resolvedUpload,
      navigation,
      images,
      rtl,
      language,
    ],
  );

  return (
    <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>
  );
}

export function useAssetsConfig(): AssetsConfig {
  const context = React.useContext(AssetsContext);
  if (!context) {
    throw new Error("useAssetsConfig must be used within an <AssetsProvider>");
  }
  return context;
}

export function useOptionalAssetsConfig(): AssetsConfig | null {
  return React.useContext(AssetsContext);
}
