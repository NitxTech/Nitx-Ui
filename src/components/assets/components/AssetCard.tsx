"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Check,
  Download,
  EllipsisVertical,
  Play,
  Trash2,
} from "lucide-react";

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
import {
  assetCardIconButtonClass,
  assetCardOverlayButtonClass,
  assetListCellMdClass,
  assetListColumnsClass,
  assetListRowClass,
  formatAddedDate,
} from "../lib/card-styles";
import type { Asset } from "../types";
import AssetThumbnail, { type AssetThumbnailKind } from "./AssetThumbnail";

export interface AssetCardProps {
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

/** Grid tile geometry from the design: a near-square photo with 8px corners. */
const GRID_TILE_CLASS = "aspect-[8/7] w-full rounded-[14px]";

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
  // Menu open state is shared across cards so only one can be open at a time.
  const openMenuId = useAssetsStore((s) => s.openMenuId);
  const setOpenMenuId = useAssetsStore((s) => s.setOpenMenuId);

  const isRenaming = renamingItemId === data.uuid;
  const isMenuOpen = openMenuId === data.uuid;
  const isListLike = viewType === "list" || viewType === "grid-list";

  const [newTitle, setNewTitle] = useState(data.name);
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

  /**
   * What the card shows in its media slot. `processing` is the amber
   * "still being prepared" tile; otherwise `src` is the best thumbnail the
   * asset has and `kind` picks the icon drawn if that thumbnail fails.
   */
  const thumbnail = ((): {
    src: string | undefined;
    kind: AssetThumbnailKind;
    processing: boolean;
  } => {
    switch (data.type) {
      case "image":
        return {
          src: data.is_ready ? data.image?.thumbnail_path : undefined,
          kind: "image",
          processing: !data.is_ready,
        };
      case "video":
        return {
          src: data.is_ready ? data.video?.thumbnail_path : undefined,
          kind: "video",
          processing: !data.is_ready,
        };
      case "document":
        return {
          src: data.is_ready
            ? data.document?.thumbnail_path ||
              (data.document && documentsImages[data.document.mime_type]) ||
              images.doc
            : undefined,
          kind: "document",
          processing: !data.is_ready,
        };
      case "link":
        return {
          src:
            (data.is_ready && data.link?.thumbnail_url) || images.linkFallback,
          kind: "link",
          processing: false,
        };
      default:
        return { src: undefined, kind: "document", processing: true };
    }
  })();

  const showPlayBadge = data.type === "video" && data.is_ready;

  const sizeLabel =
    (data.type === "image" && data.image?.size) ||
    (data.type === "video" && data.video?.size) ||
    (data.type === "document" && data.document?.size) ||
    "";

  const renderMedia = (variant: "grid" | "list") => {
    const inGrid = variant === "grid";
    if (thumbnail.processing) {
      return (
        <img
          src={images.clock}
          alt={data.name}
          className={cn(
            "size-full object-contain bg-amber-50 dark:bg-amber-900/20",
            inGrid ? "p-8" : "p-1"
          )}
        />
      );
    }
    return (
      <AssetThumbnail
        src={thumbnail.src}
        alt={data.name}
        kind={thumbnail.kind}
        className={cn(
          "size-full object-cover",
          inGrid && "transition-transform duration-300 group-hover:scale-[1.03]"
        )}
        iconClassName={inGrid ? "size-8 sm:size-10" : "size-3.5"}
      />
    );
  };

  const renderDropdownMenuItems = () => (
    <DropdownMenuContent
      align="end"
      className="rounded-[14px] corner-squircle min-w-[160px] p-1"
      onClick={(e) => e.stopPropagation()}
      onCloseAutoFocus={(event) => event.preventDefault()}
    >
      {data.type !== "link" && (
        <>
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setRenamingItemId(data.uuid);
            }}
            className="flex gap-3 rounded-[8px] px-2.5 py-1.5 cursor-pointer text-xs"
          >
            {RenameIcon}
            <span>{t("assets.assetCard.rename")}</span>
          </DropdownMenuItem>
          {features.folders && (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onMove(data.uuid, "asset");
              }}
              className="flex gap-3 rounded-[8px] px-2.5 py-1.5 cursor-pointer text-xs"
            >
              {MoveIcon}
              <span>{t("assets.assetCard.moveTo")}</span>
            </DropdownMenuItem>
          )}
          {onDownload && (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDownload(data);
              }}
              className="flex gap-3 rounded-[8px] px-2.5 py-1.5 cursor-pointer text-xs"
            >
              <Download className="size-4 stroke-[1.5]" />
              <span>{t("assets.assetCard.download")}</span>
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
          className="flex gap-3 rounded-[8px] px-2.5 py-1.5 cursor-pointer text-xs"
        >
          {RenameIcon}
          <span>{t("assets.assetCard.edit")}</span>
        </DropdownMenuItem>
      )}
      <DropdownMenuSeparator className="my-1" />
      <DropdownMenuItem
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
        className="flex gap-3 rounded-[8px] px-2.5 py-1.5 text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950/40 cursor-pointer text-xs"
      >
        <Trash2 className="size-4 text-red-600" />
        <span>{t("assets.assetCard.delete")}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  const renderMenu = (buttonClass: string) => (
    <DropdownMenu
      open={isMenuOpen}
      onOpenChange={(value) => setOpenMenuId(value ? data.uuid : null)}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger disabled={allowSelect} asChild>
            <button
              type="button"
              className={buttonClass}
              aria-label={t("assets.assetCard.moreOptions")}
              onClick={(e) => e.stopPropagation()}
            >
              <EllipsisVertical className="size-4" aria-hidden />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("assets.assetCard.moreOptions")}</p>
        </TooltipContent>
      </Tooltip>
      {renderDropdownMenuItems()}
    </DropdownMenu>
  );

  // LIST / GRID-LIST VIEW: one 40px row on the shared column template.
  if (isListLike) {
    return (
      <TooltipProvider>
        <div
          className={cn(
            "group relative isolate cursor-pointer transition-colors ps-2 pe-1.5",
            assetListRowClass,
            assetListColumnsClass,
            selected
              ? "border-[#0000FF] bg-blue-50/60 dark:bg-blue-950/30"
              : "hover:border-zinc-300 dark:hover:border-zinc-700",
            isDragging && "opacity-50"
          )}
          onClick={!isRenaming && onClick ? onClick : undefined}
          data-asset-id={data.uuid}
          draggable={draggable}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          {/* Name */}
          <div className="flex items-center gap-2.5 min-w-0">
            {allowSelect && (
              <span
                className={cn(
                  "size-4 shrink-0 rounded-[6px] border flex items-center justify-center",
                  selected
                    ? "border-[#0000FF] bg-[#0000FF] text-white"
                    : "border-zinc-300 bg-white text-transparent dark:border-zinc-600 dark:bg-zinc-900"
                )}
                aria-hidden
              >
                {selected && <Check className="size-3 stroke-[3]" />}
              </span>
            )}
            <div className="relative size-6 shrink-0 rounded-[6px] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              {renderMedia("list")}
            </div>
            {isRenaming ? (
              <Input
                ref={inputRef}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                onFocus={(e) => e.currentTarget.select()}
                className="h-7 rounded-[8px] px-2 text-sm"
                maxLength={50}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate text-start pointer-events-none">
                    {data.name}
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="max-w-lg">
                  {data.name}
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Size */}
          <span
            className={cn(
              assetListCellMdClass,
              "text-xs text-zinc-600 dark:text-zinc-400 truncate"
            )}
          >
            {sizeLabel}
          </span>

          {/* Added date */}
          <span
            className={cn(
              assetListCellMdClass,
              "text-xs text-zinc-600 dark:text-zinc-400 truncate"
            )}
          >
            {formatAddedDate(data.created_at)}
          </span>

          {/* Action */}
          <div
            className="flex items-center justify-end gap-1 shrink-0"
            data-nitxui-card-actions=""
            onClick={(e) => e.stopPropagation()}
          >
            {renderActions?.(data)}
            {renderMenu(assetCardIconButtonClass)}
          </div>
        </div>
      </TooltipProvider>
    );
  }

  // GRID VIEW: an edge-to-edge tile. The name and the menu live in a scrim
  // that appears on hover (always, on a touch screen, which has no hover).
  return (
    <TooltipProvider>
      <div
        className={cn(
          "group relative isolate overflow-hidden cursor-pointer select-none",
          GRID_TILE_CLASS,
          "bg-zinc-100 dark:bg-zinc-900",
          isDragging && "opacity-50 scale-95"
        )}
        onClick={!isRenaming && onClick ? onClick : undefined}
        data-asset-id={data.uuid}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="absolute inset-0 overflow-hidden">
          {renderMedia("grid")}
        </div>

        {showPlayBadge && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="size-9 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center text-white">
              <Play className="size-4 fill-white text-white translate-x-px" />
            </div>
          </div>
        )}

        {/* Selection: a white box with a dark tick at the top-start corner.
            Unselected tiles reveal the empty box on hover. */}
        {allowSelect && (
          <span
            className={cn(
              "absolute top-2.5 start-2.5 z-30 size-[18px] rounded-[6px] bg-white shadow-sm flex items-center justify-center transition-opacity",
              selected
                ? "text-zinc-900"
                : "border border-zinc-300 text-transparent opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            )}
            aria-hidden
          >
            {selected && <Check className="size-3 stroke-[3]" />}
          </span>
        )}

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-2 p-2 pt-10",
            "bg-gradient-to-t from-black/70 via-black/30 to-transparent",
            "transition-opacity duration-200",
            isMenuOpen || isRenaming
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100"
          )}
        >
          {isRenaming ? (
            <Input
              ref={inputRef}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              onFocus={(e) => e.currentTarget.select()}
              className="h-7 rounded-[8px] px-2 text-xs bg-black/60 backdrop-blur-sm text-white border-white/30 focus-visible:ring-white/50 min-w-0"
              maxLength={50}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-xs font-medium text-white truncate drop-shadow-sm min-w-0 pb-1">
                  {data.name}
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-lg">
                {data.name}
              </TooltipContent>
            </Tooltip>
          )}

          <div
            className="flex items-center gap-1 shrink-0"
            data-nitxui-card-actions=""
            onClick={(e) => e.stopPropagation()}
          >
            {renderActions?.(data)}
            {renderMenu(assetCardOverlayButtonClass)}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export const AssetCardSkeleton = ({
  viewType,
}: {
  viewType: AssetsViewType;
}) => {
  const isListLike = viewType === "list" || viewType === "grid-list";

  if (isListLike) {
    return (
      <div
        className={cn(
          assetListRowClass,
          assetListColumnsClass,
          "ps-2 pe-1.5 border-zinc-200/60 dark:border-zinc-800/60"
        )}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <Skeleton className="size-6 rounded-[6px] shrink-0" />
          <Skeleton className="h-3.5 w-40 max-w-[60%]" />
        </div>
        <Skeleton className={cn(assetListCellMdClass, "h-3 w-12")} />
        <Skeleton className={cn(assetListCellMdClass, "h-3 w-20")} />
        <div className="flex justify-end">
          <Skeleton className="size-7 rounded-[8px]" />
        </div>
      </div>
    );
  }

  return (
    <Skeleton
      className={cn(
        GRID_TILE_CLASS,
        "bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60"
      )}
    />
  );
};

export default AssetCard;
