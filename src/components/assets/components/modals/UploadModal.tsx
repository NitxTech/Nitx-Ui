"use client";

import React, { useEffect, useState } from "react";
import type Uppy from "@uppy/core";
import Dashboard from "@uppy/react/dashboard";
// Kept as a real import (css is external in tsup) so every consumer's
// bundler loads the Dashboard styles with the component — no app-side
// stylesheet wiring required.
import "@uppy/dashboard/css/style.css";
import { useQueryClient } from "@tanstack/react-query";

import { DrawerDialog } from "../../../ui/drawer-dialog";
import { useNitxUiTranslation } from "../../../../i18n/nitxuilib";
import { useAssetsConfig } from "../../context";
import { useAssetsStore } from "../../hooks/use-assets-store";
import { assetKeys } from "../../hooks/use-assets-query";
import { createAssetUploader } from "../../lib/create-asset-uploader";

export interface AssetsUploadModalProps {
  open: boolean;
  onClose: () => void;
  /** Override the destination folder; defaults to the browser's current folder. */
  folderUuid?: string | null;
  /** Called after a successful upload batch, in addition to query invalidation. */
  onUploadComplete?: () => void;
}

/**
 * Controlled upload modal. All transport configuration (endpoint, token,
 * space, restrictions) comes from the AssetsProvider's `upload` config, so
 * consumers can also mount this outside the assets browser (e.g. reach's
 * email-builder flow) with just `open`/`onClose`.
 */
export function AssetsUploadModal({
  open,
  onClose,
  folderUuid,
  onUploadComplete,
}: AssetsUploadModalProps) {
  const { t } = useNitxUiTranslation();
  const { upload, spaceUuid } = useAssetsConfig();
  const queryClient = useQueryClient();
  const path = useAssetsStore((s) => s.path);
  const [uploader, setUploader] = useState<Uppy | null>(null);

  const currentFolderUuid =
    folderUuid !== undefined ? folderUuid : path[path.length - 1]?.id ?? null;

  useEffect(() => {
    if (!open || !upload || !spaceUuid) {
      return;
    }

    const accessToken = upload.getAccessToken();
    if (!accessToken) {
      return;
    }

    const nextUploader = createAssetUploader({
      uploadEndpoint: upload.endpoint,
      accessToken,
      spaceUuid,
      currentFolderUuid: currentFolderUuid ?? undefined,
      companionUrl: upload.companionUrl ?? "http://localhost:3020",
      maxFileSize: upload.maxFileSize,
      allowedFileTypes: upload.allowedFileTypes,
      messages: {
        fileUploadedSuccessfully: t("assets.uploadModal.fileUploadedSuccessfully"),
        processingUploads: t("assets.uploadModal.processingUploads"),
        filesWillAppear: t("assets.uploadModal.filesWillAppear"),
        uploadFailed: t("assets.uploadModal.uploadFailed"),
        pleaseTryAgain: t("assets.uploadModal.pleaseTryAgain"),
      },
      onUploadComplete: () => {
        queryClient.invalidateQueries({ queryKey: assetKeys.all(spaceUuid) });
        onUploadComplete?.();
      },
      onClose,
    });

    setUploader(nextUploader);

    return () => {
      nextUploader.destroy();
      setUploader(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, upload, spaceUuid, currentFolderUuid, queryClient, t]);

  if (!open || !upload) {
    return null;
  }

  return (
    <DrawerDialog
      size="lg"
      title={t("assets.uploadModal.title")}
      description={t("assets.uploadModal.videoFormatNotice")}
      onClose={onClose}
    >
      <div className="flex w-full flex-col gap-3 px-3 pb-3 lg:gap-5 lg:px-7 lg:pb-7">
        {uploader && (
          <Dashboard uppy={uploader} proudlyDisplayPoweredByUppy={false} />
        )}
      </div>
    </DrawerDialog>
  );
}

export default AssetsUploadModal;
