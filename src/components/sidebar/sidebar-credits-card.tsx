import * as Popover from "@radix-ui/react-popover";
import type { ReactNode } from "react";
import { cx } from "../../lib/utils";
import { RAIL_CONTROL } from "./sidebar-shell";
import type { SidebarDirection } from "./types";

export interface SidebarCreditsCardProps {
  collapsed: boolean;
  /** e.g. "Credits remaining" */
  label: string;
  /** Swapped in on hover when expanded; the action button label when collapsed. */
  hoverLabel?: string;
  /** Formatted value, e.g. "1,250". */
  value: string;
  /** 0–100 fill for the progress bar; omit to hide the bar. */
  percent?: number | null;
  icon: ReactNode;
  onClick?: () => void;
  dir?: SidebarDirection;
  className?: string;
}

const SURFACE =
  "rounded-[10px] border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40";

function ProgressBar({ percent }: { percent: number }) {
  return (
    <span className="block h-1 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-zinc-800">
      <span
        className="block h-full rounded-full bg-primary transition-[width] duration-500"
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </span>
  );
}

export function SidebarCreditsCard({
  collapsed,
  label,
  hoverLabel,
  value,
  percent,
  icon,
  onClick,
  dir = "ltr",
  className,
}: SidebarCreditsCardProps) {
  const showBar = typeof percent === "number";

  if (collapsed) {
    // The rail has no room for the numbers, so the control opens a popover
    // with the same information; the card's action lives inside it.
    return (
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            type="button"
            title={`${label}: ${value}`}
            className={cx(
              SURFACE,
              RAIL_CONTROL,
              "flex cursor-pointer items-center justify-center transition-colors hover:bg-zinc-100 data-[state=open]:bg-zinc-100 dark:hover:bg-zinc-900/60 dark:data-[state=open]:bg-zinc-900/60",
              className,
            )}
          >
            <span className="flex size-5 items-center justify-center [&>*]:size-full">
              {icon}
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            side={dir === "rtl" ? "left" : "right"}
            align="end"
            sideOffset={10}
            className="z-50 flex w-56 flex-col gap-2.5 rounded-[10px] border border-zinc-100 bg-white p-3 text-start shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span className="flex items-center justify-between gap-2 text-xs font-medium">
              <span className="text-neutral-600 dark:text-zinc-300">{label}</span>
              <span className="flex items-center gap-1.5 tabular-nums text-neutral-900 dark:text-zinc-100">
                <span className="flex size-3.5 items-center justify-center [&>*]:size-full">
                  {icon}
                </span>
                {value}
              </span>
            </span>
            {showBar && <ProgressBar percent={percent} />}
            {hoverLabel && onClick && (
              <Popover.Close asChild>
                <button
                  type="button"
                  onClick={onClick}
                  className="mt-0.5 h-8 rounded-[10px] bg-primary text-xs font-medium text-white transition-colors hover:bg-primary/90 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
                >
                  {hoverLabel}
                </button>
              </Popover.Close>
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        SURFACE,
        "group/credits flex w-full cursor-pointer flex-col p-2.5 text-start transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900/60",
        className,
      )}
    >
      <span className="flex w-full items-center justify-between gap-2">
        <span className="relative h-5 min-w-0 flex-1 overflow-hidden text-xs font-medium">
          <span
            className={cx(
              "absolute inset-y-0 start-0 flex items-center truncate text-neutral-600 transition-all duration-300 dark:text-zinc-300",
              hoverLabel &&
                "group-hover/credits:-translate-y-full group-hover/credits:opacity-0",
            )}
          >
            {label}
          </span>
          {hoverLabel && (
            <span className="absolute inset-y-0 start-0 flex translate-y-full items-center truncate text-neutral-800 opacity-0 transition-all duration-300 group-hover/credits:translate-y-0 group-hover/credits:opacity-100 dark:text-zinc-100">
              {hoverLabel}
            </span>
          )}
        </span>
        <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-medium tabular-nums text-neutral-900 dark:text-zinc-100">
          <span className="flex size-3.5 items-center justify-center [&>*]:size-full">
            {icon}
          </span>
          {value}
        </span>
      </span>
      {showBar && (
        <span className="mt-2 block w-full">
          <ProgressBar percent={percent} />
        </span>
      )}
    </button>
  );
}
