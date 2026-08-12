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
        <div className="w-full flex items-center mt-6 gap-4">
          <div className="relative flex-grow">
            <Input
              type="search"
              placeholder={t("assets.assetsHeader.searchPlaceholder")}
              onChange={onSearch}
              className="w-full px-6 border-input rounded-[12px] shadow-none"
            />
            <SearchIcon className="w-4 h-4 absolute top-1/2 right-6 rtl:right-auto rtl:left-6 -translate-y-1/2 text-muted-foreground" />
          </div>

          {showCreateLink ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  aria-label={t("assets.assetsHeader.createLink")}
                  size="lg"
                  onClick={onCreateLinkClick}
                  className="py-0 px-0 aspect-square rounded-[12px] lg:w-auto lg:aspect-auto lg:px-5 md:flex items-center gap-2 hidden"
                >
                  <HugeiconsIcon
                    icon={PlusSignSquareIcon}
                    className="w-4 h-4 stroke-[1.5] mx-auto text-white"
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
                      size="lg"
                      className="py-0 px-0 aspect-square rounded-[12px] lg:w-auto lg:aspect-auto lg:px-5 md:flex items-center gap-2 hidden"
                    >
                      <HugeiconsIcon
                        icon={PlusSignSquareIcon}
                        className="w-4 h-4 stroke-[1.5] mx-auto text-white"
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
                      size="lg"
                      onClick={onNewFolderClick}
                      className="items-center gap-2 py-0 px-0 aspect-square rounded-[12px] lg:w-auto lg:aspect-auto lg:px-5 md:flex hidden"
                    >
                      <HugeiconsIcon
                        icon={FolderAddIcon}
                        className="w-4 h-4 stroke-[1.5] mx-auto"
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
          <div className="flex gap-0 ml-auto rtl:ml-0 rtl:mr-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChangeView("grid")}
                  className={cn(
                    "icon flex items-center justify-center p-2 rounded-md transition-all text-muted-foreground hover:text-foreground",
                    viewType === "grid" &&
                      "text-primary focus:text-primary bg-card shadow-sm"
                  )}
                >
                  <LayoutDashboard className="w-4 h-4 stroke-[1.5]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t("assets.assetsHeader.gridView")}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onChangeView("list")}
                  className={cn(
                    "icon flex items-center justify-center p-2 rounded-md transition-all text-muted-foreground hover:text-foreground",
                    viewType === "list" &&
                      "text-primary focus:text-primary bg-card shadow-sm"
                  )}
                >
                  <AlignJustify className="w-4 h-4 stroke-[1.5]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t("assets.assetsHeader.listView")}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onEnableCheckbox(!enableCheckbox)}
                  className={cn(
                    "icon flex items-center gap-1 p-2 rounded-md transition-all text-muted-foreground hover:text-foreground",
                    enableCheckbox && "w-auto gap-1 px-2 text-primary"
                  )}
                >
                  {enableCheckbox && (
                    <p className="text-xs text-primary">
                      {t("assets.assetsHeader.multiSelect")}
                    </p>
                  )}
                  <HugeiconsIcon
                    icon={CheckmarkSquare02Icon}
                    className={cn(
                      "size-4 stroke-primary text-primary",
                      enableCheckbox &&
                        "size-5 fill-primary stroke-primary text-white"
                    )}
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
              <div className="fixed md:bottom-[9rem] bottom-44 right-5 rtl:right-auto rtl:left-5 flex flex-col gap-3 z-[99999] animate-in fade-in slide-in-from-bottom-2 duration-200">
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
                "md:hidden fixed bottom-24 right-5 rtl:right-auto rtl:left-5 w-16 h-16 py-0 px-0 aspect-square rounded-full z-50 transition-transform duration-200",
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
