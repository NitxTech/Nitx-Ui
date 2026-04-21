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
import { cn } from "./lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

import { useTranslation } from "react-i18next";
import { SpaceSelectorProvider, useSpaceSelector } from "./context";
import { ProxySpace, SpaceSelectorApi } from "./types";
import BrowseSpaceModal from "./components/modals/BrowseSpaceModal";
import NewSpaceModal from "./components/modals/NewSpaceModal";
import MembersAndNumbersModal from "./components/modals/MembersAndNumbersModal";
import ManageMembersModal from "./components/modals/ManageMembersModal";
import DeleteConfirmationModal from "./components/modals/DeleteConfirmationModal"; // Added

interface SpaceSelectorProps {
  spaces: ProxySpace[];
  activeSpace: ProxySpace | undefined;
  onSpaceSelect: (space: ProxySpace) => void;
  api?: SpaceSelectorApi;
  authUser?: string | number;
  isExpanded?: boolean;
  className?: string;
  onRefreshSpaces?: () => void; // Explicit prop
}

const SpaceSelectorContent = () => {
  const { t } = useTranslation("shared");
  const {
    spaces,
    activeSpace,
    setActiveSpace,
    isExpanded,
    setModal,
    setModalProps,
  } = useSpaceSelector();

  const [showOptions, setShowOptions] = useState(false);

  const isRTL = typeof document !== "undefined" && document.dir === "rtl";

  const sortedSpaces = useMemo(() => {
    return [...spaces].sort((a, b) => {
      if (a.proxyId === activeSpace?.proxyId) return -1;
      if (b.proxyId === activeSpace?.proxyId) return 1;
      return 0;
    });
  }, [spaces, activeSpace]);

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
                "w-full h-auto bg-accent px-5 py-2 rounded-lg flex items-center cursor-pointer transition-all duration-300 border border-transparent hover:border-primary",
                !isExpanded &&
                  "items-center justify-center w-[40px] h-[40px] mx-auto",
                showOptions && "border-primary"
              )}
            >
              {isExpanded ? (
                <>
                  <div className="w-full flex flex-col gap-1">
                    <span className="text-xs">{t("sidebar.Space")}</span>
                    <div className="text-sm xl:text-base w-full max-w-40 capitalize truncate">
                      <p>{activeSpace?.name}</p>
                      {!activeSpace?.name && (
                        <Skeleton className="h-4 w-3/4 bg-gray-300/80" />
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 xl:w-5 xl:h-5 transition ease-linear duration-300",
                      showOptions && "-scale-y-100"
                    )}
                  />
                </>
              ) : (
                <div>
                  <Building2 className="w-5 h-5" />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[260px] bg-white rounded-lg p-1 border flex-col gap-1 text-sm shadow-lg z-[100]">
            <p
              className={`text-[11px] text-zinc-600 uppercase p-3 ${
                isRTL ? "!text-right" : "!text-left"
              }`}
            >
              {t("sidebar.Recently Spaces")}
            </p>

            {sortedSpaces.slice(0, 3).map((option, key) => (
              <DropdownMenuItem
                key={key}
                onClick={() => handleChange(option)}
                className="w-full flex text-sm capitalize justify-start p-2 gap-3 items-center transition ease-in-out rounded-sm hover:bg-zinc-100/60 cursor-pointer"
              >
                <Building2 className="w-4 h-4 stroke-[1.5]" />
                <p className="max-w-[8rem] truncate">{option.name}</p>
                <CheckCircle
                  className={cn(
                    "ms-auto w-4 h-4 stroke-zinc-400",
                    activeSpace?.proxyId === option.proxyId && "stroke-primary"
                  )}
                />
              </DropdownMenuItem>
            ))}
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

      <BrowseSpaceModal />
      <NewSpaceModal />
      <MembersAndNumbersModal />
      <ManageMembersModal />
      <DeleteConfirmationModal />
    </>
  );
};

export const SpaceSelector = (props: SpaceSelectorProps) => {
  return (
    <SpaceSelectorProvider {...props}>
      <SpaceSelectorContent />
    </SpaceSelectorProvider>
  );
};
