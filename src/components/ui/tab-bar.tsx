"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface TabBarItem {
  /** Identifier reported by `onTabChange`. Falls back to a string label. */
  id?: string;
  /** Tab label. `title` and `label` are interchangeable. */
  title?: React.ReactNode;
  /** Interchangeable with `title`. */
  label?: React.ReactNode;
  /** Rendered element, or a component taking `className`. */
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  /** Count or status shown after the label. */
  badge?: string | number;
  disabled?: boolean;
  /** Overrides the active comparison for this tab. */
  active?: boolean;
  /** `id` of the panel this tab controls, announced to screen readers. */
  panelId?: string;
}

export interface TabBarProps {
  /** `items` and `tabs` are interchangeable. */
  items?: TabBarItem[];
  /** Interchangeable with `items`. */
  tabs?: TabBarItem[];
  /** Controlled active tab. Without it the bar tracks its own. */
  activeTab?: string;
  defaultActiveTab?: string;
  onTabChange?: (tabId: string) => void;
  /** `non-rounded` is the underline bar; `rounded` is the pill group. */
  variant?: "rounded" | "non-rounded";
  /** `neutral` is near-black text and underline; `primary` is the brand colour. */
  tone?: "primary" | "neutral";
  size?: "sm" | "default" | "lg";
  /** Sticks to the top of the scroll container, below `--nitx-top-inset`. */
  sticky?: boolean;
  /** Trailing element on the bar, opposite the tabs. */
  action?: React.ReactNode;
  /** Interchangeable with `action`. */
  rightElement?: React.ReactNode;
  /** Spreads the tabs across the full width. */
  fullWidth?: boolean;
  /** Names the tab list for screen readers. */
  ariaLabel?: string;
  className?: string;
}

const ICON_SIZE: Record<NonNullable<TabBarProps["size"]>, string> = {
  sm: "w-3.5 h-3.5",
  default: "w-4 h-4 sm:w-[1.125rem] sm:h-[1.125rem]",
  lg: "w-5 h-5",
};

/** Underline tab padding and type, per size. Geometry from the Assets tab bar. */
const UNDERLINE_SIZE: Record<NonNullable<TabBarProps["size"]>, string> = {
  sm: "text-xs gap-1.5 pb-2 pt-2",
  default: "text-xs sm:text-sm gap-2 pb-3 pt-3",
  lg: "text-sm sm:text-base gap-2.5 pb-3.5 pt-3.5",
};

const PILL_SIZE: Record<NonNullable<TabBarProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs",
  default: "px-4 py-2 text-xs sm:text-sm",
  lg: "px-6 py-2.5 text-sm sm:text-base",
};

const resolveId = (tab: TabBarItem, index: number): string => {
  if (tab.id) return tab.id;
  if (typeof tab.title === "string") return tab.title;
  if (typeof tab.label === "string") return tab.label;
  return String(index);
};

/**
 * The tab bar every dashboard shares.
 *
 * The default `non-rounded` variant is the Assets tab bar: a full-width strip
 * with a hairline above and below, tabs that carry a 2px underline when
 * active, and a horizontally scrolling track with no visible scrollbar. The
 * `rounded` variant is the pill group used for in-page switches.
 *
 * Tabs are a real tab list: arrow keys move between them following the
 * reading direction, Home and End jump to the ends, and only the active tab
 * is in the tab order.
 *
 * It does not navigate. A tab that changes the route calls `router.push` from
 * the host's `onTabChange`, which keeps the library free of a router.
 */
export function TabBar({
  items,
  tabs,
  activeTab: controlledActiveTab,
  defaultActiveTab,
  onTabChange,
  variant = "non-rounded",
  tone = "neutral",
  size = "default",
  sticky = false,
  fullWidth = false,
  action,
  rightElement,
  ariaLabel,
  className,
}: TabBarProps) {
  const tabList = items ?? tabs ?? [];
  const trackRef = React.useRef<HTMLDivElement | null>(null);

  const [internalActiveTab, setInternalActiveTab] = React.useState<string>(
    () =>
      defaultActiveTab ?? (tabList.length ? resolveId(tabList[0], 0) : ""),
  );

  const isActive = (tab: TabBarItem, index: number): boolean => {
    if (tab.active !== undefined) return tab.active;
    const id = resolveId(tab, index);
    if (controlledActiveTab !== undefined) return controlledActiveTab === id;
    return internalActiveTab === id;
  };

  const activeIndex = Math.max(
    tabList.findIndex((tab, index) => isActive(tab, index)),
    0,
  );

  const selectTab = (tab: TabBarItem, index: number) => {
    if (tab.disabled) return;
    const id = resolveId(tab, index);
    setInternalActiveTab(id);
    onTabChange?.(id);
  };

  /** Moves focus and selection to the next enabled tab in `step` direction. */
  const moveFocus = (from: number, step: number) => {
    if (!tabList.length) return;

    let index = from;
    for (let hops = 0; hops < tabList.length; hops += 1) {
      index = (index + step + tabList.length) % tabList.length;
      if (!tabList[index].disabled) break;
    }

    selectTab(tabList[index], index);
    const buttons = trackRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]',
    );
    buttons?.[index]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const index = tabList.findIndex(
      (tab, i) => resolveId(tab, i) === (event.target as HTMLElement).id,
    );
    const current = index === -1 ? activeIndex : index;

    // Arrows follow the reading direction, so the Arabic layout reverses.
    const rtl =
      typeof window !== "undefined" && trackRef.current
        ? window.getComputedStyle(trackRef.current).direction === "rtl"
        : false;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        moveFocus(current, rtl ? -1 : 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        moveFocus(current, rtl ? 1 : -1);
        break;
      case "Home":
        event.preventDefault();
        moveFocus(-1, 1);
        break;
      case "End":
        event.preventDefault();
        moveFocus(0, -1);
        break;
    }
  };

  const activeIconColor =
    tone === "neutral"
      ? "text-[#212121] dark:text-white"
      : "text-primary dark:text-white";

  const renderIcon = (icon: TabBarItem["icon"], active: boolean) => {
    if (!icon) return null;

    const colour = active ? activeIconColor : "text-gray-400 dark:text-zinc-500";

    if (React.isValidElement(icon)) {
      return (
        <span
          className={cn("flex-shrink-0 transition-colors", colour)}
          aria-hidden
        >
          {icon}
        </span>
      );
    }

    if (typeof icon === "function") {
      const Icon = icon as React.ComponentType<{ className?: string }>;
      return (
        <Icon
          className={cn(
            "flex-shrink-0 transition-colors",
            ICON_SIZE[size],
            colour,
          )}
          aria-hidden
        />
      );
    }

    return null;
  };

  const renderBadge = (tab: TabBarItem, active: boolean) => {
    if (tab.badge === undefined) return null;

    return (
      <span
        className={cn(
          "ms-1 rounded-full px-1.5 py-0.5 text-[0.75rem] font-bold leading-none",
          active
            ? "bg-primary/10 text-primary dark:bg-primary/30 dark:text-zinc-100"
            : "bg-gray-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200",
        )}
      >
        {tab.badge}
      </span>
    );
  };

  const renderTab = (tab: TabBarItem, index: number) => {
    const active = isActive(tab, index);
    const id = resolveId(tab, index);
    const content = tab.title ?? tab.label;

    const shared = {
      key: id,
      id,
      type: "button" as const,
      role: "tab",
      "aria-selected": active,
      "aria-controls": tab.panelId,
      // Roving tab order: one stop for the whole bar, arrows do the rest.
      tabIndex: active ? 0 : -1,
      disabled: tab.disabled,
      onClick: () => selectTab(tab, index),
    };

    if (variant === "rounded") {
      return (
        <button
          {...shared}
          className={cn(
            "flex select-none items-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 md:rounded-full",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
            PILL_SIZE[size],
            fullWidth && "flex-1 justify-center",
            active
              ? cn(
                  "bg-white shadow-sm dark:bg-zinc-900",
                  tone === "neutral"
                    ? "text-[#212121] dark:text-white"
                    : "text-primary dark:text-white",
                )
              : "text-gray-600 hover:bg-white/50 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-700/50 dark:hover:text-zinc-100",
            tab.disabled && "cursor-not-allowed opacity-50",
          )}
        >
          {renderIcon(tab.icon, active)}
          {content && <span>{content}</span>}
          {renderBadge(tab, active)}
        </button>
      );
    }

    return (
      <button
        {...shared}
        className={cn(
          "relative flex cursor-pointer select-none items-center whitespace-nowrap border-b-2 font-normal transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
          UNDERLINE_SIZE[size],
          active
            ? cn(
                "border-[#212121] text-[#212121] dark:border-white dark:text-white",
                tone === "primary" &&
                  "border-primary font-medium text-primary dark:border-white dark:text-white",
              )
            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200",
          tab.disabled && "cursor-not-allowed opacity-50",
        )}
      >
        {renderIcon(tab.icon, active)}
        {content && <span>{content}</span>}
        {renderBadge(tab, active)}
      </button>
    );
  };

  const tabButtons = tabList.map(renderTab);

  // Hidden scrollbar, kept scrollable: the tabs overflow on a phone.
  const trackScroll =
    "overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]";

  if (variant === "rounded") {
    return (
      <div
        ref={trackRef}
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex max-w-full items-center gap-1 rounded-2xl border border-gray-200/50 bg-gray-100/80 p-1.5 md:rounded-full dark:border-zinc-700/50 dark:bg-zinc-800/80",
          trackScroll,
          sticky && "sticky top-[var(--nitx-top-inset,0px)] z-30",
          fullWidth && "flex w-full",
          className,
        )}
      >
        {tabButtons}
      </div>
    );
  }

  const trailing = action ?? rightElement;

  return (
    <div
      className={cn(
        "w-full border-y border-gray-200 bg-white transition-all duration-200 dark:border-zinc-800 dark:bg-zinc-950",
        sticky && "sticky top-[var(--nitx-top-inset,0px)] z-30",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center px-4 sm:px-6",
          (trailing || fullWidth) && "w-full justify-between",
        )}
      >
        <div
          ref={trackRef}
          role="tablist"
          aria-label={ariaLabel}
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
          className={cn(
            "flex items-center gap-4 sm:gap-6 md:gap-8",
            trackScroll,
            fullWidth && "w-full",
          )}
        >
          {tabButtons}
        </div>
        {trailing && (
          <div className="flex shrink-0 items-center py-2">{trailing}</div>
        )}
      </div>
    </div>
  );
}

/** Name the dashboards' local copies used. Keeps a migration a one-line diff. */
export const CustomTabbar = TabBar;
export type TabItem = TabBarItem;
export type CustomTabbarProps = TabBarProps;

export default TabBar;
