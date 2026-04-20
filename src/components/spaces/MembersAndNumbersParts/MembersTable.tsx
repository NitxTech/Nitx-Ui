import { ChevronDown, Search, UserPlus } from "lucide-react";
import { MoreVertical } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy02Icon, Delete01Icon } from "@hugeicons/core-free-icons";

import type { Member, MemberRole } from "../../space-selector/types";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";

import DataTableShell from "./DataTableShell";
import TablePagination from "./TablePagination";
import TablePersonCell from "./TablePersonCell";
import {
  MEMBER_PAGE_SIZE_OPTIONS,
  MEMBER_ROLE_OPTIONS,
  SECTION_DESCRIPTION,
  SHARED_TABLE_COLUMNS,
  TABLE_ROW_CLASS,
} from "./constants";

interface MembersTableProps {
  items: Member[];
  memberCount: number;
  totalItems: number;
  showEmptyState: boolean;
  searchQuery: string;
  inviteLabel: string;
  emptyTitle: string;
  emptyDescription: string;
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
  onSearchQueryChange: (value: string) => void;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onOpenInviteModal: () => void;
  onRoleChange: (memberId: string, role: MemberRole) => void;
  onCopyEmail: (email: string) => void;
  onRemove: (member: Member) => void;
}

interface MemberRowActionsProps {
  member: Member;
  onCopyEmail: (email: string) => void;
  onRemove: (member: Member) => void;
}

const MemberRowActions = ({
  member,
  onCopyEmail,
  onRemove,
}: MemberRowActionsProps) => {
  return (
    <div className="absolute right-2 top-2 sm:static flex justify-end">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <MoreVertical className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px] p-2 z-[10005]">
          <DropdownMenuItem
            className="gap-2 cursor-pointer py-2.5"
            onClick={() => onCopyEmail(member.email)}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <HugeiconsIcon icon={Copy02Icon} />
            </div>
            <span>Copy Email</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 cursor-pointer py-2.5 text-red-600 dark:text-red-500 focus:text-red-600 focus:bg-red-50"
            onClick={() => onRemove(member)}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
              >
                <path
                  d="M0.879331 6.34768L1.91868 9.13184C2.40271 10.4285 2.64476 11.0768 3.03998 11.5211C3.64442 12.2004 4.51484 12.5977 5.43492 12.6144C6.03661 12.6252 6.69948 12.39 8.02521 11.9195C8.72048 11.6728 9.06812 11.5494 9.36568 11.3651C9.81966 11.0838 10.1948 10.6965 10.4573 10.2381C10.6294 9.93764 10.7365 9.59162 10.9505 8.89957L11.8938 5.85011C12.0388 5.38158 11.8408 4.87587 11.4125 4.62071C10.8528 4.28722 10.1217 4.5027 9.84555 5.08255L9.21565 6.40503L7.44206 1.65401C7.25756 1.15976 6.69705 0.904925 6.19011 1.08482C5.68317 1.26471 5.42185 1.81121 5.60635 2.30545M5.60635 2.30545L5.16087 1.11223C4.97636 0.617985 4.41585 0.363153 3.90898 0.543045C3.40204 0.722931 3.14065 1.26943 3.32515 1.76368L3.77057 2.95689M5.60635 2.30545L6.60857 4.99019M3.77057 2.95689C3.58607 2.46265 3.02556 2.20781 2.51868 2.3877C2.01174 2.56759 1.75035 3.11409 1.93485 3.60833L2.38027 4.80155M3.77057 2.95689L4.77286 5.64162M2.38027 4.80155C2.19577 4.3073 1.63526 4.05247 1.12839 4.23236C0.621447 4.41225 0.360058 4.95875 0.544559 5.453L1.10137 6.94451M2.38027 4.80155L2.93708 6.2931"
                  stroke="#F44336"
                  strokeWidth="0.97035"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Remove From Space</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

interface MembersEmptyStateProps {
  title: string;
  description: string;
  inviteLabel: string;
  onInvite: () => void;
}

const MembersEmptyState = ({
  title,
  description,
  inviteLabel,
  onInvite,
}: MembersEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 min-h-[300px]">
      <div className="flex flex-col items-center gap-2 mb-4 opacity-50">
        <div className="w-16 h-8 bg-primary/10 rounded-md mb-[-10px] z-0 mx-auto" />
        <div className="w-20 h-10 bg-primary/10 rounded-md mb-[-15px] z-10 mx-auto border-2 border-white dark:border-neutral-800" />
        <div className="w-24 h-12 bg-neutral-50 border border-neutral-200 shadow-sm rounded-md z-20 flex items-center gap-2 px-2 dark:bg-neutral-900 dark:border-neutral-700">
          <div className="w-6 h-6 bg-neutral-200 rounded-full dark:bg-neutral-700" />
          <div className="h-2 w-10 bg-neutral-200 rounded-full dark:bg-neutral-700" />
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-4">{title}</h3>
      <p className="text-sm text-neutral-500 text-center max-w-sm mt-2 dark:text-neutral-400">
        {description}
      </p>
      <Button
        className="mt-6 bg-primary hover:bg-primary/90 dark:hover:bg-white dark:text-primary text-white rounded-md px-8 !h-12"
        onClick={onInvite}
      >
        <UserPlus className="w-4 h-4 mr-2" />
        {inviteLabel}
      </Button>
    </div>
  );
};

const MembersTable = ({
  items,
  memberCount,
  totalItems,
  showEmptyState,
  searchQuery,
  inviteLabel,
  emptyTitle,
  emptyDescription,
  currentPage,
  rowsPerPage,
  totalPages,
  onSearchQueryChange,
  onPageChange,
  onRowsPerPageChange,
  onOpenInviteModal,
  onRoleChange,
  onCopyEmail,
  onRemove,
}: MembersTableProps) => {
  if (showEmptyState) {
    return (
      <MembersEmptyState
        title={emptyTitle}
        description={emptyDescription}
        inviteLabel={inviteLabel}
        onInvite={onOpenInviteModal}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-base font-semibold">Members {memberCount}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {SECTION_DESCRIPTION}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
          <Input
            placeholder="Search"
            className="pl-9 !h-12 bg-neutral-50 border-neutral-200 rounded-sm text-sm dark:bg-neutral-900 dark:border-neutral-700"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
          />
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary text-white px-4 rounded-sm font-normal !h-12"
          onClick={onOpenInviteModal}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          {inviteLabel}
        </Button>
      </div>

      <DataTableShell
        columns={SHARED_TABLE_COLUMNS}
        hasRows={items.length > 0}
        emptyState={
          <div className="p-8 text-center text-neutral-500 text-sm dark:text-neutral-400">
            No members found matching "{searchQuery}"
          </div>
        }
      >
        {items.map((member) => (
          <div key={member.id} className={TABLE_ROW_CLASS}>
            <TablePersonCell
              title={member.name}
              subtitle={member.email}
              fallbackValue={member.name}
              avatarSrc={member.imageURL}
            />

            <div className="ml-14 sm:ml-0">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 px-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 capitalize justify-start w-24 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  >
                    {member.role}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-[10005]">
                  {MEMBER_ROLE_OPTIONS.map((role) => (
                    <DropdownMenuItem
                      key={role}
                      onClick={() => onRoleChange(member.id, role)}
                    >
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <MemberRowActions
              member={member}
              onCopyEmail={onCopyEmail}
              onRemove={onRemove}
            />
          </div>
        ))}
      </DataTableShell>

      <TablePagination
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalItems={totalItems}
        totalPages={totalPages}
        pageSizeOptions={MEMBER_PAGE_SIZE_OPTIONS}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
};

export default MembersTable;
