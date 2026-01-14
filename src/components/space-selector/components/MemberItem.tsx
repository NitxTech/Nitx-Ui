import { Member } from "../types";
import { useSpaceSelector } from "../context";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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

interface MemberItemProps {
  member: Member;
  onChange: (member: Member) => Promise<void>;
  onRemove: (memberId: string) => Promise<void>;
}

type Role = {
  title: string; // MemberRole in actual type but string compatible
  description: string;
};

const MemberItem = ({ member, onChange, onRemove }: MemberItemProps) => {
  const { t } = useTranslation("components");
  const { setModalProps } = useSpaceSelector(); // Replaces useModal
  const [isLoading, setIsLoading] = useState(false);

  const roles: Role[] = [
    { title: "viewer", description: t("memberItem.viewerDescription") },
    { title: "editor", description: t("memberItem.editorDescription") },
    { title: "manager", description: t("memberItem.managerDescription") },
  ];

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
          {member.role}
          <ChevronDown className="w-3 h-3 ml-1" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {roles.map((role) => (
            <DropdownMenuItem
              key={role.title}
              disabled={member.role === "owner"}
              onClick={() => handleUpdateRole(role.title)}
              className="cursor-pointer"
            >
              <div className="flex flex-col gap-1 w-full">
                <div className="w-full flex justify-between items-center gap-4">
                  <span className="text-xs capitalize font-medium">
                    {role.title}
                  </span>
                  <Checkbox
                    checked={member.role === role.title}
                    className={cn(
                      "w-4 h-4 scale-75 border-zinc-400",
                      member.role === role.title && "border-primary"
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
