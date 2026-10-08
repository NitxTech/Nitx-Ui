"use client";

import { cn } from "../../lib/utils";
import { useRouter } from "next/navigation";
import { BadgeCheck, ChevronDown, LogOut, PlusSquare, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { useNitxUiTranslation } from "../../i18n/nitxuilib";
import {
  AccountPreferencesModal,
  AccountPreferencesModalProps,
} from "./account-preferences-modal";

export interface UserAccountProps {
  accounts: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string | null;
    active: boolean;
  }[];
  isExpanded: boolean;
  auth_user: string | number;
  showPlan?: boolean;
  platform?: "studio" | "my-nitx" | "signage" | string;
  onOpenSettings?: () => void;
  onSettingsClick?: () => void;
  settingsHref?: string;
  preferencesOpen?: boolean;
  onPreferencesOpenChange?: (open: boolean) => void;
  accountPreferencesProps?: Partial<AccountPreferencesModalProps>;
}

export const UserAccount = ({
  accounts,
  isExpanded,
  auth_user,
  showPlan,
  platform,
  onOpenSettings,
  onSettingsClick,
  settingsHref,
  preferencesOpen,
  onPreferencesOpenChange,
  accountPreferencesProps,
}: UserAccountProps) => {
  const { t } = useNitxUiTranslation();
  const [onOpen, setOnOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [internalPreferencesOpen, setInternalPreferencesOpen] = useState(false);

  const isPreferencesModalOpen =
    preferencesOpen !== undefined ? preferencesOpen : internalPreferencesOpen;
  const handlePreferencesOpenChange =
    onPreferencesOpenChange || setInternalPreferencesOpen;

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMounted) return null;

  // Sort accounts so the active one is at the top
  const sortedAccounts = [...accounts].sort(
    (a, b) => (b.active ? 1 : 0) - (a.active ? 1 : 0)
  );
  const activeAccount =
    sortedAccounts?.find((account) => account.active) || sortedAccounts[0];

  const handleSignOut = async () => {
    router.replace(
      `${process.env.NEXT_PUBLIC_AUTH_URL}/signout?session=${auth_user}`
    );
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    if (!settingsHref) {
      e.preventDefault();
      handlePreferencesOpenChange(true);
    }
    if (onOpenSettings) {
      onOpenSettings();
    } else if (onSettingsClick) {
      onSettingsClick();
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-settings-modal"));
    }
  };

  if (!activeAccount) return null;

  const shouldShowCompact = !isExpanded || isMobile;

  return (
    <div className="relative w-full">
      <DropdownMenu onOpenChange={() => setOnOpen(!onOpen)}>
        <DropdownMenuTrigger asChild>
          {shouldShowCompact ? (
            <Avatar
              className={cn(
                "rounded-[10px] size-10 lg:size-[40px] overflow-clip cursor-pointer mx-auto"
              )}
            >
              <AvatarImage src={`${activeAccount?.imageUrl}`} />
              <AvatarFallback className="rounded-none bg-primary dark:text-zinc-900 text-white ">{`${activeAccount.name
                .split(" ")
                .slice(0, 2)
                .map((n) => n?.[0]?.toUpperCase() || "")
                .join("")}`}</AvatarFallback>
            </Avatar>
          ) : (
            <div
              className={cn(
                "w-10 h-10 lg:w-full lg:h-auto border border-zinc-100 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-900 p-1.5 lg:p-2 rounded-[16px] corner-squircle flex items-center gap-2 overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary",
                onOpen && "border-primary"
              )}
            >
              <Avatar
                className={cn(
                  "rounded-[10px] corner-squircle size-10 lg:size-12 overflow-clip shrink-0"
                )}
              >
                <AvatarImage src={`${activeAccount?.imageUrl}`} />
                <AvatarFallback className="rounded-none bg-primary dark:text-zinc-800 text-white ">{`${activeAccount.name
                  .split(" ")
                  .slice(0, 2)
                  .map((n) => n?.[0]?.toUpperCase() || "")
                  .join("")}`}</AvatarFallback>
              </Avatar>
              <div className="w-full hidden lg:flex items-center gap-2 min-w-0">
                <div className="w-full flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm max-w-[80%] truncate ">
                    {activeAccount.name}
                  </span>
                  <p className="text-xs max-w-[80%] truncate text-zinc-500 dark:text-zinc-400">
                    {activeAccount.email}
                  </p>
                </div>
                <div>
                  <ChevronDown
                    className={cn(
                      "size-4 transition ease-linear duration-300",
                      onOpen && "-scale-y-100"
                    )}
                  />
                </div>
              </div>
            </div>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          style={{
            width: shouldShowCompact
              ? undefined
              : "var(--radix-dropdown-menu-trigger-width)",
          }}
          className={cn(
            "w-full bg-white dark:bg-zinc-900 rounded-[20px] corner-squircle p-1 shadow-sm dark:shadow-none border dark:border-zinc-700/50 mb-1 flex-col gap-1",
            shouldShowCompact
              ? "w-64"
              : "w-[var(--radix-dropdown-menu-trigger-width)] min-w-[var(--radix-dropdown-menu-trigger-width)] max-w-[var(--radix-dropdown-menu-trigger-width)]"
          )}
        >
          {sortedAccounts.map((account) =>
            account.active ? (
              <DropdownMenuItem
                key={account.id}
                className="w-full h-auto p-2 rounded-[12px] corner-squircle flex items-center gap-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 cursor-pointer transition duration-300"
              >
                <Avatar className="rounded-[8px] corner-squircle size-8 shrink-0">
                  <AvatarImage
                    className="rounded-[8px] size-8 overflow-clip"
                    src={`${account.imageUrl}`}
                  />
                  <AvatarFallback className="rounded-none bg-primary dark:text-zinc-800 text-white text-xs">
                    {`${account.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n?.[0]?.toUpperCase() || "")
                      .join("")}`}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-medium truncate">{account.name}</span>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{account.email}</p>
                </div>
                <BadgeCheck className="w-4 h-4 mr-1 shrink-0 text-white fill-primary" />
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                key={account.id}
                className="w-full h-auto p-2 rounded-[12px] corner-squircle flex items-center gap-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 cursor-pointer transition duration-300"
                asChild
              >
                <a
                  href={`${window.location.origin}/${accounts.indexOf(
                    account
                  )}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar className="rounded-[8px] corner-squircle size-8 shrink-0">
                    <AvatarImage
                      className="rounded-[8px] size-8 overflow-clip"
                      src={`${account.imageUrl}`}
                    />
                    <AvatarFallback className="rounded-none bg-primary dark:text-zinc-800 text-white text-xs">
                      {`${account.name
                        .split(" ")
                        .slice(0, 2)
                        .map((n) => n?.[0]?.toUpperCase() || "")
                        .join("")}`}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full flex flex-col gap-0.5 min-w-0">
                    <span className="text-sm font-medium truncate">{account.name}</span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{account.email}</p>
                  </div>
                </a>
              </DropdownMenuItem>
            )
          )}
          <DropdownMenuItem
            asChild
            className="w-full dark:hover:bg-zinc-700/60 hover:bg-zinc-100 rounded-lg py-3 px-4 mb-1 gap-2.5 cursor-pointer text-sm font-normal text-zinc-800 dark:text-zinc-200"
          >
            <Link
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_AUTH_URL}?new_session=1`}
            >
              <PlusSquare className="w-4 h-4 stroke-[1.5]" />
              <span>{t("userAccount.addAnotherAccount")}</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleSettingsClick}
            onSelect={(e) => {
              if (!settingsHref) {
                e.preventDefault();
                handlePreferencesOpenChange(true);
                setOnOpen(false);
              }
            }}
            className="w-full dark:hover:bg-zinc-700/60 hover:bg-zinc-100 rounded-lg py-3 px-4 mb-1 gap-2.5 cursor-pointer text-sm font-normal text-zinc-800 dark:text-zinc-200 flex items-center"
            asChild={!!settingsHref}
          >
            {settingsHref ? (
              <Link href={settingsHref}>
                <Settings className="w-4 h-4 stroke-[1.5]" />
                <span>{t("userAccount.settings") || "Settings"}</span>
              </Link>
            ) : (
              <>
                <Settings className="w-4 h-4 stroke-[1.5]" />
                <span>{t("userAccount.settings") || "Settings"}</span>
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="w-full flex justify-start py-3 px-4 gap-2.5 items-center transition ease-in-out text-sm rounded-lg text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 cursor-pointer"
          >
            <LogOut className="w-4 h-4 stroke-[1.5] text-red-500" />
            <span className="text-red-500">{t("userAccount.signOut")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AccountPreferencesModal
        open={isPreferencesModalOpen}
        onOpenChange={handlePreferencesOpenChange}
        authUser={auth_user}
        showPlan={showPlan ?? accountPreferencesProps?.showPlan}
        platform={platform ?? accountPreferencesProps?.platform}
        user={
          activeAccount
            ? {
                name: activeAccount.name,
                email: activeAccount.email,
                imageUrl: activeAccount.imageUrl,
              }
            : undefined
        }
        {...accountPreferencesProps}
      />
    </div>
  );
};

export default UserAccount;
