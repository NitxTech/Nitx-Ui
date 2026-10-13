import type { ReactNode } from "react";

export type AdBlockerStorageType = "session" | "local" | "memory";

export type AdBlockerDetectionReason =
  | "network_probe_blocked"
  | "dom_probe_hidden"
  | "script_blocked"
  | "none";

export interface AdBlockerDetectionResult {
  /** True if ad blocking was actively detected */
  isBlocked: boolean;
  /** True if the browser or device appears offline */
  isOffline: boolean;
  /** The specific vector that triggered detection */
  reason: AdBlockerDetectionReason;
  /** Timestamp of detection */
  timestamp: number;
}

export interface AdBlockerDetectorOptions {
  /**
   * Probe timeout in milliseconds (default: 4000ms).
   */
  timeoutMs?: number;
  /**
   * Custom bait URL to test network blocking against.
   * Defaults to standard Google Ads script endpoint.
   */
  baitUrl?: string;
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
