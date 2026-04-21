"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "../../lib/utils";
import { useNitxUiTranslation } from "../../i18n/nitxuilib";
import type { MemberRole } from "../space-selector/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  DEFAULT_MEMBER_ROLE_OPTIONS,
  getMemberRoleDefinition,
  getMemberRoleDefinitions,
} from "./member-role-config";

interface MemberRoleSelectProps {
  value: MemberRole;
  onValueChange: (role: MemberRole) => void;
  options?: readonly MemberRole[];
  disabled?: boolean;
  variant?: "compact" | "detailed";
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

const MemberRoleSelect = ({
  value,
  onValueChange,
  options,
  disabled = false,
  variant = "detailed",
  className,
  triggerClassName,
  contentClassName,
}: MemberRoleSelectProps) => {
  const { t } = useNitxUiTranslation();
  const selectedRole = getMemberRoleDefinition(value);
  const availableRoles = [
    ...(options ?? DEFAULT_MEMBER_ROLE_OPTIONS),
    ...(options?.includes(value) ? [] : [value]),
  ];
  const roleOptions = getMemberRoleDefinitions(
    Array.from(new Set(availableRoles)),
  );
  const isCompact = variant === "compact";

  return (
    <div className={className}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex w-full items-center justify-between outline-none transition-colors disabled:pointer-events-none",
              isCompact
                ? "h-8 min-w-[120px] gap-2 rounded-md bg-transparent px-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 disabled:cursor-default disabled:opacity-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                : "min-h-20 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-left hover:border-primary/50 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800",
              triggerClassName,
            )}
          >
            {isCompact ? (
              <span className="truncate">{t(selectedRole.labelKey)}</span>
            ) : (
              <div className="flex w-full items-center gap-4">
                <div className="flex items-start justify-start">
                  <div className="h-5 w-5 text-gray-600 dark:text-neutral-300">
                    <HugeiconsIcon
                      icon={selectedRole.triggerIcon}
                      className="h-full w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                  <span className="font-medium text-sm text-neutral-700 dark:text-neutral-200">
                    {t(selectedRole.labelKey)}
                  </span>
                  <span className="line-clamp-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                    {t(selectedRole.descriptionKey)}
                  </span>
                </div>
              </div>
            )}
            {!disabled ? (
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-neutral-500 dark:text-neutral-400" />
            ) : null}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={8}
          className={cn(
            "z-[100001] rounded-[22px] border border-neutral-200 bg-white p-0 shadow-[0_24px_48px_rgba(15,23,42,0.14)] dark:border-neutral-800 dark:bg-neutral-950 dark:shadow-none",
            isCompact
              ? "w-[min(320px,calc(100vw-2rem))]"
              : "w-[var(--radix-dropdown-menu-trigger-width)] max-w-[calc(100vw-2rem)]",
            contentClassName,
          )}
        >
          <div className="px-4 pt-4 pb-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {t("membersManager.selectRole")}
          </div>

          <div className="pb-2">
            {roleOptions.map((roleOption) => (
              <DropdownMenuItem
                key={roleOption.value}
                onClick={() => onValueChange(roleOption.value)}
                className="relative flex items-start gap-3 px-4 py-3 focus:bg-neutral-100 dark:focus:bg-neutral-900"
              >
                <div className="mt-1 h-4 w-4 shrink-0 text-neutral-600 dark:text-neutral-300">
                  <HugeiconsIcon
                    icon={roleOption.menuIcon}
                    className="h-full w-full"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-1 pr-8 text-left">
                  <span className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                    {t(roleOption.labelKey)}
                  </span>
                  <span className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                    {t(roleOption.descriptionKey)}
                  </span>
                </div>

                {value === roleOption.value ? (
                  <div className="absolute right-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white dark:bg-primarylight dark:text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </div>
                ) : null}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MemberRoleSelect;
