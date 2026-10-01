import type { ComponentType, MouseEvent, ReactNode } from "react";

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  /** Renders a link (via `LinkComponent`). Mutually exclusive with `onSelect`. */
  href?: string;
  /** Renders a button. */
  onSelect?: () => void;
  active?: boolean;
  /** Small pill shown after the label, e.g. "Soon". */
  badge?: string;
  disabled?: boolean;
  /**
   * Replaces the default grey hover surface, e.g. `hover:bg-[#305DFD]/10`
   * for a tool whose icon carries its own colour. The icon also lifts on hover.
   */
  accentClassName?: string;
  /**
   * Collapsed rail only: paint the whole control with this class (a tool's
   * colour) so it matches the active-item footprint, and show
   * `collapsedIcon` (the white glyph, sized like every other rail icon)
   * instead of `icon`.
   */
  collapsedFillClassName?: string;
  collapsedIcon?: ReactNode;
}

export interface SidebarNavGroup {
  id: string;
  /** Uppercase section label; hidden when the rail is collapsed. */
  label?: string;
  items: SidebarNavItem[];
  /** Draw a hairline above this group (used for the tools section). */
  dividerAbove?: boolean;
}

export interface SidebarLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  "aria-current"?: "page";
}

/** Injected so the core never imports next/link (or any router). */
export type SidebarLinkComponent = ComponentType<SidebarLinkProps>;

export type SidebarDirection = "ltr" | "rtl";
