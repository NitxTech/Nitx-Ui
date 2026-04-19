import { MoreVertical } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy02Icon } from "@hugeicons/core-free-icons";

import type { Member } from "../../space-selector/types";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

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
            className="gap-2 cursor-pointer py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50"
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

export default MemberRowActions;
