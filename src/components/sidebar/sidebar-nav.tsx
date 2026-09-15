import { cx } from "../../lib/utils";
import { SidebarNavItem } from "./sidebar-nav-item";
import type {
  SidebarDirection,
  SidebarLinkComponent,
  SidebarNavGroup,
} from "./types";

export interface SidebarNavProps {
  groups: SidebarNavGroup[];
  collapsed: boolean;
  dir?: SidebarDirection;
  LinkComponent?: SidebarLinkComponent;
  className?: string;
}

export function SidebarNav({
  groups,
  collapsed,
  dir,
  LinkComponent,
  className,
}: SidebarNavProps) {
  return (
    <nav className={cx("flex w-full flex-col gap-3", className)}>
      {groups.map((group) => (
        <div
          key={group.id}
          className={cx(
            "flex w-full flex-col",
            collapsed ? "items-center gap-2" : "gap-0.5",
          )}
        >
          {group.dividerAbove && (
            <div
              className={cx(
                "mb-2 border-t border-zinc-100 dark:border-zinc-800",
                collapsed ? "w-6" : "mx-3",
              )}
            />
          )}
          {group.label && !collapsed && (
            <span className="mb-1 px-3 text-2xs font-medium uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
              {group.label}
            </span>
          )}
          {group.items.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              dir={dir}
              LinkComponent={LinkComponent}
            />
          ))}
        </div>
      ))}
    </nav>
  );
}
