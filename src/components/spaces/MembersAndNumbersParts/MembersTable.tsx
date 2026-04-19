import { ChevronDown, Search, UserPlus } from "lucide-react";

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
import MemberRowActions from "./MemberRowActions";
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
  searchQuery: string;
  inviteLabel: string;
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

const MembersTable = ({
  items,
  memberCount,
  totalItems,
  searchQuery,
  inviteLabel,
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
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-base font-semibold">Members {memberCount}</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
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
