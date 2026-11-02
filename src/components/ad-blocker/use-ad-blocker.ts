import { useCallback, useEffect, useRef, useState } from "react";
import { detectAdBlocker, isBrowserOffline } from "./ad-blocker-detector";
import type {
  AdBlockerDetectionReason,
  AdBlockerDetectionResult,
  AdBlockerDetectorOptions,
  AdBlockerState,
  AdBlockerStorageType,
  UseAdBlockerOptions,
} from "./types";

const DEFAULT_STORAGE_KEY = "nitx_adblocker_dismissed";
/** Pause before the confirmation pass that a positive result must survive. */
const DEFAULT_CONFIRM_DELAY_MS = 1500;
/** Background recheck cadence while the notice is showing. */
const DEFAULT_RECHECK_INTERVAL_MS = 15000;

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * One detection at a time per option set. Several notices on a page (or a
 * StrictMode double mount) share a single run instead of firing their own
 * bait requests.
 */
const inflight = new Map<string, Promise<AdBlockerDetectionResult>>();

function detectShared(
  options: AdBlockerDetectorOptions
): Promise<AdBlockerDetectionResult> {
  const key = JSON.stringify(options);
  const existing = inflight.get(key);
  if (existing) return existing;

  const run = detectAdBlocker(options).finally(() => {
    inflight.delete(key);
  });
  inflight.set(key, run);
  return run;
}

function getStorageItem(
  type: AdBlockerStorageType,
  key: string
): string | null {
  if (typeof window === "undefined" || type === "memory") {
    return null;
  }
  try {
    const storage =
      type === "local" ? window.localStorage : window.sessionStorage;
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function setStorageItem(
  type: AdBlockerStorageType,
  key: string,
  value: string
): void {
  if (typeof window === "undefined" || type === "memory") {
    return;
  }
  try {
    const storage =
      type === "local" ? window.localStorage : window.sessionStorage;
    storage.setItem(key, value);
  } catch {
    // Ignore storage quota or access errors (e.g., incognito restrictions)
  }
}

function removeStorageItem(type: AdBlockerStorageType, key: string): void {
  if (typeof window === "undefined" || type === "memory") {
    return;
  }
  try {
    const storage =
      type === "local" ? window.localStorage : window.sessionStorage;
    storage.removeItem(key);
  } catch {
    // Ignore storage errors
  }
}

export function useAdBlocker(
  options: UseAdBlockerOptions = {}
): AdBlockerState {
  const {
    autoCheck = true,
    storageType = "session",
    storageKey = DEFAULT_STORAGE_KEY,
    timeoutMs,
    baitUrl,
    baitUrls,
    connectivityTestUrl,
    confirmDelayMs = DEFAULT_CONFIRM_DELAY_MS,
    recheckIntervalMs = DEFAULT_RECHECK_INTERVAL_MS,
    onDetected,
    onRecheck,
  } = options;

  const [isRawBlocked, setIsRawBlocked] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(() =>
    isBrowserOffline()
  );
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [reason, setReason] = useState<AdBlockerDetectionReason>("none");
  const [timestamp, setTimestamp] = useState<number>(() => Date.now());
  const [details, setDetails] =
    useState<AdBlockerDetectionResult["details"]>(undefined);

  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    return getStorageItem(storageType, storageKey) === "true";
  });

  const onDetectedRef = useRef(onDetected);
  onDetectedRef.current = onDetected;

  const onRecheckRef = useRef(onRecheck);
  onRecheckRef.current = onRecheck;

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Stable identity for the detector options so `check` only changes when
  // a value does, not when the caller passes a new array literal.
  const baitUrlsKey = baitUrls ? baitUrls.join("\n") : "";

  const check = useCallback(async (): Promise<AdBlockerDetectionResult> => {
    const detectorOptions: AdBlockerDetectorOptions = {
      timeoutMs,
      baitUrl,
      baitUrls: baitUrlsKey ? baitUrlsKey.split("\n") : undefined,
      connectivityTestUrl,
    };

    setIsChecking(true);
    try {
      let result = await detectShared(detectorOptions);

      // A positive must survive a second, independent pass. Blockers are
      // deterministic and pass twice; a transient network failure, the
      // cause of the false alarms this guards against, almost never does.
      if (result.isBlocked && confirmDelayMs > 0) {
        await delay(confirmDelayMs);
        if (!mountedRef.current) return result;
        const confirmation = await detectShared(detectorOptions);
        if (!confirmation.isBlocked) {
          result = confirmation;
        }
      }

      if (!mountedRef.current) return result;

      setIsRawBlocked(result.isBlocked);
      setIsOffline(result.isOffline);
      setReason(result.reason);
      setTimestamp(result.timestamp);
      setDetails(result.details);

      if (result.isBlocked) {
        onDetectedRef.current?.(result);
      }

      onRecheckRef.current?.(result);
      return result;
    } finally {
      if (mountedRef.current) setIsChecking(false);
    }
  }, [baitUrl, baitUrlsKey, confirmDelayMs, connectivityTestUrl, timeoutMs]);

  const dismiss = useCallback(() => {
    setIsDismissed(true);
    setStorageItem(storageType, storageKey, "true");
  }, [storageKey, storageType]);

  const resetDismissal = useCallback(() => {
    setIsDismissed(false);
    removeStorageItem(storageType, storageKey);
  }, [storageKey, storageType]);

  // Handle online/offline browser state transitions
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleOnline = () => {
      setIsOffline(false);
      // Re-evaluate when coming back online if previously blocked or offline
      void check();
    };

    const handleOffline = () => {
      setIsOffline(true);
      // Offline must not be treated as ad blocking
      setIsRawBlocked(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [check]);

  // Check on mount if autoCheck is enabled
  useEffect(() => {
    if (autoCheck) {
      void check();
    }
  }, [autoCheck, check]);

  // While the notice is up, keep looking for a way out: a recheck when the
  // tab regains focus (the user just toggled their extension) and a slow
  // background cadence. The moment a pass comes back clean the notice goes
  // away on its own, so nobody has to reload the page to get back in.
  useEffect(() => {
    if (!isRawBlocked || typeof window === "undefined") {
      return;
    }

    const recheckIfVisible = () => {
      if (document.visibilityState === "visible") {
        void check();
      }
    };

    window.addEventListener("focus", recheckIfVisible);
    document.addEventListener("visibilitychange", recheckIfVisible);

    const interval =
      recheckIntervalMs > 0
        ? window.setInterval(recheckIfVisible, recheckIntervalMs)
        : undefined;

    return () => {
      window.removeEventListener("focus", recheckIfVisible);
      document.removeEventListener("visibilitychange", recheckIfVisible);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [isRawBlocked, recheckIntervalMs, check]);

  const isBlocked = isRawBlocked && !isDismissed;

  return {
    isBlocked,
    isOffline,
    reason,
    timestamp,
    details,
    isChecking,
    isDismissed,
    check,
    dismiss,
    resetDismissal,
  };
}
