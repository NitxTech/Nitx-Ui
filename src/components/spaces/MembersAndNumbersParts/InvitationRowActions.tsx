import { MoreVertical } from "lucide-react";

import type { Invitation } from "../../space-selector/types";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

interface InvitationRowActionsProps {
  invite: Invitation;
  onResend: (id: string) => void;
  onCopyEmail: (email: string) => void;
  onCopyInviteLink: (invite: Invitation) => void;
  onRevoke: (id: string) => void;
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
              </svg>
            </div>
            <span>Resend Invitation</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 cursor-pointer py-2.5"
            onClick={() => onCopyEmail(invite.email)}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </div>
            <span>Copy Email</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 cursor-pointer py-2.5"
            onClick={() => onCopyInviteLink(invite)}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </div>
            <span>Copy Invite Link</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2 cursor-pointer py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50"
            onClick={() => onRevoke(invite.id)}
          >
            <div className="w-4 h-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </div>
            <span>Cancel Invitation</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default InvitationRowActions;
