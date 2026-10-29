"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Check,
  Download,
  FileText,
  Globe,
  Image as ImageIcon,
  MoreHorizontal,
  Play,
  Trash2,
} from "lucide-react";

import { Card } from "../../ui/card";
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
import { assetCardIconButtonClass } from "../lib/card-styles";
import type { Asset } from "../types";

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

  const renderTypeIcon = () => {
    switch (data.type) {
      case "image":
        return <ImageIcon className="size-3.5 sm:size-4 text-white" aria-hidden />;
      case "video":
        return (
          <Play
            className="size-3 sm:size-3.5 fill-white text-white translate-x-[0.5px]"
            aria-hidden
          />
        );
      case "document":
        return <FileText className="size-3.5 sm:size-4 text-white" aria-hidden />;
      case "link":
        return <Globe className="size-3.5 sm:size-4 text-white" aria-hidden />;
      default:
        return <FileText className="size-3.5 sm:size-4 text-white" aria-hidden />;
    }
  };

  const renderDropdownMenuItems = () => (
    <DropdownMenuContent
      align="end"
      className="rounded-[16px] corner-squircle min-w-[160px] p-1.5"
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
            className="flex gap-3 rounded-[10px] px-3 py-2 cursor-pointer text-xs sm:text-sm font-medium"
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
              className="flex gap-3 rounded-[10px] px-3 py-2 cursor-pointer text-xs sm:text-sm font-medium"
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
              className="flex gap-3 rounded-[10px] px-3 py-2 cursor-pointer text-xs sm:text-sm font-medium"
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
          className="flex gap-3 rounded-[10px] px-3 py-2 cursor-pointer text-xs sm:text-sm font-medium"
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
        className="flex gap-3 px-3 py-2 rounded-[10px] text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950/40 cursor-pointer text-xs sm:text-sm font-medium"
      >
        <Trash2 className="size-4 text-red-600" />
        <span>{t("assets.assetCard.delete")}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );

  // LIST / GRID-LIST VIEW
  if (isListLike) {
    return (
      <TooltipProvider>
        <Card
          className={cn(
            "group relative bg-card rounded-[16px] corner-squircle p-2 sm:p-2.5 cursor-pointer transition-all border shadow-xs",
            selected
              ? "border-primary bg-primary/10 dark:bg-primary/20 ring-1 ring-primary"
              : "border-zinc-200/80 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700",
            "flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4",
            isDragging && "opacity-50 scale-95"
          )}
          onClick={!isRenaming && onClick ? onClick : undefined}
          data-asset-id={data.uuid}
          draggable={draggable}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <div className="relative h-20 w-[162px] shrink-0 rounded-[12px] corner-squircle overflow-hidden bg-zinc-100 dark:bg-zinc-800">
            {data.type === "image" && (
              <img
                src={
                  data.is_ready && data.image?.thumbnail_path
                    ? data.image.thumbnail_path
                    : images.clock
                }
                alt={data.name}
                className={cn(
                  "size-full object-cover shrink-0",
                  allowSelect && "brightness-75",
                  !data.is_ready && "object-contain p-4 bg-amber-50 dark:bg-amber-900/20"
                )}
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
                    "size-full object-cover shrink-0",
                    allowSelect && "brightness-75",
                    !data.is_ready && "object-contain p-4 bg-amber-50 dark:bg-amber-900/20"
                  )}
                />
                {data.is_ready && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="size-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
                      <Play className="size-3.5 fill-white text-white translate-x-[0.5px]" />
                    </div>
                  </div>
                )}
              </>
            )}
            {data.type === "document" && data.document && (
              <img
                src={
                  data.is_ready
                    ? data.document.thumbnail_path ||
                      documentsImages[data.document.mime_type] ||
                      images.doc
                    : images.clock
                }
                alt={data.name}
                className={cn(
                  "size-full object-cover shrink-0",
                  allowSelect && "brightness-75",
                  !data.is_ready && "object-contain p-4 bg-amber-50 dark:bg-amber-900/20"
                )}
              />
            )}
            {data.type === "link" && (
              <img
                src={
                  data.is_ready && data.link?.thumbnail_url
                    ? data.link.thumbnail_url
                    : images.linkFallback
                }
                alt={data.name}
                className="size-full object-cover shrink-0"
              />
            )}
            {allowSelect && (
              <span
                className={cn(
                  "absolute top-2 start-2 size-4 shrink-0 rounded-[4px] flex items-center justify-center border",
                  selected
                    ? "border-primary bg-primary text-white"
                    : "border-white/80 bg-black/40 text-transparent"
                )}
              >
                {selected && <Check className="size-3" />}
              </span>
            )}
          </div>

          <div className="w-full flex-1 flex justify-between items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex flex-col min-w-0 max-w-[calc(100%-80px)]">
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
                  <TooltipTrigger asChild>
                    <h2 className="text-xs sm:text-sm text-start font-semibold text-foreground truncate max-w-full pointer-events-none">
                      {data.name}
                    </h2>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-lg">
                    {data.name}
                  </TooltipContent>
                </Tooltip>
              )}
              <p className="text-xs text-muted-foreground truncate max-w-32 pointer-events-none text-start">
                {data.type === "image" && data.image?.size}
                {data.type === "video" && data.video?.size}
                {data.type === "document" && data.document?.size}
              </p>
            </div>

            <div
              className="relative flex items-center shrink-0 gap-1.5 [&>button]:size-8 [&>button]:rounded-[8px] [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:text-zinc-700 dark:[&>button]:text-zinc-200 hover:[&>button]:bg-zinc-100 dark:hover:[&>button]:bg-zinc-800 transition-colors"
              data-nitxui-card-actions=""
              onClick={(e) => e.stopPropagation()}
            >
              {renderActions?.(data)}

              <DropdownMenu
                open={isMenuOpen}
                onOpenChange={(value) => setOpenMenuId(value ? data.uuid : null)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger
                      disabled={allowSelect}
                      className="disabled:text-muted-foreground focus:outline-none"
                      asChild
                    >
                      <button
                        type="button"
                        className="flex size-8 shrink-0 items-center justify-center rounded-[8px] text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        aria-label={t("assets.assetCard.moreOptions")}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="size-4" aria-hidden />
                      </button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("assets.assetCard.moreOptions")}</p>
                  </TooltipContent>
                </Tooltip>
                {renderDropdownMenuItems()}
              </DropdownMenu>
            </div>
          </div>
        </Card>
      </TooltipProvider>
    );
  }

  // GRID VIEW (New edge-to-edge Apple-like design matching mockups)
  return (
    <TooltipProvider>
      <Card
        className={cn(
          "group relative aspect-[4/5] w-full rounded-[20px] corner-squircle overflow-hidden cursor-pointer select-none",
          "border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900 shadow-xs",
          "transition-all duration-300 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700",
          selected && "ring-2 ring-primary ring-offset-2 border-primary",
          isDragging && "opacity-50 scale-95"
        )}
        onClick={!isRenaming && onClick ? onClick : undefined}
        data-asset-id={data.uuid}
        draggable={draggable}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        {/* Media Fill Container */}
        <div className="absolute inset-0 size-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          {data.type === "image" && (
            <img
              src={
                data.is_ready && data.image?.thumbnail_path
                  ? data.image.thumbnail_path
                  : images.clock
              }
              alt={data.name}
              className={cn(
                "size-full object-cover transition-all duration-300",
                "group-hover:scale-105 group-hover:blur-[1px]",
                allowSelect && "brightness-75",
                !data.is_ready &&
                  "object-contain p-8 bg-amber-50 dark:bg-amber-900/20 group-hover:scale-100 group-hover:blur-0"
              )}
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
                  "size-full object-cover transition-all duration-300",
                  "group-hover:scale-105 group-hover:blur-[1px]",
                  allowSelect && "brightness-75",
                  !data.is_ready &&
                    "object-contain p-8 bg-amber-50 dark:bg-amber-900/20 group-hover:scale-100 group-hover:blur-0"
                )}
              />
              {data.is_ready && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none transition-transform duration-300 group-hover:scale-110">
                  <div className="size-11 sm:size-12 rounded-full bg-black/45 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white shadow-lg">
                    <Play className="size-5 fill-white text-white translate-x-0.5" />
                  </div>
                </div>
              )}
            </>
          )}

          {data.type === "document" && (
            <img
              src={
                data.is_ready
                  ? (data.document && data.document.thumbnail_path) ||
                    (data.document && documentsImages[data.document.mime_type]) ||
                    images.doc
                  : images.clock
              }
              alt={data.name}
              className={cn(
                "size-full object-cover transition-all duration-300",
                "group-hover:scale-105 group-hover:blur-[1px]",
                allowSelect && "brightness-75",
                !data.is_ready &&
                  "object-contain p-8 bg-amber-50 dark:bg-amber-900/20 group-hover:scale-100 group-hover:blur-0"
              )}
            />
          )}

          {data.type === "link" && (
            <img
              src={
                data.is_ready && data.link?.thumbnail_url
                  ? data.link.thumbnail_url
                  : images.linkFallback
              }
              alt={data.name}
              className={cn(
                "size-full object-cover transition-all duration-300",
                "group-hover:scale-105 group-hover:blur-[1px]",
                allowSelect && "brightness-75"
              )}
            />
          )}

          {(!data.type ||
            (data.type !== "image" &&
              data.type !== "video" &&
              data.type !== "document" &&
              data.type !== "link")) && (
            <img
              src={images.clock}
              alt={data.name}
              className="size-full object-contain p-8 bg-amber-50 dark:bg-amber-900/20"
            />
          )}
        </div>

        {/* Selection Checkbox (always visible when allowSelect is enabled) */}
        {allowSelect && (
          <span
            className={cn(
              "absolute top-3 end-3 z-30 size-5 shrink-0 rounded-[6px] flex items-center justify-center border transition-all pointer-events-auto shadow-sm",
              selected
                ? "border-primary bg-primary text-white"
                : "border-white/80 bg-black/45 text-transparent hover:border-white hover:bg-black/60"
            )}
          >
            {selected && <Check className="size-3.5 stroke-[2.5]" />}
          </span>
        )}

        {/* Hover / Active Overlay */}
        <div
          className={cn(
            "absolute inset-0 z-20 flex flex-col justify-between p-3 transition-opacity duration-200 pointer-events-none",
            isMenuOpen || isRenaming
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
          )}
        >
          {/* Top gradient scrim */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />

          {/* Top Left: Type Icon + Title */}
          <div className="relative z-10 flex items-center justify-between gap-2 w-full">
            <div className="flex items-center gap-2 min-w-0 max-w-[calc(100%-36px)] pointer-events-auto">
              <div className="size-7 sm:size-8 rounded-full bg-black/45 backdrop-blur-md border border-white/10 flex items-center justify-center text-white shrink-0 shadow-sm">
                {renderTypeIcon()}
              </div>

              {isRenaming ? (
                <Input
                  ref={inputRef}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                  onFocus={(e) => e.currentTarget.select()}
                  className="h-7 text-xs sm:text-sm bg-black/60 backdrop-blur-md text-white border-white/30 focus-visible:ring-white/50 w-full max-w-[170px]"
                  maxLength={50}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-full drop-shadow-sm select-none">
                      {data.name}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-lg">
                    {data.name}
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          {/* Bottom gradient scrim */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

          {/* Bottom Right: Actions (Send to Screen, Options) */}
          <div className="relative z-10 flex items-center justify-end w-full gap-2 pointer-events-auto">
            <div
              className="relative flex items-center shrink-0 gap-2 [&>button]:size-8 [&>button]:rounded-full [&>button]:bg-black/50 [&>button]:text-white [&>button]:backdrop-blur-md [&>button]:border [&>button]:border-white/10 hover:[&>button]:bg-black/75 hover:[&>button]:scale-105 active:[&>button]:scale-95 transition-all shadow-sm"
              data-nitxui-card-actions=""
              onClick={(e) => e.stopPropagation()}
            >
              {renderActions?.(data)}

              <DropdownMenu
                open={isMenuOpen}
                onOpenChange={(value) => setOpenMenuId(value ? data.uuid : null)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger
                      disabled={allowSelect}
                      className="disabled:opacity-40 focus:outline-none"
                      asChild
                    >
                      <button
                        type="button"
                        className={assetCardIconButtonClass}
                        aria-label={t("assets.assetCard.moreOptions")}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="size-4 text-white" aria-hidden />
                      </button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("assets.assetCard.moreOptions")}</p>
                  </TooltipContent>
                </Tooltip>
                {renderDropdownMenuItems()}
              </DropdownMenu>
            </div>
          </div>
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
  const isListLike = viewType === "list" || viewType === "grid-list";

  if (isListLike) {
    return (
      <Card className="relative bg-card rounded-[16px] corner-squircle p-2 sm:p-2.5 transition-all border border-zinc-200/60 dark:border-zinc-800/60 flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 shadow-xs">
        <Skeleton className="h-20 w-[162px] rounded-[12px] corner-squircle shrink-0" />
        <div className="w-full p-2 sm:p-3 pr-0 flex justify-between items-center gap-2 sm:gap-3">
          <div className="flex flex-col gap-1 w-full min-w-0">
            <Skeleton className="w-4/5 h-3 sm:h-4" />
            <Skeleton className="w-3/5 h-2.5 sm:h-3" />
          </div>
          <div className="flex gap-1">
            <Skeleton className="size-8 rounded-full" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative aspect-[4/5] w-full rounded-[20px] corner-squircle overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-100 dark:bg-zinc-900/60 shadow-xs">
      <Skeleton className="size-full rounded-[20px] corner-squircle" />
    </Card>
  );
};

export default AssetCard;
