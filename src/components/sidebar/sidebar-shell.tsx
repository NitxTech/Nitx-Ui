import type { ReactNode } from "react";
import { cx } from "../../lib/utils";
import type { SidebarDirection } from "./types";

/** Every clickable rail control shares this footprint. */
export const RAIL_CONTROL = "size-9 rounded-[10px]";

export interface SidebarShellProps {
  collapsed: boolean;
  dir?: SidebarDirection;
  /** Logo row, toggle, etc. Rendered above the scrollable body. */
  header?: ReactNode;
  /** Scrollable middle: navigation, selectors. */
  children: ReactNode;
  /** Pinned to the bottom: credits, account. */
  footer?: ReactNode;
  className?: string;
}

/**
 * The sidebar frame. Owns background, border, padding and the
 * header / scroll body / footer stacking; knows nothing about routes.
 * Width is the parent's job (e.g., CSS variable or width utility).
 * The same `gap-3` separates header, body sections and footer so the rhythm
 * is identical at every root font-size.
 */
export function SidebarShell({
  collapsed,
  dir = "ltr",
  header,
  children,
  footer,
  className,
}: SidebarShellProps) {
  return (
    <aside
      dir={dir}
      data-collapsed={collapsed ? "" : undefined}
      className={cx(
        "flex h-full w-full flex-col gap-3 overflow-hidden bg-white dark:bg-black",
        "border-e border-zinc-100 dark:border-zinc-800",
        collapsed ? "px-2 py-4" : "p-4",
        className,
      )}
    >
      {header ? <div className="shrink-0">{header}</div> : null}
      <div
        className={cx(
          "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          collapsed && "items-center",
        )}
      >
        {children}
      </div>
      {footer ? (
        <div
          className={cx(
            "flex shrink-0 flex-col gap-3",
            collapsed && "items-center",
          )}
        >
          {footer}
        </div>
      ) : null}
    </aside>
  );
}

function ToggleGlyph({ dir, className }: { dir: SidebarDirection; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("size-5", dir === "rtl" && "-scale-x-100", className)}
      aria-hidden="true"
    >
      <rect x="2.5" y="3.5" width="15" height="13" rx="3" />
      <path d="M7.5 3.5v13" />
      <path d="M12.5 8.5 11 10l1.5 1.5" />
    </svg>
  );
}

export interface SidebarToggleProps {
  collapsed: boolean;
  onToggle: () => void;
  /** Accessible name, e.g. "Collapse sidebar" / "Expand sidebar". */
  label: string;
  dir?: SidebarDirection;
  className?: string;
}

/** Panel-toggle button for the expanded header (inline icon, no icon-library dependency). */
export function SidebarToggle({
  collapsed,
  onToggle,
  label,
  dir = "ltr",
  className,
}: SidebarToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-expanded={!collapsed}
      title={label}
      className={cx(
        RAIL_CONTROL,
        "flex shrink-0 items-center justify-center",
        "text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-zinc-400 dark:hover:bg-zinc-800",
        className,
      )}
    >
      <ToggleGlyph dir={dir} />
    </button>
  );
}

export interface SidebarBrandToggleProps {
  /** The brand mark shown at rest (collapsed rail). */
  mark: ReactNode;
  onToggle: () => void;
  label: string;
  dir?: SidebarDirection;
  className?: string;
}

/**
 * Collapsed-rail header: the brand mark and the expand control are one
 * button — the mark shows at rest and cross-fades into the panel icon on
 * hover/focus; clicking expands the sidebar.
 */
export function SidebarBrandToggle({
  mark,
  onToggle,
  label,
  dir = "ltr",
  className,
}: SidebarBrandToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-expanded={false}
      title={label}
      className={cx(
        RAIL_CONTROL,
        "group/brand relative flex shrink-0 items-center justify-center",
        "text-neutral-500 transition-colors hover:bg-neutral-100 focus-visible:bg-neutral-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:focus-visible:bg-zinc-800",
        className,
      )}
    >
      <span className="flex size-5 items-center justify-center transition-all duration-200 group-hover/brand:scale-75 group-hover/brand:opacity-0 group-focus-visible/brand:scale-75 group-focus-visible/brand:opacity-0 [&>*]:size-full">
        {mark}
      </span>
      <ToggleGlyph
        dir={dir}
        className="absolute scale-75 opacity-0 transition-all duration-200 group-hover/brand:scale-100 group-hover/brand:opacity-100 group-focus-visible/brand:scale-100 group-focus-visible/brand:opacity-100"
      />
    </button>
  );
}
