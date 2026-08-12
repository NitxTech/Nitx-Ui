"use client";

import React from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Switch } from "../../ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../ui/select";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { useAssetsConfig } from "../context";
import { assetKeys } from "../hooks/use-assets-query";

const qrPositionToClass = (pos: string) => {
  switch (pos) {
    case "top_left":
      return "top-2 left-2";
    case "top_right":
      return "top-2 right-2";
    case "bottom_left":
      return "bottom-2 left-2";
    case "bottom_right":
    default:
      return "bottom-2 right-2";
  }
};

const ensureProtocol = (link: string) => {
  if (!link) return "";
  if (
    link.startsWith("http://") ||
    link.startsWith("https://") ||
    link.startsWith("mailto:") ||
    link.startsWith("tel:")
  ) {
    return link;
  }
  return `https://${link}`;
};

export interface LinkEditorTitleInfo {
  title: string;
  subtitle: string;
  isLoading: boolean;
}

export type LinkEditorProps = (
  | { mode: "create" }
  | { mode: "edit"; linkUuid: string }
) & {
  className?: string;
  /**
   * Reports the page title (link name + created-at line) so the consumer can
   * surface it in its own topbar/header chrome.
   */
  onTitleChange?: (info: LinkEditorTitleInfo) => void;
};

/**
 * Page-content component for the link create/edit flows. Consumers render it
 * from their own route shells (e.g. signage's `assets/links/[id]/page.tsx`)
 * and provide navigation via the AssetsProvider's `navigation` config —
 * saving or cancelling calls `navigation.fromLinksBack()` in create mode.
 */
const LinkEditor = (props: LinkEditorProps) => {
  const { t } = useNitxUiTranslation();
  const { api, spaceUuid, navigation } = useAssetsConfig();
  const queryClient = useQueryClient();

  const linkUuid = props.mode === "edit" ? props.linkUuid : null;
  const { onTitleChange } = props;

  const [loading, setLoading] = React.useState(props.mode === "edit");
  const [saving, setSaving] = React.useState(false);
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [showQR, setShowQR] = React.useState(false);
  const [qrPosition, setQrPosition] = React.useState("bottom_right");

  React.useEffect(() => {
    if (!linkUuid) {
      onTitleChange?.({
        title: t("assets.newLinkPage.newLink"),
        subtitle: t("assets.newLinkPage.createdOn"),
        isLoading: false,
      });
      return;
    }

    let cancelled = false;
    const fetchLink = async () => {
      try {
        setLoading(true);
        onTitleChange?.({ title: "", subtitle: "", isLoading: true });

        const data: any = await api.fetchLink(linkUuid);
        if (cancelled) return;

        setName(data?.name || "");
        // Handle both nested link object and direct url property
        const fetchedUrl = data?.link?.url || data?.url || "";
        setUrl(fetchedUrl);
        setShowQR(!!(data?.link?.is_qr_code ?? data?.is_qr_code));
        setQrPosition(
          data?.link?.qr_code_position || data?.qr_code_position || "bottom_right"
        );

        const createdAt = data?.created_at
          ? new Date(data.created_at).toLocaleString()
          : "";
        onTitleChange?.({
          title: data?.name || t("assets.linkEditPage.link"),
          subtitle: createdAt
            ? t("assets.linkEditPage.addedOn", { date: createdAt })
            : "",
          isLoading: false,
        });
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          toast.error(t("assets.linkEditPage.failedToLoad"));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchLink();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkUuid, api, t]);

  const handleSave = async () => {
    try {
      setSaving(true);
      toast.loading(t("assets.linkEditPage.saving"));

      if (props.mode === "edit") {
        await api.updateLink(props.linkUuid, {
          url: ensureProtocol(url),
          is_qr_code: showQR,
          qr_code_position: qrPosition,
          space_uuid: spaceUuid,
        });
      } else {
        await api.createLink({
          url: ensureProtocol(url),
          is_qr_code: showQR,
          qr_code_position: qrPosition,
        });
      }

      queryClient.invalidateQueries({ queryKey: assetKeys.all(spaceUuid) });
      toast.dismiss();
      toast.success(t("assets.linkEditPage.linkUpdated"));

      if (props.mode === "create") {
        navigation?.fromLinksBack();
      }
    } catch (e) {
      console.error(e);
      toast.dismiss();
      toast.error(t("assets.linkEditPage.saveError"));
    } finally {
      setSaving(false);
    }
  };

  const previewUrl = ensureProtocol(url);

  return (
    <div className="flex flex-col lg:flex-row w-full h-full">
      <div className="w-full lg:w-5/12 p-6 flex flex-col gap-3 mt-4">
        <Label>{t("assets.linkEditPage.url")}</Label>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t("assets.linkEditPage.urlPlaceholder")}
        />

        <div className="w-full flex items-center justify-between gap-2">
          <p className="text-xs">{t("assets.linkEditPage.addQrCode")}</p>
          <Switch checked={showQR} onCheckedChange={(v) => setShowQR(!!v)} />
        </div>
        {showQR && (
          <div className="w-full flex flex-col mt-4 gap-3">
            <Label className="text-sm">
              {t("assets.linkEditPage.qrPosition")}
            </Label>
            <Select value={qrPosition} onValueChange={(v) => setQrPosition(v)}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={t("assets.linkEditPage.selectPosition")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top_left">
                  {t("assets.linkEditPage.topLeft")}
                </SelectItem>
                <SelectItem value="top_right">
                  {t("assets.linkEditPage.topRight")}
                </SelectItem>
                <SelectItem value="bottom_left">
                  {t("assets.linkEditPage.bottomLeft")}
                </SelectItem>
                <SelectItem value="bottom_right">
                  {t("assets.linkEditPage.bottomRight")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button onClick={handleSave} disabled={saving || loading} className="mt-2">
          {saving
            ? t("assets.linkEditPage.savingStatus")
            : t("assets.linkEditPage.saveChanges")}
        </Button>
      </div>

      {/* Link preview (iframe) */}
      <div className="flex-grow w-full h-full bg-muted dark:bg-card relative">
        {previewUrl ? (
          <div className="relative w-full h-full min-h-[320px]">
            <iframe
              key={previewUrl}
              src={previewUrl}
              className="absolute inset-0 w-full h-full"
              title={name || "URL Preview"}
            />
            {showQR && url && (
              <div
                className={`absolute z-10 p-1 ${qrPositionToClass(qrPosition)}`}
              >
                <QRCode value={previewUrl} size={60} />
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full min-h-[320px] flex items-center justify-center text-muted-foreground">
            <p>{t("assets.newLinkModal.previewWillAppearHere")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkEditor;
