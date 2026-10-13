// The global search shortcut: Command+K on Apple platforms, Ctrl+K elsewhere.

export interface SearchShortcut {
  /** Keys as printed on the keyboard, one per <kbd>. */
  keys: readonly string[];
  /** Value for `aria-keyshortcuts`. */
  aria: string;
}

const APPLE_SHORTCUT: SearchShortcut = { keys: ["⌘", "K"], aria: "Meta+K" };
const DEFAULT_SHORTCUT: SearchShortcut = { keys: ["Ctrl", "K"], aria: "Control+K" };

type PlatformNavigator = Pick<Navigator, "platform"> & {
  userAgentData?: { platform?: string };
};

/** macOS, iOS and iPadOS (which reports itself as a Mac). */
export function isApplePlatform(nav: PlatformNavigator): boolean {
  const platform = nav.userAgentData?.platform || nav.platform || "";
  return /mac|iphone|ipad|ipod/i.test(platform);
}

export const searchShortcut = (apple: boolean): SearchShortcut =>
  apple ? APPLE_SHORTCUT : DEFAULT_SHORTCUT;

type ShortcutEvent = Pick<
  KeyboardEvent,
  "key" | "code" | "metaKey" | "ctrlKey" | "altKey" | "shiftKey"
>;

export function isSearchShortcut(event: ShortcutEvent, apple: boolean): boolean {
  const modifier = apple
    ? event.metaKey && !event.ctrlKey
    : event.ctrlKey && !event.metaKey;
  if (!modifier || event.altKey || event.shiftKey) return false;

  // Layouts without Latin letters (Arabic, Cyrillic) report the typed
  // character in `key`, so fall back to the physical key there. Latin
  // layouts go by `key`, which keeps Dvorak and AZERTY on their own K.
  const key = event.key.toLowerCase();
  return key === "k" || (!/^[a-z]$/.test(key) && event.code === "KeyK");
}
