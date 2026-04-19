import type { Invitation } from "../../space-selector/types";

import DataTableShell from "./DataTableShell";
import InvitationRowActions from "./InvitationRowActions";
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
  onRevoke: (id: string) => void;
}

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
      <h3 className="text-base font-semibold">Pending Invite</h3>
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
