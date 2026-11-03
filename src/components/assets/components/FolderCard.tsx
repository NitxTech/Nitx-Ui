"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Check,
  Download,
  EllipsisVertical,
  FilePenLine,
  Folder as FolderIcon,
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
import { cn } from "../../../lib/utils";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { useAssetsStore, type AssetsViewType } from "../hooks/use-assets-store";
import {
  assetCardIconButtonClass,
  assetListCellMdClass,
  assetListColumnsClass,
  assetListRowClass,
  formatAddedDate,
} from "../lib/card-styles";
import type { Folder } from "../types";

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

interface FolderCardProps {
  data: Folder;
  viewType?: AssetsViewType;
  allowSelect?: boolean;
  selected?: boolean;
  onClick?: (e: React.MouseEvent, folder: Folder) => void;
  onMove?: (itemId: string, type: "asset" | "folder") => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragEnter?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  isDropTarget?: boolean;
  onDelete?: () => void;
  onRename?: (newName: string) => void | Promise<void>;
  onDownload?: (folder: Folder) => void;
  onMouseEnter?: () => void;
  /** Extra dropdown menu items (e.g. signage's "create sequence"). */
  renderMenuItems?: (folder: Folder) => React.ReactNode;
}

/**
 * A folder is one 40px row in both views: a blue folder glyph, the name and
 * the options menu. In the grid it occupies one cell; in the list it lays
 * its cells out on the shared column template so it lines up with assets.
 */
const FolderCard = React.forwardRef<HTMLDivElement, FolderCardProps>(
  (
    {
      data,
      viewType = "grid",
      allowSelect = false,
      selected = false,
      onClick,
      onMove,
      onDragOver,
      onDragEnter,
      onDragLeave,
      onDrop,
      isDropTarget = false,
      onDelete,
      onRename,
      onDownload,
      onMouseEnter,
      renderMenuItems,
    },
    ref
  ) => {
    const { t } = useNitxUiTranslation();
    const renamingItemId = useAssetsStore((s) => s.renamingItemId);
    const setRenamingItemId = useAssetsStore((s) => s.setRenamingItemId);
    // Menu open state is shared across cards so only one can be open at a time.
    const openMenuId = useAssetsStore((s) => s.openMenuId);
    const setOpenMenuId = useAssetsStore((s) => s.setOpenMenuId);

    const isList = viewType !== "grid";
    const isRenaming = renamingItemId === data.id;
    const [newTitle, setNewTitle] = useState(data.name);
    const inputRef = useRef<HTMLInputElement>(null);
    const isCancelledRef = useRef(false);

    useEffect(() => {
      setNewTitle(data.name);
    }, [data.name]);

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

    const handleBlur = useCallback(() => {
      if (!isCancelledRef.current) {
        handleRename();
      }
      isCancelledRef.current = false;
    }, [handleRename]);

    const itemCount = `${data.assets_count || 0} ${
      data.assets_count === 1
        ? t("assets.folderCard.item")
        : t("assets.folderCard.items")
    }`;

    const nameCell = (
      <div className="flex items-center gap-2.5 min-w-0">
        {allowSelect && (
          <span
            className={cn(
              "size-4 shrink-0 rounded-[5px] border flex items-center justify-center",
              selected
                ? "border-[#0000FF] bg-[#0000FF] text-white"
                : "border-zinc-300 bg-white text-transparent dark:border-zinc-600 dark:bg-zinc-900"
            )}
            aria-hidden
          >
            {selected && <Check className="size-3 stroke-[3]" />}
          </span>
        )}
        <FolderIcon
          className="size-5 shrink-0 fill-[#0000FF] text-[#0000FF] dark:fill-blue-400 dark:text-blue-400"
          aria-hidden
        />
        {isRenaming ? (
          <Input
            ref={inputRef}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onFocus={(e) => e.currentTarget.select()}
            maxLength={50}
            className="h-7 rounded-[8px] px-2 text-sm"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate text-start pointer-events-none">
                {data.name}
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {data.name} · {itemCount}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    );

    const actionsCell = (
      <div
        className="flex items-center justify-end shrink-0"
        data-nitxui-card-actions=""
        // Card-level onClick navigates into the folder; the actions area must not trigger it.
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenu
          open={openMenuId === data.id}
          onOpenChange={(value) => setOpenMenuId(value ? data.id : null)}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger disabled={allowSelect} asChild>
                <button
                  type="button"
                  className={assetCardIconButtonClass}
                  aria-label={t("assets.folderCard.moreOptions")}
                  onClick={(e) => e.stopPropagation()}
                >
                  <EllipsisVertical className="size-4" aria-hidden />
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("assets.folderCard.moreOptions")}</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent
            align="end"
            className="rounded-[14px] corner-squircle min-w-[160px] p-1"
            onClick={(e) => e.stopPropagation()}
            onCloseAutoFocus={(event) => event.preventDefault()}
          >
            {renderMenuItems?.(data)}
            <DropdownMenuItem
              className="flex gap-3 rounded-[8px] px-2.5 py-1.5 text-xs cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setRenamingItemId(data.id);
              }}
            >
              <FilePenLine className="size-4 stroke-[1.5]" />
              {t("assets.folderCard.rename")}
            </DropdownMenuItem>
            {onMove && (
              <DropdownMenuItem
                className="flex gap-3 rounded-[8px] px-2.5 py-1.5 text-xs cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onMove(data.id, "folder");
                }}
              >
                {MoveIcon}
                {t("assets.folderCard.moveTo")}
              </DropdownMenuItem>
            )}
            {onDownload && (
              <DropdownMenuItem
                className="flex gap-3 rounded-[8px] px-2.5 py-1.5 text-xs cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(data);
                }}
              >
                <Download className="size-4 stroke-[1.5]" />
                {t("assets.folderCard.download")}
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-3 rounded-[8px] px-2.5 py-1.5 text-xs text-red-600 focus:text-red-700 focus:bg-red-50 dark:focus:bg-red-950/40 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
            >
              <Trash2 className="size-4" /> {t("assets.folderCard.delete")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );

    return (
      <TooltipProvider>
        <div
          ref={ref}
          className={cn(
            "group relative isolate cursor-pointer transition-colors ps-3 pe-1.5",
            assetListRowClass,
            isList ? assetListColumnsClass : "flex items-center gap-2",
            selected
              ? "border-[#0000FF] bg-blue-50/60 dark:bg-blue-950/30"
              : "hover:border-zinc-300 dark:hover:border-zinc-700",
            isDropTarget &&
              "border-[#0000FF] border-dashed bg-blue-50/60 dark:bg-blue-950/30"
          )}
          onClick={(e) => {
            if (!isRenaming && onClick) onClick(e, data);
          }}
          onMouseEnter={onMouseEnter}
          data-asset-id={data.id}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {isList ? (
            <>
              {nameCell}
              <span
                className={cn(
                  assetListCellMdClass,
                  "text-xs text-zinc-600 dark:text-zinc-400 truncate"
                )}
              >
                {itemCount}
              </span>
              <span
                className={cn(
                  assetListCellMdClass,
                  "text-xs text-zinc-600 dark:text-zinc-400 truncate"
                )}
              >
                {formatAddedDate(data.created_at)}
              </span>
              {actionsCell}
            </>
          ) : (
            <>
              <div className="flex-1 min-w-0">{nameCell}</div>
              {actionsCell}
            </>
          )}
        </div>
      </TooltipProvider>
    );
  }
);

FolderCard.displayName = "FolderCard";

export default FolderCard;
