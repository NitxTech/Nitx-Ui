import { useCallback, useEffect, useRef, useState } from "react";
import { detectAdBlocker, isBrowserOffline } from "./ad-blocker-detector";
import type {
  AdBlockerDetectionReason,
  AdBlockerDetectionResult,
  AdBlockerState,
  AdBlockerStorageType,
  UseAdBlockerOptions,
} from "./types";

const DEFAULT_STORAGE_KEY = "nitx_adblocker_dismissed";

function getStorageItem(
  type: AdBlockerStorageType,
  key: string,
): string | null {
  if (typeof window === "undefined" || type === "memory") {
    return null;
  }
  try {
    const storage = type === "local" ? window.localStorage : window.sessionStorage;
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function setStorageItem(
  type: AdBlockerStorageType,
  key: string,
  value: string,
): void {
  if (typeof window === "undefined" || type === "memory") {
    return;
  }
  try {
    const storage = type === "local" ? window.localStorage : window.sessionStorage;
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
    const storage = type === "local" ? window.localStorage : window.sessionStorage;
    storage.removeItem(key);
  } catch {
    // Ignore storage errors
  }
}

export function useAdBlocker(options: UseAdBlockerOptions = {}): AdBlockerState {
  const {
    autoCheck = true,
    storageType = "session",
    storageKey = DEFAULT_STORAGE_KEY,
    timeoutMs,
    baitUrl,
    connectivityTestUrl,
    onDetected,
    onRecheck,
  } = options;

  const [isRawBlocked, setIsRawBlocked] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(() => isBrowserOffline());
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [reason, setReason] = useState<AdBlockerDetectionReason>("none");
  const [timestamp, setTimestamp] = useState<number>(() => Date.now());

  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    return getStorageItem(storageType, storageKey) === "true";
  });

  const onDetectedRef = useRef(onDetected);
  onDetectedRef.current = onDetected;

  const onRecheckRef = useRef(onRecheck);
  onRecheckRef.current = onRecheck;

  const check = useCallback(async (): Promise<AdBlockerDetectionResult> => {
    setIsChecking(true);
    try {
      const result = await detectAdBlocker({
        timeoutMs,
        baitUrl,
        connectivityTestUrl,
      });

      setIsRawBlocked(result.isBlocked);
      setIsOffline(result.isOffline);
      setReason(result.reason);
      setTimestamp(result.timestamp);

      if (result.isBlocked) {
        onDetectedRef.current?.(result);
      }

      onRecheckRef.current?.(result);
      return result;
    } finally {
      setIsChecking(false);
    }
  }, [baitUrl, connectivityTestUrl, timeoutMs]);

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

  const isBlocked = isRawBlocked && !isDismissed;

  return {
    isBlocked,
    isOffline,
    reason,
    timestamp,
    isChecking,
    isDismissed,
    check,
    dismiss,
    resetDismissal,
  };
}
