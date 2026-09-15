"use client";

import React from "react";

import { cn } from "../../../lib/utils";

export interface AssetsTabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface CustomTabbarProps {
  tabs: AssetsTabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  sticky?: boolean;
}

const CustomTabbar = ({
  tabs,
  activeTab,
  onTabChange,
  className,
  sticky = true,
}: CustomTabbarProps) => {
  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-zinc-950 border-y border-gray-200 dark:border-zinc-800 transition-all duration-200",
        sticky && "sticky top-0 z-30",
        className
      )}
    >
      <div className="flex items-center px-4 sm:px-6 lg:px-6 gap-4 sm:gap-6 md:gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "font-normal flex items-center gap-2 pb-3 transition-all duration-200 relative whitespace-nowrap pt-3 border-b-2 select-none cursor-pointer text-xs sm:text-sm",
                active
                  ? "border-[#212121] dark:border-white text-[#212121] dark:text-white font-normal"
                  : "border-transparent text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200"
              )}
            >
              <span
                className={cn(
                  "flex-shrink-0 transition-colors",
                  active
                    ? "text-[#212121] dark:text-white"
                    : "text-gray-400 dark:text-zinc-500"
                )}
              >
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CustomTabbar;
