"use client";

import React, { useState } from "react";
import {
  Search as SearchIcon,
  LayoutDashboard,
  AlignJustify,
  Plus,
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignSquareIcon,
  FolderAddIcon,
  CheckmarkSquare02Icon,
} from "@hugeicons/core-free-icons";

import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { cn } from "../../../lib/utils";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { useAssetsConfig } from "../context";
import { useAssetsStore, type AssetsViewType } from "../hooks/use-assets-store";
import AssetsPath from "./AssetsPath";

interface AssetsHeaderProps {
  viewType: AssetsViewType;
  onChangeView: (type: AssetsViewType) => void;
  enableCheckbox: boolean;
  onEnableCheckbox: (value: boolean) => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUploadClick: () => void;
  onNewFolderClick: () => void;
  onCreateLinkClick?: () => void;
}

const AssetsHeader = ({
  viewType,
  onChangeView,
  enableCheckbox,
  onEnableCheckbox,
  onSearch,
  onUploadClick,
  onNewFolderClick,
  onCreateLinkClick,
}: AssetsHeaderProps) => {
  const { t } = useNitxUiTranslation();
  const { features } = useAssetsConfig();
  const activeTab = useAssetsStore((s) => s.activeTab);
  const path = useAssetsStore((s) => s.path);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const showUpload =
    features.upload &&
    (activeTab === "all" || activeTab === "media" || activeTab === "document");
  const showNewFolder = features.folders && activeTab === "all";
  const showCreateLink =
    features.links && activeTab === "link" && !!onCreateLinkClick;

  const handleMobileButtonClick = () => {
    if (activeTab === "all") {
      setShowMobileMenu(!showMobileMenu);
    } else if (activeTab === "link") {
      onCreateLinkClick?.();
    } else if (features.upload) {
      onUploadClick();
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex items-center mt-6 gap-3">
          <div className="relative flex-grow">
            <Input
              type="search"
              placeholder={t("assets.assetsHeader.searchPlaceholder")}
              onChange={onSearch}
              className="w-full px-5 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 shadow-xs focus-visible:ring-2 focus-visible:ring-blue-500/20"
            />
            <SearchIcon className="w-4 h-4 absolute top-1/2 right-4 rtl:right-auto rtl:left-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          {showCreateLink ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label={t("assets.assetsHeader.createLink")}
                  onClick={onCreateLinkClick}
                  className="h-10 px-4 rounded-xl items-center gap-2 hidden md:inline-flex bg-[#0000FF] hover:bg-blue-700 active:scale-98 text-white font-semibold text-xs sm:text-sm shadow-xs cursor-pointer"
                >
                  <HugeiconsIcon
                    icon={PlusSignSquareIcon}
                    className="w-4 h-4 stroke-[2] mx-auto text-white"
                  />
                  <span className="hidden md:inline">
                    {t("assets.assetsHeader.createLink")}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t("assets.assetsHeader.createLink")}
              </TooltipContent>
            </Tooltip>
          ) : (
            <>
              {showUpload && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      aria-label={t("assets.assetsHeader.upload")}
                      onClick={onUploadClick}
                      className="h-10 px-4 rounded-xl items-center gap-2 hidden md:inline-flex bg-[#0000FF] hover:bg-blue-700  active:scale-98 text-white font-semibold text-xs sm:text-sm shadow-xs cursor-pointer"
                    >
                      <HugeiconsIcon
                        icon={PlusSignSquareIcon}
                        className="w-4 h-4 stroke-[2] mx-auto text-white"
                      />
                      <span className="hidden md:inline">
                        {t("assets.assetsHeader.upload")}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {t("assets.assetsHeader.upload")}
                  </TooltipContent>
                </Tooltip>
              )}

              {showNewFolder && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      aria-label={t("assets.assetsHeader.newFolder")}
                      variant="outline"
                      onClick={onNewFolderClick}
                      className="group h-10 px-4 rounded-xl items-center gap-2 hidden md:inline-flex border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:bg-gray-100 dark:hover:bg-zinc-800 active:scale-98 text-gray-800 dark:text-zinc-200 dark:hover:text-white font-semibold text-xs sm:text-sm shadow-xs cursor-pointer transition-colors"
                    >
                      <HugeiconsIcon
                        icon={FolderAddIcon}
                        className="w-4 h-4 stroke-[2] mx-auto text-gray-600 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors"
                      />
                      <span className="hidden md:inline">
                        {t("assets.assetsHeader.newFolder")}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {t("assets.assetsHeader.newFolder")}
                  </TooltipContent>
                </Tooltip>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {features.folders && path.length > 1 && (
            <AssetsPath className="w-full flex-1 mb-2 py-2 text-xs" />
          )}
          <div className="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-zinc-900/80 border border-gray-200/80 dark:border-zinc-800 gap-1 ml-auto rtl:ml-0 rtl:mr-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => onChangeView("grid")}
                  className={cn(
                    "flex items-center justify-center p-1.5 rounded-lg transition-all text-xs font-medium cursor-pointer",
                    viewType === "grid"
                      ? "bg-white dark:bg-zinc-800 text-[#0000FF] dark:text-white shadow-xs"
                      : "text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <LayoutDashboard className="w-4 h-4 stroke-[1.8]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t("assets.assetsHeader.gridView")}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => onChangeView("list")}
                  className={cn(
                    "flex items-center justify-center p-1.5 rounded-lg transition-all text-xs font-medium cursor-pointer",
                    viewType === "list"
                      ? "bg-white dark:bg-zinc-800 text-[#0000FF] dark:text-white shadow-xs"
                      : "text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <AlignJustify className="w-4 h-4 stroke-[1.8]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t("assets.assetsHeader.listView")}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => onEnableCheckbox(!enableCheckbox)}
                  className={cn(
                    "flex items-center gap-1.5 p-1.5 rounded-lg transition-all text-xs font-medium cursor-pointer",
                    enableCheckbox
                      ? "bg-blue-50 dark:bg-blue-950/60 text-[#0000FF] dark:text-blue-400 shadow-xs"
                      : "text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  {enableCheckbox && (
                    <span className="text-xs font-semibold px-0.5">
                      {t("assets.assetsHeader.multiSelect")}
                    </span>
                  )}
                  <HugeiconsIcon
                    icon={CheckmarkSquare02Icon}
                    className="w-4 h-4"
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t("assets.assetsHeader.multiSelect")}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Mobile floating action button */}
        {(features.upload || showCreateLink || showNewFolder) && (
          <div className="lg:hidden">
            {activeTab === "all" && showMobileMenu && (
              <div className="fixed bottom-[calc(11rem_+_var(--nitx-bottom-inset,0px))] md:bottom-[calc(9rem_+_var(--nitx-bottom-inset,0px))] right-5 rtl:right-auto rtl:left-5 flex flex-col gap-3 z-[99999] animate-in fade-in slide-in-from-bottom-2 duration-200">
                {features.upload && (
                  <Button
                    aria-label={t("assets.assetsHeader.upload")}
                    onClick={() => {
                      onUploadClick();
                      setShowMobileMenu(false);
                    }}
                    size="lg"
                    className="w-16 h-16 rounded-full shadow-lg"
                  >
                    <HugeiconsIcon
                      icon={PlusSignSquareIcon}
                      className="w-6 h-6 stroke-white"
                    />
                  </Button>
                )}
                {features.folders && (
                  <Button
                    aria-label={t("assets.assetsHeader.newFolder")}
                    variant="outline"
                    onClick={() => {
                      onNewFolderClick();
                      setShowMobileMenu(false);
                    }}
                    size="lg"
                    className="w-16 h-16 rounded-full shadow-lg bg-card"
                  >
                    <HugeiconsIcon
                      icon={FolderAddIcon}
                      className="w-6 h-6 stroke-primary"
                    />
                  </Button>
                )}
              </div>
            )}

            <Button
              aria-label={t("assets.assetsHeader.actions")}
              size="lg"
              onClick={handleMobileButtonClick}
              className={cn(
                "md:hidden fixed bottom-[calc(6rem_+_var(--nitx-bottom-inset,0px))] right-5 rtl:right-auto rtl:left-5 w-16 h-16 py-0 px-0 aspect-square rounded-full z-50 transition-transform duration-200",
                showMobileMenu && "rotate-45"
              )}
            >
              <Plus className="w-6 h-6 stroke-white" />
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default AssetsHeader;
