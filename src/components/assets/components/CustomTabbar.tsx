"use client";

import React from "react";

import { TabBar, type TabBarItem } from "../../ui/tab-bar";

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
  /** Names the tab list for screen readers. */
  ariaLabel?: string;
}

/**
 * The assets tab bar. This is the reference the shared `TabBar` was built
 * from, so it is now a thin adapter over it: same geometry, one
 * implementation, and the tab-list semantics and arrow keys come for free.
 */
const CustomTabbar = ({
  tabs,
  activeTab,
  onTabChange,
  className,
  sticky = true,
  ariaLabel,
}: CustomTabbarProps) => (
  <TabBar
    items={tabs as TabBarItem[]}
    activeTab={activeTab}
    onTabChange={onTabChange}
    sticky={sticky}
    ariaLabel={ariaLabel}
    className={className}
  />
);

export default CustomTabbar;
