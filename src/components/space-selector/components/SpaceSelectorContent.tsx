"use client";

import React, { useMemo, useState } from "react";
import {
  Building2,
  CheckCircle,
  ChevronDown,
  SquareArrowOutUpRight,
  SquarePlus,
  Users2,
} from "lucide-react";
import { cn } from "../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Skeleton } from "../ui/skeleton";

import { useSpaceSelector } from "../context";
import { ProxySpace } from "../types";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";


export const SpaceSelectorContent = () => {
  const { t } = useNitxUiTranslation();
  const {
    spaces,
    activeSpace,
    setActiveSpace,
    isExpanded,
    setModal,
    setModalProps,
    className,
    triggerClassName,
  } = useSpaceSelector();

  const [showOptions, setShowOptions] = useState(false);

  const isRTL = typeof document !== "undefined" && document.dir === "rtl";

  const sortedSpaces = spaces;

  const handleChange = (space: ProxySpace) => {
    setShowOptions(false);
    setActiveSpace(space);
  };

  return (
    <>
      <div className="relative w-full">
        <DropdownMenu onOpenChange={setShowOptions}>
          <DropdownMenuTrigger asChild>
            <div
              className={cn(
                "w-full h-auto bg-accent dark:bg-zinc-900 px-3.5 py-2 rounded-md flex items-center cursor-pointer transition-all duration-300 border border-transparent hover:border-primary gap-2.5",
                !isExpanded &&
                  "items-center justify-center w-[40px] h-[40px] mx-auto p-0 rounded-md",
                showOptions && "border-primary",
                triggerClassName,
                className
              )}
            >
              {isExpanded ? (
                <>
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4 xl:w-5 xl:h-5 text-zinc-600 dark:text-zinc-300 stroke-[1.8] shrink-0" />
                    </div>
                    <div className="flex flex-col justify-center min-w-0 flex-1">
                      <div className="text-sm xl:text-base w-full max-w-40 capitalize truncate">
                        <p>{activeSpace?.name}</p>
                        {!activeSpace?.name && (
                          <Skeleton className="h-4 w-3/4 bg-gray-300/80" />
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 xl:w-5 xl:h-5 transition ease-linear duration-300 shrink-0 ms-auto",
                      showOptions && "-scale-y-100"
                    )}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-zinc-600 dark:text-zinc-300 stroke-[1.8]" />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            style={{
              width: isExpanded
                ? "var(--radix-dropdown-menu-trigger-width)"
                : undefined,
            }}
            className={cn(
              "bg-white rounded-lg p-1 border flex-col gap-1 text-sm shadow-lg z-[100]",
              isExpanded
                ? "w-[var(--radix-dropdown-menu-trigger-width)] min-w-[var(--radix-dropdown-menu-trigger-width)] max-w-[var(--radix-dropdown-menu-trigger-width)]"
                : "w-64"
            )}
          >
            <p
              className={`text-xs font-semibold text-zinc-600 dark:text-zinc-300 uppercase p-3 ${
                isRTL ? "!text-right" : "!text-left"
              }`}
            >
              {t("sidebar.Recently Spaces")}
            </p>

            {sortedSpaces.slice(0, 3).map((option, key) => {
              const isSelected =
                activeSpace &&
                (activeSpace.proxyId === option.proxyId ||
                  (activeSpace.space_uuid && activeSpace.space_uuid === option.space_uuid));
              return (
                <DropdownMenuItem
                  key={option.space_uuid || option.proxyId || key}
                  onClick={() => handleChange(option)}
                  className="w-full flex text-sm capitalize justify-start p-2 gap-3 items-center transition ease-in-out rounded-sm hover:bg-zinc-100/60 cursor-pointer"
                >
                  <Building2 className="w-4 h-4 stroke-[1.5]" />
                  <p className="max-w-[8rem] truncate">{option.name}</p>
                  {isSelected && (
                    <CheckCircle className="ms-auto w-4 h-4 stroke-primary" />
                  )}
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator />
            <div className="w-full flex flex-col">
              <DropdownMenuItem
                onClick={() => setModal("browseSpace")}
                className="w-full p-2 transition ease-in-out rounded-sm hover:bg-zinc-100/60 cursor-pointer"
              >
                <div className="w-full flex gap-3 justify-start items-center">
                  <SquareArrowOutUpRight className="w-4 h-4 stroke-[1.5]" />
                  {t("sidebar.Browse More")}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setModal("newSpace")}
                className="w-full flex justify-start p-2 gap-3 items-center transition ease-in-out rounded-sm hover:bg-zinc-100/60 cursor-pointer"
              >
                <SquarePlus className="w-4 h-4 stroke-[1.5]" />
                {t("sidebar.New Space")}
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setModal("membersAndNumbers");
                setModalProps({
                  manageSpaceMembers: {
                    spaceId: activeSpace?.space_uuid || "",
                    spaceName: activeSpace?.name || "",
                  },
                });
              }}
              className="w-full flex justify-start mt-1 px-2 py-4 gap-3 items-center transition ease-in-out rounded-sm hover:bg-zinc-100/60 cursor-pointer"
            >
              <Users2 className="w-4 h-4 stroke-[1.5]" />
              {t("sidebar.Manage Members")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
