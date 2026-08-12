"use client";

import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { DrawerDialog } from "../../../ui/drawer-dialog";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Checkbox } from "../../../ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../ui/select";
import { Button } from "../../../ui/button";
import { useNitxUiTranslation } from "../../../../i18n/nitxuilib";
import { useAssetsConfig } from "../../context";
import { assetKeys } from "../../hooks/use-assets-query";

// Helper to map backend value to CSS class
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

interface NewLinkModalProps {
  open: boolean;
  onClose: () => void;
}

const NewLinkModal = ({ open, onClose }: NewLinkModalProps) => {
  const { t } = useNitxUiTranslation();
  const { api, spaceUuid } = useAssetsConfig();
  const queryClient = useQueryClient();

  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isAccessible, setIsAccessible] = useState<boolean | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [qrPosition, setQrPosition] = useState("bottom_right");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      new URL(url);
      setIsValid(true);
    } catch {
      setIsValid(false);
      setIsAccessible(null);
    }
  }, [url]);

  useEffect(() => {
    if (!isValid || !url?.length) return;

    // Iframe embeddability needs a consumer-side proxy; when the adapter
    // doesn't provide one, treat every valid URL as embeddable.
    if (!api.checkIframeAccess) {
      setIsAccessible(true);
      return;
    }

    let cancelled = false;
    api
      .checkIframeAccess(url)
      .then((accessible) => {
        if (!cancelled) setIsAccessible(accessible);
      })
      .catch(() => {
        if (!cancelled) setIsAccessible(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isValid, url, api]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!isValid || !isAccessible) {
      setLoading(false);
      return;
    }
    try {
      toast.loading(t("assets.newLinkModal.creatingLink"));
      await api.createLink({
        url,
        is_qr_code: showQr,
        qr_code_position: qrPosition,
      });

      queryClient.invalidateQueries({ queryKey: assetKeys.all(spaceUuid) });

      toast.dismiss();
      toast.success(t("assets.newLinkModal.linkCreatedSuccessfully"));
      onClose();
      setUrl("");
    } catch (e: any) {
      toast.dismiss();
      if (e?.response?.status === 422 && e?.response?.data?.message) {
        toast.error(e.response.data.errors.url[0]);
      } else {
        toast.error(t("assets.newLinkModal.somethingWentWrong"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerDialog
      size="xl"
      title={t("assets.newLinkModal.title")}
      onClose={onClose}
    >
      <div className=" w-full h-full flex flex-col lg:flex-row">
        <div className="w-full h-full lg:w-1/2 p-5 pt-0 flex flex-col gap-5">
          <form
            onSubmit={handleSubmit}
            className="h-full min-h-[350px] flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="link-url">{t("assets.newLinkModal.url")}</Label>
              <Input
                id="link-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t("assets.newLinkModal.urlPlaceholder")}
                className="mt-1"
              />
            </div>

            {url &&
              (isValid ? (
                isAccessible === null ? (
                  <p className="text-sm text-muted-foreground">
                    {t("assets.newLinkModal.checkingAccessibility")}
                  </p>
                ) : isAccessible ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="show-qr"
                        className="rounded-[4px] border-border focus:ring-2"
                        checked={showQr}
                        onCheckedChange={(checked) => setShowQr(!!checked)}
                      />
                      <Label
                        htmlFor="show-qr"
                        className="cursor-pointer text-base font-medium text-foreground"
                      >
                        {t("assets.newLinkModal.displayQrCode")}
                      </Label>
                    </div>
                    {showQr && (
                      <div className="flex items-center justify-between gap-3 ml-6 rtl:ml-0 rtl:mr-6">
                        <Label
                          htmlFor="qr-position"
                          className="text-sm font-normal text-muted-foreground"
                        >
                          {t("assets.newLinkModal.qrPosition")}
                        </Label>
                        <Select
                          value={qrPosition}
                          onValueChange={(value) => setQrPosition(value)}
                        >
                          <SelectTrigger
                            id="qr-position"
                            className="w-36 rounded-md border-input "
                          >
                            <SelectValue
                              placeholder={t(
                                "assets.newLinkModal.selectPosition"
                              )}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top_left">
                              {t("assets.newLinkModal.topLeft")}
                            </SelectItem>
                            <SelectItem value="top_right">
                              {t("assets.newLinkModal.topRight")}
                            </SelectItem>
                            <SelectItem value="bottom_left">
                              {t("assets.newLinkModal.bottomLeft")}
                            </SelectItem>
                            <SelectItem value="bottom_right">
                              {t("assets.newLinkModal.bottomRight")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-error">
                    {t("assets.newLinkModal.urlCannotBeEmbedded")}
                  </p>
                )
              ) : (
                <p className="text-sm text-error">
                  {t("assets.newLinkModal.invalidUrl")}
                </p>
              ))}

            <Button
              type="submit"
              disabled={!isValid || !isAccessible || loading}
              className="w-full mt-auto"
            >
              {t("assets.newLinkModal.save")}
            </Button>
          </form>
        </div>

        <div className="w-full lg:w-1/2 p-5 border-l rtl:border-l-0 rtl:border-r border-border relative">
          {url && isValid && isAccessible ? (
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-full min-h-60 border rounded-md overflow-hidden relative">
                <iframe
                  src={url}
                  className="w-full h-full lg:aspect-square"
                  title="URL Preview"
                />
                {showQr && (
                  <div
                    className={`absolute p-1 ${qrPositionToClass(qrPosition)}`}
                  >
                    <QRCode value={url} size={64} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center text-muted-foreground">
              <p>{t("assets.newLinkModal.previewWillAppearHere")}</p>
            </div>
          )}
        </div>
      </div>
    </DrawerDialog>
  );
};

export default NewLinkModal;
