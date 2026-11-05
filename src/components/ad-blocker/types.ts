import type { ReactNode } from "react";

export type AdBlockerStorageType = "session" | "local" | "memory";

export type AdBlockerDetectionReason =
  | "network_probe_blocked"
  | "dom_probe_hidden"
  | "script_blocked"
  /**
   * The probes could not decide: the network was too slow to answer inside
   * the timeout, the page's Content Security Policy refused the bait
   * requests, or the ad hosts were refused without a cosmetic-filter hit
   * (browser tracking protection such as Safari's on iOS looks exactly like
   * that). Never treated as a blocker.
   */
  | "inconclusive"
  | "none";

/** What happened to one probe request. */
export type AdBlockerProbeOutcome = "reachable" | "blocked" | "timeout" | "csp";

export interface AdBlockerDetectionResult {
  /** True if ad blocking was actively detected */
  isBlocked: boolean;
  /** True if the browser or device appears offline */
  isOffline: boolean;
  /** The specific vector that triggered detection */
  reason: AdBlockerDetectionReason;
  /** Timestamp of detection */
  timestamp: number;
  /** Raw probe outcomes, for logging why a verdict was reached. */
  details?: {
    /** The DOM bait was collapsed by a cosmetic filter. */
    domHidden: boolean;
    /** One outcome per bait URL, in the order they were probed. */
    network: AdBlockerProbeOutcome[];
    /**
     * The browser identified itself as Brave, whose built-in Shields refuse
     * ad hosts. Accepted as confirmation of a network-only result.
     */
    braveShields?: boolean;
  };
}

export interface AdBlockerDetectorOptions {
  /**
   * Probe timeout in milliseconds (default: 4000ms). A probe that runs out
   * of time is inconclusive, never a blocker.
   */
  timeoutMs?: number;
  /**
   * Custom bait URL to test network blocking against.
   * Defaults to standard Google Ads script endpoint.
   */
  baitUrl?: string;
  /**
   * Several bait URLs; every one must be refused for a "blocked" verdict.
   * Overrides `baitUrl`. Defaults to two Google ad script endpoints.
   */
  baitUrls?: string[];
  /**
   * Optional custom connectivity test URL.
   */
  connectivityTestUrl?: string;
}

export interface UseAdBlockerOptions extends AdBlockerDetectorOptions {
  /**
   * Whether to check automatically on mount (default: true).
   */
  autoCheck?: boolean;
  /**
   * Storage type used to persist user dismissal (default: "session").
   */
  storageType?: AdBlockerStorageType;
  /**
   * Key used for dismissal storage (default: "nitx_adblocker_dismissed").
   */
  storageKey?: string;
  /**
   * A positive result is re-run after this pause and only reported when it
   * holds both times (default: 1500ms). 0 reports the first result as is.
   */
  confirmDelayMs?: number;
  /**
   * While blocked, re-run detection on this cadence and whenever the tab
   * regains focus, so the notice clears itself once the blocker is off
   * (default: 15000ms). 0 disables the background cadence.
   */
  recheckIntervalMs?: number;
  /**
   * Callback fired when an ad blocker is detected.
   */
  onDetected?: (result: AdBlockerDetectionResult) => void;
  /**
   * Callback fired after manual or automatic recheck.
   */
  onRecheck?: (result: AdBlockerDetectionResult) => void;
}

export interface AdBlockerState extends AdBlockerDetectionResult {
  /** True if checking is in progress */
  isChecking: boolean;
  /** True if user has dismissed the notice */
  isDismissed: boolean;
  /** Trigger a fresh detection check */
  check: () => Promise<AdBlockerDetectionResult>;
  /** Dismiss the notice */
  dismiss: () => void;
  /** Reset dismissal status */
  resetDismissal: () => void;
}

export interface AdBlockerPageProps {
  /** Custom heading (defaults to "Ad blocker detected") */
  title?: string;
  /** Custom allow URL (defaults to "https://nitx.io") */
  allowUrl?: string;
  /** Custom target service name (defaults to "the AppLovin Ads dashboard") */
  serviceName?: string;
  /** Full custom description override if needed */
  description?: string;
  /** Whether to show a subtle recheck button below the description (default: false) */
  showRecheckButton?: boolean;
  /** Additional container class name */
  className?: string;
  /** Fired when recheck is triggered */
  onRecheck?: () => void;
}

export interface AdBlockerNoticeProps {
  /**
   * Visual presentation style.
   * - "page": Full-screen design page with centered badge and watermark (default design)
   * - "banner": Top or inline slim alert banner
   * - "card": Boxed widget with squircle corners
   * - "dialog": Modal dialog overlay
   * Defaults to "page".
   */
  variant?: "page" | "banner" | "card" | "dialog";
  /** Custom heading */
  title?: string;
  /** Custom description */
  description?: string;
  /** Custom allow URL for page variant (defaults to "https://nitx.io") */
  allowUrl?: string;
  /** Custom target service name for page variant (defaults to "the AppLovin Ads dashboard") */
  serviceName?: string;
  /**
   * List of product-specific capabilities impacted by blocking.
   * If omitted, uses localized default capabilities.
   */
  affectedFeatures?: string[];
  /** Custom instructions content or component */
  customInstructions?: ReactNode;
  /** Whether to display the recheck button (default: true for banner/card/dialog, false for page) */
  showRecheckButton?: boolean;
  /** Whether to display the dismiss button (default: true for banner/card/dialog, false for page) */
  showDismissButton?: boolean;
  /** Whether to show expandable allowlist guide (default: true for banner/card/dialog) */
  showInstructions?: boolean;
  /** Storage type used for dismissal (default: "session") */
  storageType?: AdBlockerStorageType;
  /** Storage key for dismissal (default: "nitx_adblocker_dismissed") */
  storageKey?: string;
  /** Force display notice for testing or storybook regardless of detection */
  forceShow?: boolean;
  /** Additional class names */
  className?: string;
  /** Fired when dismissed */
  onDismiss?: () => void;
  /** Fired after recheck */
  onRecheck?: (result: AdBlockerDetectionResult) => void;
}
