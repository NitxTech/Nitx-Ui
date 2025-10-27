"use client";

import { cn } from "../../lib/utils";
import { useRouter } from "next/navigation";
import { BadgeCheck, ChevronDown, LogOut, PlusSquare } from "lucide-react";
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

interface UserAccountProps {
  accounts: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string | null;
    active: boolean;
  }[];
  isExpanded: boolean;
  auth_user: string | number;
}

export const UserAccount = ({
  accounts,
  isExpanded,
  auth_user,
}: UserAccountProps) => {
  const [onOpen, setOnOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  if (!activeAccount) return null;

  const shouldShowCompact = !isExpanded || isMobile;

  return (
    <div className="relative w-full">
      <DropdownMenu onOpenChange={() => setOnOpen(!onOpen)}>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "w-10 h-10 lg:w-full lg:h-auto border border-zinc-100 dark:border-zinc-700/50 bg-zinc-100 dark:bg-zinc-700/50 lg:p-3 rounded-[16px] flex items-center gap-2 overflow-hidden cursor-pointer transitio-all duration-300 hover:border-primary ",
              !isExpanded && "p-0 bg-transparent size-[40px] mx-auto",
              onOpen && "border-primary"
            )}
          >
            <Avatar
              className={cn(
                "rounded-[10px] size-10 lg:size-12 overflow-clip",
                !isExpanded && "lg:size-[40px] mx-auto"
              )}
            >
              <AvatarImage src={`${activeAccount?.imageUrl}`} />
              <AvatarFallback className="rounded-none bg-primary text-white ">{`${activeAccount.name
                .split(" ")
                .slice(0, 2)
                .map((n) => n[0].toUpperCase())
                .join("")}`}</AvatarFallback>
            </Avatar>
            {isExpanded && (
              <div className="w-full hidden lg:flex items-center gap-2">
                <div className="w-full flex flex-col gap-0.5">
                  <span className="text-sm max-w-[80%] truncate ">
                    {activeAccount.name}
                  </span>
                  <p className="text-xs max-w-[80%] truncate">
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
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="xl:min-w-[260px] w-full bg-white dark:bg-zinc-800 rounded-[20px] p-1 shadow-sm dark:shadow-none border dark:border-zinc-700/50 mb-1 flex-col gap-1">
          {sortedAccounts.map((account) =>
            account.active ? (
              <DropdownMenuItem
                key={account.id}
                className="w-full h-auto p-3 rounded-[16px] flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 cursor-pointer transition duration-300"
              >
                <Avatar className="rounded-sm size-12">
                  <AvatarImage
                    className="rounded-[10px] size-12 overflow-clip"
                    src={`${account.imageUrl}`}
                  />
                  <AvatarFallback className="rounded-none bg-primary text-white ">
                    {`${account.name
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0].toUpperCase())
                      .join("")}`}
                  </AvatarFallback>
                </Avatar>
                <div className="w-full flex flex-col gap-0.5">
                  <span className="text-sm truncate">{account.name}</span>
                  <p className="text-xs truncate">{account.email}</p>
                </div>
                <BadgeCheck className="w-4 h-4 mr-1 text-white fill-primary" />
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                key={account.id}
                className="w-full h-auto p-3 rounded-[16px] flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-zinc-700/60 cursor-pointer transition duration-300"
                asChild
              >
                <a
                  href={`${window.location.origin}/${accounts.indexOf(
                    account
                  )}/1`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar className="rounded-sm size-12">
                    <AvatarImage
                      className="rounded-[10px] size-12 overflow-clip"
                      src={`${account.imageUrl}`}
                    />
                    <AvatarFallback className="rounded-none bg-primary text-white ">{`${account.name
                      .split(" ")
                      .map((n) => n[0].toUpperCase())
                      .join("")}`}</AvatarFallback>
                  </Avatar>
                  <div className="w-full flex flex-col gap-0.5">
                    <span className="text-sm truncate">{account.name}</span>
                    <p className="text-xs truncate">{account.email}</p>
                  </div>
                </a>
              </DropdownMenuItem>
            )
          )}
          <DropdownMenuItem
            asChild
            className="xl:min-w-[260px] w-full dark:hover:bg-zinc-700/60 hover:bg-zinc-100 rounded-lg py-3 px-4 mb-1 gap-1"
          >
            <Link
              target="_blank"
              href={`${process.env.NEXT_PUBLIC_AUTH_URL}?new_session=1`}
            >
              <PlusSquare className="w-4 h-4 stroke-[1.5]" />
              Add another account
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="w-full flex justify-start p-4 gap-3 items-center transition ease-in-out text-sm rounded-[16px] text-red-500 hover:bg-zinc-100/60 dark:hover:bg-zinc-700/60"
          >
            <LogOut className="w-4 h-4 stroke-[1.5]" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
