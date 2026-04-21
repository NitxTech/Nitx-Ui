import { Member } from "../types";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../lib/utils";
import { ChevronDown, Loader2 } from "lucide-react";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import {
  DEFAULT_MEMBER_ROLE_OPTIONS,
  getMemberRoleDefinitions,
} from "../../spaces/member-role-config";

interface MemberItemProps {
  member: Member;
  onChange: (member: Member) => Promise<void>;
  onRemove: (memberId: string) => Promise<void>;
}

const MemberItem = ({ member, onChange, onRemove }: MemberItemProps) => {
  const { t } = useNitxUiTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const roles = getMemberRoleDefinitions(DEFAULT_MEMBER_ROLE_OPTIONS);

  const handleRemoveMember = async () => {
    // Confirmation handled by parent or simple confirm here?
    // Original used setProps deleteModalInfo.
    // I will use window.confirm for simplicity in package.
    if (
      window.confirm(
        t("memberItem.removeMemberConfirmation", { name: member.name })
      )
    ) {
      setIsLoading(true);
      await onRemove(member.id);
      setIsLoading(false);
    }
  };

  const handleUpdateRole = async (role: string) => {
    setIsLoading(true);
    await onChange({ ...member, role: role as any });
    setIsLoading(false);
  };

  return (
    <div className="w-full flex gap-2 items-center">
      <Avatar className="rounded-[12px]">
        <AvatarImage srcSet={member.imageURL} />
        <AvatarFallback className="capitalize rounded-none bg-primary text-white">
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            member?.name?.slice(0, 2)
          )}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col flex-1">
        <p className="text-sm font-semibold">{member.name}</p>
        <p className="text-xs text-zinc-600">{member.email}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="text-xs flex items-center capitalize cursor-pointer p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={member.role === "owner"}
        >
          {t(`roles.${member.role}`)}
          <ChevronDown className="w-3 h-3 ml-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {roles.map((role) => (
            <DropdownMenuItem
              key={role.value}
              disabled={member.role === "owner"}
              onClick={() => handleUpdateRole(role.value)}
              className="cursor-pointer"
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="w-full flex justify-between items-center gap-4">
                  <span className="text-xs capitalize font-medium">
                    {t(role.labelKey)}
                  </span>
                  <Checkbox
                    checked={member.role === role.value}
                    className={cn(
                      "w-4 h-4 scale-75 border-zinc-400",
                      member.role === role.value && "border-primary"
                    )}
                  />
                </div>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            disabled={member.role === "owner"}
            className="text-rose-600 focus:text-rose-700"
            onClick={handleRemoveMember}
          >
            {t("memberItem.removeMember")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MemberItem;
