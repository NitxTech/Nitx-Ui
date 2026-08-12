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
        "w-full bg-card border-y",
        sticky && "sticky top-0 z-10",
        className
      )}
    >
      <div className="flex items-start px-4 pt-3 sm:px-6 gap-4 sm:gap-6 md:gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "text-xs sm:text-sm font-normal flex items-center gap-2 sm:gap-3 pb-2 sm:pb-3  transition-all duration-200 relative",
              "hover:text-foreground",
              activeTab === tab.id
                ? "border-b border-foreground text-foreground"
                : "border-b border-transparent text-muted-foreground"
            )}
          >
            <span className="flex-shrink-0">{tab.icon}</span>
            <span className="whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CustomTabbar;
