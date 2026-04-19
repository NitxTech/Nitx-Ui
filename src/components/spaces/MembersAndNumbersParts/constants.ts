import type { MemberRole } from "../../space-selector/types";

export interface DataTableColumn {
  label: string;
  className?: string;
}

export type MembersAndNumbersTab = "members" | "settings";

export const SHARED_TABLE_COLUMNS: DataTableColumn[] = [
  { label: "Person" },
  { label: "Roles" },
  { label: "Action", className: "text-right" },
];

export const TABLE_CONTAINER_CLASS =
  "w-full bg-neutral-50 border border-neutral-200 rounded-lg overflow-hidden dark:bg-neutral-900 dark:border-neutral-800";

export const TABLE_HEADER_CLASS =
  "hidden sm:grid grid-cols-[1fr_200px_100px] gap-4 px-4 py-3 bg-neutral-50/50 border-b border-neutral-200 text-xs font-semibold text-neutral-500 dark:bg-zinc-800 dark:border-neutral-800 dark:text-neutral-400";

export const TABLE_ROW_CLASS =
  "relative flex flex-col sm:grid sm:grid-cols-[1fr_200px_100px] gap-4 items-start sm:items-center p-4 border-b border-neutral-200 last:border-0 hover:bg-neutral-100 transition-colors dark:border-neutral-800 dark:hover:bg-neutral-800";

export const TABLE_ROLE_CELL_CLASS =
  "h-8 px-2 text-sm font-normal text-neutral-700 capitalize flex items-center justify-start w-24 dark:text-neutral-200";

export const MEMBER_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
export const INVITATION_PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export const SECTION_DESCRIPTION = "Invite teammates to start collaborating";

export const MEMBER_ROLE_OPTIONS: MemberRole[] = [
  "viewer",
  "editor",
  "manager",
];

export const getFallbackText = (value: string) =>
  value.trim().slice(0, 2).toUpperCase();
