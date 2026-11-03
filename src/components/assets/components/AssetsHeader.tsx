"use client";

import React, { useState } from "react";
import {
  AlignJustify,
  Check,
  ChevronDown,
  LayoutGrid,
  Plus,
  Search as SearchIcon,
  SquareCheck,
} from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlusSignSquareIcon,
  FolderAddIcon,
} from "@hugeicons/core-free-icons";

import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { cn } from "../../../lib/utils";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { useAssetsConfig } from "../context";
import {
  useAssetsStore,
  type AssetsSortBy,
  type AssetsViewType,
} from "../hooks/use-assets-store";
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

const SORT_OPTIONS: AssetsSortBy[] = [
  "last_added",
  "oldest",
  "name_asc",
  "name_desc",
];

const SORT_LABEL_KEY: Record<AssetsSortBy, string> = {
  last_added: "assets.assetsHeader.sortLastAdded",
  oldest: "assets.assetsHeader.sortOldest",
  name_asc: "assets.assetsHeader.sortNameAsc",
  name_desc: "assets.assetsHeader.sortNameDesc",
};

/** Row 1 controls: 40px tall, 8px corners, matching the design. */
const controlClass = "h-10 rounded-[12px] text-sm font-medium";

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
  const sortBy = useAssetsStore((s) => s.sortBy);
  const setSortBy = useAssetsStore((s) => s.setSortBy);
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

  /** The three view icons: bare glyphs, brand blue when active. */
  const viewIconButton = (
    label: string,
    active: boolean,
    onClick: () => void,
    icon: React.ReactNode
  ) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={onClick}
          aria-label={label}
          aria-pressed={active}
          className={cn(
            "flex size-7 items-center justify-center rounded-[8px] transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            active
              ? "text-[#0000FF] dark:text-blue-400"
              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          )}
        >
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider>
      <div className="w-full flex flex-col gap-3">
        {/* Row 1: search + primary actions */}
        <div className="w-full flex items-center gap-2 sm:gap-3">
          <div className="relative flex-grow min-w-0">
            <Input
              type="search"
              placeholder={t("assets.assetsHeader.searchPlaceholder")}
              onChange={onSearch}
              className={cn(
                controlClass,
                "w-full ps-4 pe-10 py-0 font-normal border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 shadow-none",
                "dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500",
                "focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:ring-offset-0"
              )}
            />
            <SearchIcon className="size-4 absolute top-1/2 end-4 -translate-y-1/2 text-zinc-400 pointer-events-none" />
          </div>

          {showCreateLink ? (
            <Button
              aria-label={t("assets.assetsHeader.createLink")}
              onClick={onCreateLinkClick}
              className={cn(
                controlClass,
                "px-4 items-center gap-2 hidden md:inline-flex bg-[#0000FF] hover:bg-blue-700 active:scale-98 text-white shadow-none cursor-pointer"
              )}
            >
              <HugeiconsIcon
                icon={PlusSignSquareIcon}
                className="size-4 stroke-[2] text-white"
              />
              <span>{t("assets.assetsHeader.createLink")}</span>
            </Button>
          ) : (
            <>
              {showUpload && (
                <Button
                  aria-label={t("assets.assetsHeader.upload")}
                  onClick={onUploadClick}
                  className={cn(
                    controlClass,
                    "px-4 items-center gap-2 hidden md:inline-flex bg-[#0000FF] hover:bg-blue-700 active:scale-98 text-white shadow-none cursor-pointer"
                  )}
                >
                  <HugeiconsIcon
                    icon={PlusSignSquareIcon}
                    className="size-4 stroke-[2] text-white"
                  />
                  <span>{t("assets.assetsHeader.upload")}</span>
                </Button>
              )}

              {showNewFolder && (
                <Button
                  aria-label={t("assets.assetsHeader.newFolder")}
                  variant="outline"
                  onClick={onNewFolderClick}
                  className={cn(
                    controlClass,
                    "group px-4 items-center gap-2 hidden md:inline-flex border border-zinc-200 bg-white hover:bg-zinc-50 active:scale-98 text-zinc-900 shadow-none cursor-pointer transition-colors",
                    "dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-100"
                  )}
                >
                  <HugeiconsIcon
                    icon={FolderAddIcon}
                    className="size-4 stroke-[2] text-zinc-700 dark:text-zinc-300"
                  />
                  <span>{t("assets.assetsHeader.newFolder")}</span>
                </Button>
              )}
            </>
          )}
        </div>

        {features.folders && path.length > 1 && (
          <AssetsPath className="w-full min-w-0 text-xs" />
        )}

        {/* Row 2: sort filter on the start side, view switch on the end side */}
        <div className="flex items-center justify-between gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 rounded-[8px] py-1 text-xs cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                )}
                aria-label={`${t("assets.assetsHeader.filter")} ${t(SORT_LABEL_KEY[sortBy])}`}
              >
                <span className="text-zinc-500 dark:text-zinc-400">
                  {t("assets.assetsHeader.filter")}
                </span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {t(SORT_LABEL_KEY[sortBy])}
                </span>
                <ChevronDown
                  className="size-3.5 text-zinc-600 dark:text-zinc-400"
                  aria-hidden
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="rounded-[14px] corner-squircle min-w-[160px] p-1"
            >
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onSelect={() => setSortBy(option)}
                  className="flex items-center justify-between gap-3 rounded-[8px] px-2.5 py-1.5 text-xs cursor-pointer"
                >
                  <span>{t(SORT_LABEL_KEY[option])}</span>
                  {option === sortBy && (
                    <Check className="size-3.5 text-[#0000FF]" aria-hidden />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-1 shrink-0">
            {viewIconButton(
              t("assets.assetsHeader.gridView"),
              viewType === "grid",
              () => onChangeView("grid"),
              <LayoutGrid className="size-[18px] stroke-[1.75]" aria-hidden />
            )}
            {viewIconButton(
              t("assets.assetsHeader.listView"),
              viewType !== "grid",
              () => onChangeView("list"),
              <AlignJustify className="size-[18px] stroke-[1.75]" aria-hidden />
            )}
            {viewIconButton(
              t("assets.assetsHeader.multiSelect"),
              enableCheckbox,
              () => onEnableCheckbox(!enableCheckbox),
              <SquareCheck
                className={cn(
                  "size-[18px] stroke-[1.75]",
                  // Active: a solid brand-blue square with a white tick.
                  enableCheckbox && "fill-[#0000FF] text-white dark:fill-blue-400"
                )}
                aria-hidden
              />
            )}
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
