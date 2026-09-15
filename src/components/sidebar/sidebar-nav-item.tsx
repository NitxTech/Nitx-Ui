import * as Tooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";
import { cx } from "../../lib/utils";
import { RAIL_CONTROL } from "./sidebar-shell";
import type {
  SidebarDirection,
  SidebarLinkComponent,
  SidebarNavItem as SidebarNavItemModel,
} from "./types";

export interface SidebarNavItemProps {
  item: SidebarNavItemModel;
  collapsed: boolean;
  dir?: SidebarDirection;
  LinkComponent?: SidebarLinkComponent;
}

const DefaultLink: SidebarLinkComponent = ({ href, children, ...rest }) => (
  <a href={href} {...rest}>
    {children}
  </a>
);

/** Hover surface shared by rows and their collapsed tooltips. */
export const RAIL_HOVER = "bg-neutral-100 dark:bg-zinc-800";

function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="ms-1.5 shrink-0 rounded-full border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-3xs font-bold leading-none text-amber-600 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-400">
      {children}
    </span>
  );
}

/** One nav row. A single class list serves both the expanded and collapsed rail. */
export function SidebarNavItem({
  item,
  collapsed,
  dir = "ltr",
  LinkComponent = DefaultLink,
}: SidebarNavItemProps) {
  const active = !item.disabled && !!item.active;
  const filled = collapsed && !!item.collapsedFillClassName;

  const className = cx(
    "group/nav relative flex shrink-0 items-center rounded-[10px] text-sm font-medium transition-[background-color,filter] duration-200",
    "text-neutral-700 dark:text-zinc-300",
    filled
      ? cx(item.collapsedFillClassName, "text-white shadow-sm hover:brightness-110")
      : item.accentClassName ?? "hover:bg-neutral-100 dark:hover:bg-zinc-800",
    collapsed ? cx(RAIL_CONTROL, "justify-center") : "h-9 w-full gap-2.5 px-3 text-start",
    active &&
      !filled &&
      "bg-primary text-white shadow-sm hover:bg-primary/90 dark:bg-white dark:text-black dark:hover:bg-neutral-100",
    item.disabled && "cursor-not-allowed opacity-70 hover:bg-transparent",
  );

  const content = (
    <>
      <span
        className={cx(
          "flex size-5 shrink-0 items-center justify-center [&>*]:size-full",
          active || filled
            ? "text-white dark:text-black"
            : "text-neutral-500 dark:text-zinc-400",
          filled && "dark:text-white",
          item.accentClassName &&
            !filled &&
            "transition-transform duration-200 group-hover/nav:scale-110",
        )}
      >
        {filled ? item.collapsedIcon ?? item.icon : item.icon}
      </span>
      {!collapsed && (
        <span className="flex min-w-0 flex-1 items-center justify-between">
          <span className={cx("truncate", !active && "font-normal")}>
            {item.label}
          </span>
          {item.badge ? <Badge>{item.badge}</Badge> : null}
        </span>
      )}
    </>
  );

  const control =
    item.href && !item.disabled ? (
      <LinkComponent
        href={item.href}
        className={className}
        aria-current={active ? "page" : undefined}
      >
        {content}
      </LinkComponent>
    ) : (
      <button
        type="button"
        className={className}
        onClick={item.disabled ? undefined : item.onSelect}
        disabled={item.disabled}
        aria-current={active ? "page" : undefined}
      >
        {content}
      </button>
    );

  if (!collapsed) return control;

  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{control}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={dir === "rtl" ? "left" : "right"}
            sideOffset={8}
            className={cx(
              "z-50 flex h-9 items-center rounded-[10px] px-3 text-sm font-medium text-neutral-700 shadow-md dark:text-zinc-200",
              RAIL_HOVER,
            )}
          >
            <span className="flex items-center gap-1.5">
              {item.label}
              {item.badge ? <Badge>{item.badge}</Badge> : null}
            </span>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
