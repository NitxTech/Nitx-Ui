import { useEffect } from "react";
import { create } from "zustand";

import type { Folder, Path } from "../types";

export type AssetsTab = "all" | "media" | "document" | "link";
export type AssetsViewType = "grid" | "list" | "grid-list";

// UI-only state for the asset browser. Server data (assets, folders) lives
// in react-query — see use-assets-query.ts. This store carries what has to
// survive across components — including ones mounted outside the browser,
// like a consumer topbar tabbar: the breadcrumb path, the active tab and
// view, and which item is being renamed inline.
interface AssetsStoreState {
  path: Path[];
  setPath: (value: Path[]) => void;
  addPath: (value: Path) => void;
  activeTab: AssetsTab;
  setActiveTab: (value: AssetsTab) => void;
  viewType: AssetsViewType;
  setViewType: (value: AssetsViewType) => void;
  activeDirectory: Folder | null;
  setActiveDirectory: (value: Folder | null) => void;
  renamingItemId: string | null;
  setRenamingItemId: (value: string | null) => void;
  /** id of the card whose options menu is open — at most one at a time. */
  openMenuId: string | null;
  setOpenMenuId: (value: string | null) => void;
  reset: () => void;
}

const ROOT_PATH: Path[] = [{ id: null, label: "Root" }];

export const useAssetsStore = create<AssetsStoreState>((set) => ({
  path: ROOT_PATH,
  setPath: (value: Path[]) => set({ path: value }),
  addPath: (value: Path) => set((state) => ({ path: [...state.path, value] })),
  activeTab: "all",
  setActiveTab: (value: AssetsTab) => set({ activeTab: value }),
  viewType: "grid",
  setViewType: (value: AssetsViewType) => set({ viewType: value }),
  activeDirectory: null,
  setActiveDirectory: (value: Folder | null) => set({ activeDirectory: value }),
  renamingItemId: null,
  setRenamingItemId: (value: string | null) => set({ renamingItemId: value }),
  openMenuId: null,
  setOpenMenuId: (value: string | null) => set({ openMenuId: value }),
  reset: () =>
    set({
      path: ROOT_PATH,
      activeTab: "all",
      activeDirectory: null,
      renamingItemId: null,
      openMenuId: null,
    }),
}));

/**
 * Closes the open card options menu when the user interacts anywhere outside
 * a menu or a card's actions area. Radix dismisses its own layer, but the
 * cards' menus are driven by shared state, so this guarantees the state is
 * cleared even if a layer's dismissal is suppressed.
 */
export function useAssetsMenuDismiss() {
  const openMenuId = useAssetsStore((s) => s.openMenuId);
  const setOpenMenuId = useAssetsStore((s) => s.setOpenMenuId);

  useEffect(() => {
    if (!openMenuId) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (
        target?.closest?.('[role="menu"]') ||
        target?.closest?.("[data-nitxui-card-actions]")
      ) {
        return;
      }
      setOpenMenuId(null);
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [openMenuId, setOpenMenuId]);
}
