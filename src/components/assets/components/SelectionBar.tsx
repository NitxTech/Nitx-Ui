"use client";

import React from "react";
import {
  CheckCheck,
  FolderSymlink,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";

export interface SelectionBarProps {
  /** How many assets and folders are selected. Nothing renders at 0. */
  count: number;
  /** Everything on the page is already selected, so the control clears instead. */
  allSelected: boolean;
  onClear: () => void;
  onSelectAll: () => void;
  onMove: () => void;
  onDelete: () => void;
  className?: string;
}

/**
 * The bar that appears at the bottom of the viewport while assets are
 * selected: how many, then select all, move and delete, with a cross that
 * clears the selection (Escape does the same).
 *
 * It is `fixed`, not absolute: the host app scrolls the browser inside its own
 * container, so an absolutely placed bar sat at the bottom of the content,
 * far below the fold, and was never seen. The wrapper takes no pointer events
 * so the page underneath stays usable where the bar does not cover it.
 *
 * A host app with its own bottom chrome (a mobile nav bar, a player) sets
 * `--nitx-bottom-inset` to that height and the bar rides above it instead of
 * hiding underneath. Unset, the inset is 0 and nothing moves.
 */
export const SelectionBar: React.FC<SelectionBarProps> = ({
  count,
  allSelected,
  onClear,
  onSelectAll,
  onMove,
  onDelete,
  className,
}) => {
  const { t } = useNitxUiTranslation();
  if (count < 1) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4",
        "bottom-[calc(1rem_+_var(--nitx-bottom-inset,0px))] md:bottom-[calc(2.5rem_+_var(--nitx-bottom-inset,0px))]",
        className
      )}
    >
      <div
        role="region"
        aria-label={t("assets.selectionBar.region")}
        className={cn(
          "pointer-events-auto flex max-w-[calc(100vw_-_2rem)] items-center gap-1 overflow-x-auto rounded-[14px] border p-2 shadow-lg sm:gap-2",
          "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
          "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-200"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          aria-label={t("assets.selectionBar.clear")}
          className="size-8 shrink-0 rounded-[8px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          <X className="size-4" />
        </Button>

        {/* The count leads, and is announced as it changes. */}
        <p
          aria-live="polite"
          className="shrink-0 whitespace-nowrap border-zinc-200 pe-1 text-sm font-medium text-zinc-900 sm:border-e sm:pe-3 dark:border-zinc-800 dark:text-zinc-100"
        >
          {t("assets.selectionBar.count", { count })}
        </p>

        <Button
          variant="ghost"
          size="sm"
          onClick={allSelected ? onClear : onSelectAll}
          className="shrink-0 gap-2 rounded-[8px] px-2 text-sm font-normal sm:px-3"
        >
          <CheckCheck className="size-4 shrink-0" />
          <span className="hidden sm:inline">
            {allSelected
              ? t("assets.selectionBar.deselectAll")
              : t("assets.selectionBar.selectAll")}
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onMove}
          className="shrink-0 gap-2 rounded-[8px] px-2 text-sm font-normal sm:px-3"
        >
          <FolderSymlink className="size-4 shrink-0" />
          <span className="hidden sm:inline">
            {t("assets.assetList.moveTo")}
          </span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="shrink-0 gap-2 rounded-[8px] px-2 text-sm font-normal text-rose-600 hover:bg-rose-50 hover:text-rose-700 sm:px-3 dark:text-rose-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-300"
        >
          <Trash2 className="size-4 shrink-0" />
          <span className="hidden sm:inline">
            {t("assets.assetList.delete")}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SelectionBar;
