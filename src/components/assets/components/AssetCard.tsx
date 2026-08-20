"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Check, Download, MoreVertical, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { Skeleton } from "../../ui/skeleton";
import { cn } from "../../../lib/utils";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { useAssetsConfig } from "../context";
import { useAssetsStore, type AssetsViewType } from "../hooks/use-assets-store";
import type { Asset } from "../types";

interface AssetCardProps {
  data: Asset;
  viewType: AssetsViewType;
  allowSelect: boolean;
  selected: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onMove: (itemId: string, type: "asset" | "folder") => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  onDelete?: () => void;
  onRename?: (newName: string) => void | Promise<void>;
  onDownload?: (asset: Asset) => void;
  /** Extra action buttons rendered before the options menu (e.g. signage's "send to screen"). */
  renderActions?: (asset: Asset) => React.ReactNode;
}

const RenameIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
  >
    <g clipPath="url(#clip_nitxui_rename)">
      <path
        d="M9.57354 2.76858L10.1915 2.15066C11.2153 1.12686 12.8752 1.12686 13.899 2.15066C14.9228 3.17447 14.9228 4.83438 13.899 5.85818L13.2811 6.4761M9.57354 2.76858C9.57354 2.76858 9.65078 4.08166 10.8094 5.24026C11.968 6.39886 13.2811 6.4761 13.2811 6.4761M9.57354 2.76858L3.89271 8.44941C3.50794 8.83419 3.31555 9.02657 3.15009 9.2387C2.95492 9.48893 2.78759 9.75968 2.65106 10.0462C2.53532 10.289 2.44928 10.5471 2.2772 11.0634L1.54803 13.2509M13.2811 6.4761L7.60023 12.1569C7.21546 12.5417 7.02307 12.7341 6.81094 12.8995C6.56071 13.0947 6.28996 13.2621 6.00348 13.3986C5.76063 13.5143 5.50251 13.6004 4.98628 13.7724L2.79878 14.5016M2.79878 14.5016L2.26406 14.6798C2.01002 14.7645 1.72993 14.6984 1.54058 14.5091C1.35123 14.3197 1.28511 14.0396 1.3698 13.7856L1.54803 13.2509M2.79878 14.5016L1.54803 13.2509"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </g>
    <defs>
      <clipPath id="clip_nitxui_rename">
        <rect
          width="16"
          height="16"
          fill="white"
          transform="translate(0 0.0498047)"
        />
      </clipPath>
    </defs>
  </svg>
);

const MoveIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    viewBox="0 0 18 19"
    fill="none"
  >
    <path
      d="M1.5 9.0498V5.26212C1.5 4.60022 1.5 4.26927 1.55201 3.99359C1.78098 2.78004 2.73023 1.83078 3.94379 1.60182C4.21946 1.5498 4.55041 1.5498 5.21231 1.5498C5.50232 1.5498 5.64732 1.5498 5.78668 1.56284C6.38749 1.61902 6.95739 1.85508 7.42196 2.24019C7.52971 2.32952 7.63224 2.43205 7.83731 2.63712L8.25 3.04981C8.86183 3.66164 9.16775 3.96756 9.53409 4.17137C9.73533 4.28334 9.94879 4.37176 10.1703 4.43489C10.5734 4.5498 11.0061 4.5498 11.8713 4.5498H12.1516C14.1258 4.5498 15.113 4.5498 15.7546 5.1269C15.8136 5.17999 15.8698 5.23616 15.9229 5.29518C16.5 5.93682 16.5 6.92396 16.5 8.89823V10.5498C16.5 13.3782 16.5 14.7924 15.6213 15.6711C14.7426 16.5498 13.3284 16.5498 10.5 16.5498H7.5C4.67157 16.5498 3.25736 16.5498 2.37868 15.6711C1.88879 15.1812 1.67203 14.5249 1.57612 13.5498"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <path
      d="M1.5 11.2998C6.33274 11.2998 4.91726 11.2998 9.75 11.2998M9.75 11.2998L6.65625 9.0498M9.75 11.2998L6.65625 13.5498"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const AssetCard: React.FC<AssetCardProps> = ({
  data,
  viewType,
  allowSelect,
  selected,
  onClick,
  onMove,
  draggable = false,
  onDragStart,
  onDragEnd,
  isDragging = false,
  onDelete,
  onRename,
  onDownload,
  renderActions,
}) => {
  const { t } = useNitxUiTranslation();
  const { features, navigation, images } = useAssetsConfig();

  const documentsImages: Record<string, string> = {
    "application/pdf": images.pdf,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      images.doc,
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      images.ppt,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      images.xls,
  };
  const renamingItemId = useAssetsStore((s) => s.renamingItemId);
  const setRenamingItemId = useAssetsStore((s) => s.setRenamingItemId);

  const isRenaming = renamingItemId === data.uuid;
  const isListLike = viewType === "list" || viewType === "grid-list";

  const [newTitle, setNewTitle] = useState(data.name);
  const [showMenu, setShowMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isCancelledRef = useRef(false);

  useEffect(() => {
    if (!isRenaming) return;

    setNewTitle(data.name);

    const frame = requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [isRenaming, data.name]);

  const handleRename = useCallback(async () => {
    const trimmed = newTitle.trim();
    if (data.name !== trimmed && trimmed !== "") {
      if (onRename) {
        await onRename(trimmed);
      }
    } else {
      setNewTitle(data.name);
    }
    setRenamingItemId(null);
  }, [data.name, newTitle, onRename, setRenamingItemId]);

  const handleBlur = useCallback(() => {
    if (!isCancelledRef.current) {
      handleRename();
    }
    isCancelledRef.current = false;
  }, [handleRename]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        isCancelledRef.current = false;
        handleRename();
        e.currentTarget.blur();
      } else if (e.key === "Escape") {
        isCancelledRef.current = true;
        setRenamingItemId(null);
        setNewTitle(data.name);
        e.currentTarget.blur();
      }
    },
    [handleRename, data.name, setRenamingItemId]
  );

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "relative bg-card rounded-lg p-2 sm:p-2.5 cursor-pointer transition-all border border-opacity-20 shadow-gray-200/20",
          selected
            ? "border-primary bg-primary/10 dark:bg-primary/20"
            : "border-transparent hover:border-border hover:transparent",
          isListLike
            ? "flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4"
            : "",
          isDragging && "opacity-50 scale-95"
        )}
        onClick={!isRenaming && onClick ? onClick : undefined}
        data-asset-id={data.uuid}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div
          className={cn(
            "size-full rounded-[12px] overflow-hidden",
            viewType === "grid"
              ? "flex flex-col "
              : "flex flex-row justify-between xs:flex-row xs:justify-between"
          )}
        >
          <CardHeader className="p-0 w-auto relative min-w-0">
            {data.type === "image" && (
              <img
                src={
                  data.is_ready && data.image?.thumbnail_path
                    ? data.image.thumbnail_path
                    : images.clock
                }
                alt={data.name}
                className={cn(
                  "w-full object-contain rounded-[4px] bg-no-repeat inset-0 shrink-0",
                  allowSelect && "brightness-50",
                  viewType === "grid" ? "h-32 sm:h-40" : "h-20 w-[162px]",
                  !data.is_ready && "bg-amber-50 dark:bg-amber-900/20 p-6 sm:p-10"
                )}
              />
            )}
            {data.type === "link" && (
              <img
                src={
                  data.is_ready && data.link?.thumbnail_url
                    ? data.link?.thumbnail_url || images.linkFallback
                    : images.linkFallback
                }
                className={cn(
                  "w-full object-cover rounded-[4px] min-h-20 min-w-20 bg-no-repeat inset-0 shrink-0",
                  allowSelect && "brightness-50",
                  viewType === "grid" ? "h-32 sm:h-40" : "h-20 w-[162px]"
                )}
                alt={data.name}
              />
            )}
            {data.type === "video" && (
              <>
                <img
                  src={
                    data.is_ready && data.video?.thumbnail_path
                      ? data.video.thumbnail_path
                      : images.clock
                  }
                  alt={data.name}
                  className={cn(
                    "w-full object-contain rounded-[4px] bg-no-repeat inset-0 shrink-0",
                    allowSelect && "brightness-50",
                    viewType === "grid" ? "h-32 sm:h-40" : "h-20 w-[162px]",
                    !data.is_ready &&
                      "bg-amber-50 dark:bg-amber-900/20 p-6 sm:p-10"
                  )}
                />
                {data.is_ready && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={images.videoPlay} alt={"video"} />
                  </div>
                )}
              </>
            )}
            {data.type === "document" && data.document && (
              <img
                src={
                  data.is_ready
                    ? documentsImages[data.document.mime_type] || images.doc
                    : images.clock
                }
                alt={data.name}
                className={cn(
                  "w-full object-contain rounded-[4px] bg-no-repeat inset-0 shrink-0",
                  allowSelect && "brightness-50",
                  viewType === "grid" ? "h-32 sm:h-40" : "h-20 w-[162px]",
                  !data.is_ready && "bg-amber-50 dark:bg-amber-900/20",
                  "object-cover"
                )}
              />
            )}
            {(!data.type ||
              (data.type !== "image" &&
                data.type !== "video" &&
                data.type !== "link" &&
                data.type !== "document")) && (
              <img
                src={images.clock}
                alt={"nitx media"}
                className={cn(
                  "w-full rounded-[4px] bg-no-repeat inset-0 shrink-0 bg-amber-50 dark:bg-amber-900/20 p-10",
                  allowSelect && "brightness-50",
                  viewType === "grid" ? "h-40" : "h-24 w-[162px]"
                )}
              />
            )}
            {allowSelect && (
              <span
                className={cn(
                  "absolute top-2 left-3 size-4 shrink-0 rounded-[6px] flex items-center justify-center border border-border",
                  selected && "border-primary bg-primary text-white"
                )}
              >
                {selected && <Check className="size-3" />}
              </span>
            )}
          </CardHeader>

          <CardContent
            className={cn(
              "w-full p-2 sm:p-3 pr-0 flex justify-between items-center gap-2 sm:gap-3",
              isListLike && "max-w-[calc(100%-90px)]"
            )}
          >
            <div className="flex flex-col w-full max-w-[calc(100%-70px)]">
              {isRenaming ? (
                <Input
                  ref={inputRef}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  onFocus={(e) => e.currentTarget.select()}
                  className="h-7 text-sm"
                  maxLength={50}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <Tooltip>
                  <TooltipTrigger>
                    <h2 className="text-xs sm:text-sm text-left font-bold text-foreground truncate max-w-full pointer-events-none">
                      {data.name}
                    </h2>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-lg">
                    {data.name}
                  </TooltipContent>
                </Tooltip>
              )}
              <p className="text-[10px] sm:text-[11.2px] text-muted-foreground truncate max-w-20 sm:max-w-28 pointer-events-none">
                {data.type === "image" && data.image?.size}
                {data.type === "video" && data.video?.size}
                {data.type === "document" && data.document?.size}
              </p>
            </div>

            <div
              className="relative flex items-center shrink-0 gap-1"
              // Card-level onClick opens the preview; the actions area must not trigger it.
              onClick={(e) => e.stopPropagation()}
            >
              {renderActions?.(data)}

              <DropdownMenu
                open={showMenu}
                onOpenChange={(value) => setShowMenu(value)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger
                      disabled={allowSelect}
                      className="disabled:text-muted-foreground"
                      asChild
                    >
                      <button className="icon ">
                        <MoreVertical className="size-4" />
                      </button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("assets.assetCard.moreOptions")}</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent
                  align="end"
                  className="rounded-[14px]"
                  onCloseAutoFocus={(event) => event.preventDefault()}
                >
                  {data.type !== "link" && (
                    <>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setRenamingItemId(data.uuid);
                        }}
                        className="flex gap-4 rounded-[10px] px-4"
                      >
                        {RenameIcon}
                        {t("assets.assetCard.rename")}
                      </DropdownMenuItem>
                      {features.folders && (
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onMove(data.uuid, "asset");
                          }}
                          className="flex gap-4 rounded-[10px] px-4"
                        >
                          {MoveIcon}
                          {t("assets.assetCard.moveTo")}
                        </DropdownMenuItem>
                      )}
                      {onDownload && (
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            onDownload(data);
                          }}
                          className="flex gap-4 rounded-[10px] px-4"
                        >
                          <Download className="size-4 stroke-[1.5]" />
                          {t("assets.assetCard.download")}
                        </DropdownMenuItem>
                      )}
                    </>
                  )}
                  {data.type === "link" && features.links && navigation && (
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault();
                        navigation.toLinkEdit(data.link.uuid);
                      }}
                      className="flex gap-4 rounded-[10px] px-4 cursor-pointer"
                    >
                      {RenameIcon}
                      {t("assets.assetCard.edit")}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.();
                    }}
                    className="flex gap-4 px-4 rounded-[7px] text-red-500 focus:text-red-600"
                  >
                    <Trash2 /> {t("assets.assetCard.delete")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </div>
      </Card>
    </TooltipProvider>
  );
};

export const AssetCardSkeleton = ({
  viewType,
}: {
  viewType: AssetsViewType;
}) => {
  return (
    <Card
      className={cn(
        "relative bg-card rounded-lg p-2 sm:p-2.5 cursor-pointer transition-all border border-opacity-20 shadow-gray-200/20",
        (viewType === "list" || viewType === "grid-list") &&
          "flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4"
      )}
    >
      <div
        className={cn(
          "size-full rounded-[12px] overflow-hidden",
          viewType === "grid"
            ? "flex flex-col"
            : "flex flex-row justify-between xs:flex-row xs:justify-between"
        )}
      >
        <CardHeader className="p-0 w-auto relative min-w-0">
          <Skeleton
            className={cn(
              "w-full object-contain rounded-[4px] bg-no-repeat inset-0 shrink-0",
              viewType === "grid" ? "h-32 sm:h-40" : "h-20 w-[162px]"
            )}
          />
        </CardHeader>
        <CardContent className="w-full p-2 sm:p-3 pr-0 flex justify-between items-center gap-2 sm:gap-3">
          <div className="flex flex-col gap-1 w-full min-w-0">
            <Skeleton className="w-4/5 h-3 sm:h-4" />
            <Skeleton className="w-3/5 h-2.5 sm:h-3" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="size-7 sm:size-8 rounded-[10px]" />
            <Skeleton className="size-7 sm:size-8 rounded-[10px]" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default AssetCard;
