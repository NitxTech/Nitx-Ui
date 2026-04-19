import type { Invitation } from "../../space-selector/types";
import { MoreVertical } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
  Copy02Icon,
  Link01Icon,
  Refresh01Icon,
} from "@hugeicons/core-free-icons";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import DataTableShell from "./DataTableShell";
import TablePagination from "./TablePagination";
import TablePersonCell from "./TablePersonCell";
import {
  INVITATION_PAGE_SIZE_OPTIONS,
  SECTION_DESCRIPTION,
  SHARED_TABLE_COLUMNS,
  TABLE_ROLE_CELL_CLASS,
  TABLE_ROW_CLASS,
} from "./constants";

interface InvitationsTableProps {
  items: Invitation[];
  totalItems: number;
  currentPage: number;
  rowsPerPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onResend: (id: string) => void;
  onCopyEmail: (email: string) => void;
  onCopyInviteLink: (invite: Invitation) => void;
  onRevoke: (invite: Invitation) => void;
}

interface InvitationRowActionsProps {
  invite: Invitation;
  onResend: (id: string) => void;
  onCopyEmail: (email: string) => void;
  onCopyInviteLink: (invite: Invitation) => void;
  onRevoke: (invite: Invitation) => void;
}

const InvitationRowActions = ({
  invite,
  onResend,
  onCopyEmail,
  onCopyInviteLink,
  onRevoke,
}: InvitationRowActionsProps) => {
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
            onClick={() => onResend(invite.id)}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <HugeiconsIcon icon={Refresh01Icon} />
            </div>
            <span>Resend Invitation</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 cursor-pointer py-2.5"
            onClick={() => onCopyEmail(invite.email)}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <HugeiconsIcon icon={Copy02Icon} />
            </div>
            <span>Copy Email</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 cursor-pointer py-2.5"
            onClick={() => onCopyInviteLink(invite)}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <HugeiconsIcon icon={Link01Icon} />
            </div>
            <span>Copy Invite Link</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 cursor-pointer py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50"
            onClick={() => onRevoke(invite)}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <HugeiconsIcon icon={Cancel01Icon} />
            </div>
            <span>Cancel Invitation</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const InvitationsTable = ({
  items,
  totalItems,
  currentPage,
  rowsPerPage,
  totalPages,
  onPageChange,
  onRowsPerPageChange,
  onResend,
  onCopyEmail,
  onCopyInviteLink,
  onRevoke,
}: InvitationsTableProps) => {
  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-semibold">Pending Invite {totalItems}</h3>
      <p className="text-xs text-neutral-500 -mt-3 dark:text-neutral-400">
        {SECTION_DESCRIPTION}
      </p>

      <DataTableShell columns={SHARED_TABLE_COLUMNS}>
        {items.map((invite) => (
          <div key={invite.id} className={TABLE_ROW_CLASS}>
            <TablePersonCell
              title="Member"
              subtitle={invite.email}
              fallbackValue={invite.email}
            />

            <div className="ml-14 sm:ml-0">
              <div className={TABLE_ROLE_CELL_CLASS}>{invite.role}</div>
            </div>

            <InvitationRowActions
              invite={invite}
              onResend={onResend}
              onCopyEmail={onCopyEmail}
              onCopyInviteLink={onCopyInviteLink}
              onRevoke={onRevoke}
            />
          </div>
        ))}
      </DataTableShell>

      <TablePagination
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalItems={totalItems}
        totalPages={totalPages}
        pageSizeOptions={INVITATION_PAGE_SIZE_OPTIONS}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
};

export default InvitationsTable;
