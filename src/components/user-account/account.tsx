"use client";

import { cn } from "../../lib/utils";
import { useRouter } from "next/navigation";
import { BadgeCheck, ChevronDown, LogOut, PlusSquare } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface UserAccountProps {
  accounts: {
    id: number;
    name: string;
    email: string;
    imageUrl?: string;
    active: boolean;
  }[];
  isExpanded: boolean;
}

export const UserAccount = ({ accounts, isExpanded }: UserAccountProps) => {
  const [onOpen, setOnOpen] = useState(false);

  const router = useRouter();

  const activeAccount =
    accounts?.find((account) => account.active) || accounts[0];

  const handleSignOut = async () => {
    router.replace(`${process.env.NEXT_PUBLIC_AUTH_URL}/signout`);
  };

  if (!activeAccount) return null;

  return (
    <div className="relative w-full">
      <DropdownMenu onOpenChange={() => setOnOpen(!onOpen)}>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "w-full h-auto bg-gray-100 p-3 rounded-[16px] flex items-center gap-2 overflow-hidden cursor-pointer transitio-all duration-300 hover:border hover:border-primary ",
              !isExpanded && "p-0 bg-transparent size-[40px] mx-auto",
              onOpen && "border border-primary"
            )}
          >
            <Avatar
              className={cn(
                "rounded-[10px] size-12 overflow-clip",
                !isExpanded && "size-[40px] mx-auto"
              )}
            >
              <AvatarImage src={`${activeAccount?.imageUrl}`} />
              <AvatarFallback className="rounded-none bg-primary text-white ">{`${activeAccount.name
                .split(" ")
                .map((n) => n[0].toUpperCase())
                .join("")}`}</AvatarFallback>
            </Avatar>
            {isExpanded && (
              <>
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
              </>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="xl:min-w-[260px] w-full bg-white dark:bg-zinc-800 rounded-[20px] p-1 shadow-sm border mb-1 flex-col gap-1">
          {accounts.map((account) => (
            <DropdownMenuItem
              key={account.id}
              className="w-full h-auto p-3 rounded-[16px] flex items-center gap-3 hover:bg-zinc-100 cursor-pointer transition duration-300"
            >
              <Avatar className="rounded-sm size-12">
                <AvatarImage
                  className="rounded-[10px] size-12 overflow-clip"
                  src={`${activeAccount.imageUrl}`}
                />
                <AvatarFallback className="rounded-none bg-primary text-white ">{`${activeAccount.name
                  .split(" ")
                  .map((n) => n[0].toUpperCase())
                  .join("")}`}</AvatarFallback>
              </Avatar>
              <div className="w-full flex flex-col gap-0.5">
                <span className="text-sm truncate">{activeAccount.name}</span>
                <p className="text-xs truncate">{activeAccount.email}</p>
              </div>

              {account.active && (
                <BadgeCheck className="w-4 h-4 mr-1 text-white fill-primary" />
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem className="xl:min-w-[260px] w-full bg-white dark:bg-zinc-800 hover:bg-zinc-100 rounded-lg py-3 px-4 mb-1 gap-1">
            <PlusSquare className="w-4 h-4 stroke-[1.5]" />
            Add another account
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="w-full flex justify-start p-4 gap-3 items-center transition ease-in-out text-sm rounded-[16px] text-red-500 hover:bg-zinc-100/60"
          >
            <LogOut className="w-4 h-4 stroke-[1.5]" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
