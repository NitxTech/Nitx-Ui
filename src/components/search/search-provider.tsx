"use client";

import * as React from "react";

import { useNitxUiTranslation } from "../../i18n/nitxuilib";
import { SearchDialog } from "./search-dialog";
import {
  isApplePlatform,
  isSearchShortcut,
  searchShortcut,
  type SearchShortcut,
} from "./shortcut";
import type { SearchSource } from "./types";

interface GlobalSearch {
  /**
   * Opens search. When it is dismissed without choosing anything, focus
   * returns to `returnFocusTo`, or to whatever had focus when it opened.
   */
  openSearch: (returnFocusTo?: HTMLElement | null) => void;
  /** This platform's shortcut; null until hydrated, since only the browser knows it. */
  shortcut: SearchShortcut | null;
}

const GlobalSearchContext = React.createContext<GlobalSearch | null>(null);

export function useGlobalSearch(): GlobalSearch {
  const context = React.useContext(GlobalSearchContext);
  if (!context) {
    throw new Error(
      "useGlobalSearch must be used inside <GlobalSearchProvider>",
    );
  }
  return context;
}

// The platform never changes while the page is open.
const subscribe = () => () => {};
const getIsApple = () => isApplePlatform(navigator);
const getServerIsApple = () => null;

export interface GlobalSearchProviderProps {
  /**
   * What search can find, in the order the groups should appear. Must be
   * stable: each source's `useItems` is a hook. Define it at module scope or
   * memoise it.
   */
  sources: readonly SearchSource<any>[];
  /** Defaults to `true` when the app language is Arabic. */
  rtl?: boolean;
  children: React.ReactNode;
}

/**
 * Global search: the dialog, its shortcut, and `useGlobalSearch` for whatever
 * opens it.
 *
 * The package owns all of that. What a product can find, and where each
 * result opens, comes in through `sources`.
 */
export function GlobalSearchProvider({
  sources,
  rtl,
  children,
}: GlobalSearchProviderProps) {
  const { i18n } = useNitxUiTranslation();
  const language = i18n?.resolvedLanguage ?? i18n?.language;
  const isRtl = rtl ?? language?.toLowerCase().startsWith("ar") ?? false;

  const [open, setOpen] = React.useState(false);
  const openRef = React.useRef(open);
  const returnFocusRef = React.useRef<HTMLElement | null>(null);
  const isApple = React.useSyncExternalStore(
    subscribe,
    getIsApple,
    getServerIsApple,
  );

  React.useEffect(() => {
    openRef.current = open;
  }, [open]);

  const openSearch = React.useCallback(
    (returnFocusTo?: HTMLElement | null) => {
      const focused = document.activeElement;
      returnFocusRef.current =
        returnFocusTo ?? (focused instanceof HTMLElement ? focused : null);
      setOpen(true);
    },
    [],
  );

  React.useEffect(() => {
    if (isApple === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.repeat ||
        event.isComposing ||
        !isSearchShortcut(event, isApple)
      ) {
        return;
      }
      // Ctrl+K would otherwise move focus to the browser's own search box.
      event.preventDefault();
      if (openRef.current) setOpen(false);
      else openSearch();
    };

    // Capture phase, so a field that stops key events from bubbling cannot
    // swallow the shortcut.
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [isApple, openSearch]);

  const value = React.useMemo(
    () => ({
      openSearch,
      shortcut: isApple === null ? null : searchShortcut(isApple),
    }),
    [isApple, openSearch],
  );

  return (
    <GlobalSearchContext.Provider value={value}>
      {children}
      <SearchDialog
        open={open}
        onOpenChange={setOpen}
        returnFocusRef={returnFocusRef}
        sources={sources}
        rtl={isRtl}
      />
    </GlobalSearchContext.Provider>
  );
}
