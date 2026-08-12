"use client";

import React from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react";

import { Button } from "../../ui/button";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { useAssetsConfig } from "../context";
import type { Asset } from "../types";
import type { AssetsTab } from "../hooks/use-assets-store";

interface AssetsPreviewProps {
  previewAsset: Asset;
  previewIndex: number;
  filteredAssets: Array<Asset>;
  setPreviewAsset: (asset: null | Asset) => void;
  setPreviewIndex: (index: number) => void;
  handlePreviewNavigation: (direction: "prev" | "next") => void;
  type?: AssetsTab;
  onDownload?: (asset: Asset) => void;
}

const AssetsPreview: React.FC<AssetsPreviewProps> = ({
  previewAsset,
  previewIndex,
  filteredAssets,
  setPreviewAsset,
  setPreviewIndex,
  handlePreviewNavigation,
  onDownload,
}) => {
  const { t } = useNitxUiTranslation();
  const { images } = useAssetsConfig();

  const renderMedia = () => {
    if (previewAsset.type === "image") {
      return (
        <img
          src={previewAsset.image.compressed_path}
          alt={previewAsset.name}
          className="max-w-full max-h-[80vh] object-contain"
        />
      );
    }
    if (previewAsset.type === "video") {
      return (
        <video controls className="max-w-full max-h-[80vh]">
          <source
            src={previewAsset.video.compressed_path}
            type={previewAsset.video.mime_type}
          />
        </video>
      );
    }
    if (previewAsset.type === "link") {
      return (
        <div className="bg-card p-4 rounded text-center">
          <p className="mb-2">
            {t("assets.assetsPreview.linkPreview", {
              url: previewAsset.link.url,
            })}
          </p>
          <iframe
            src={previewAsset.link.url}
            className="w-[80vw] h-[70vh] border"
            title="URL Preview"
          />
        </div>
      );
    }
    return (
      <div className="text-white">{t("assets.assetsPreview.notAvailable")}</div>
    );
  };

  const getThumbnailWindow = () => {
    const total = filteredAssets.length;

    if (total <= 4) {
      return [0, total];
    }

    // Keep the window locked to 5 items.
    if (previewIndex <= 1) {
      return [0, 5];
    }

    if (previewIndex >= total - 2) {
      return [total - 5, total];
    }

    return [previewIndex - 2, previewIndex + 3];
  };

  const [start, end] = getThumbnailWindow();

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-[99999] p-0"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
      }}
    >
      <div className="relative w-full h-full max-w-none flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 text-white flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium truncate max-w-md">
              {previewAsset.name}
            </h2>
            <span className="text-sm text-muted-foreground">
              {previewIndex + 1} {t("assets.assetsPreview.of")}{" "}
              {filteredAssets.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onDownload && (
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-card/20"
                onClick={() => onDownload(previewAsset)}
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-card/20"
              onClick={() => setPreviewAsset(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center relative w-full min-h-0 pb-6">
          <button
            className="absolute left-8 top-1/2 -translate-y-1/2 z-10 disabled:opacity-30 disabled:cursor-not-allowed bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            onClick={() => handlePreviewNavigation("prev")}
            disabled={previewIndex === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="flex items-center justify-center w-full h-full max-h-[80vh]">
            {renderMedia()}
          </div>

          <button
            className="absolute right-8 top-1/2 -translate-y-1/2 z-10 disabled:opacity-30 disabled:cursor-not-allowed bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            onClick={() => handlePreviewNavigation("next")}
            disabled={previewIndex === filteredAssets.length - 1}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Footer thumbnails */}
        <div className="w-full pt-6 pb-8 flex-shrink-0">
          <div className="flex items-center justify-center gap-2 overflow-x-auto w-full px-6">
            {filteredAssets.slice(start, end).map((asset, idx) => {
              const actualIndex = start + idx;
              return (
                <button
                  key={asset.uuid}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg outline-none overflow-hidden border-2 transition-all ${
                    actualIndex === previewIndex
                      ? "border-white"
                      : "border-transparent opacity-60 hover:opacity-80"
                  }`}
                  onClick={() => {
                    const index = filteredAssets.findIndex(
                      (a) => a.uuid === asset.uuid
                    );
                    setPreviewAsset(asset);
                    if (index !== -1) {
                      setPreviewIndex(index);
                    }
                  }}
                >
                  {asset.type === "image" && (
                    <img
                      src={asset.image.compressed_path || images.clock}
                      alt={asset.name}
                      className="w-full h-full object-cover bg-yellow-50"
                    />
                  )}
                  {asset.type === "link" && !asset.link.thumbnail_url && (
                    <img
                      src={asset.link.thumbnail_url || images.linkFallback}
                      alt={asset.name}
                      className="w-full h-full object-cover bg-yellow-50"
                    />
                  )}
                  {asset.type === "link" && asset.link.thumbnail_url && (
                    <iframe
                      src={asset.link.url}
                      className="w-full h-full lg:aspect-square"
                      title="URL Preview"
                    />
                  )}
                  {asset.type === "video" && (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  {asset.type === "document" && (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }

  return modalContent;
};

export default AssetsPreview;
