import type {
  AdBlockerDetectionResult,
  AdBlockerDetectorOptions,
} from "./types";

const DEFAULT_BAIT_URL =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
const DEFAULT_TIMEOUT_MS = 3500;

/**
 * Checks whether the browser is definitely offline according to navigator.
 */
export function isBrowserOffline(): boolean {
  if (typeof navigator === "undefined") {
    return false;
  }
  return navigator.onLine === false;
}

/**
 * Probes whether the DOM is actively applying cosmetic ad filtering rules.
 * Ad blockers typically inject CSS rules that hide elements matching
 * standard ad banner classes (e.g., display: none !important).
 */
export function testDomCosmeticFiltering(): boolean {
  if (typeof document === "undefined" || !document.body) {
    return false;
  }

  const bait = document.createElement("div");
  // Comprehensive set of standard ad-blocking target classes and attributes
  bait.className =
    "adsbox ad-banner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links banner-ad";
  bait.setAttribute("aria-hidden", "true");
  bait.setAttribute("data-ad-client", "ca-pub-0000000000000000");

  bait.style.setProperty("position", "absolute", "important");
  bait.style.setProperty("top", "-9999px", "important");
  bait.style.setProperty("left", "-9999px", "important");
  bait.style.setProperty("width", "1px", "important");
  bait.style.setProperty("height", "1px", "important");
  bait.style.setProperty("pointer-events", "none", "important");

  try {
    document.body.appendChild(bait);

    const style = window.getComputedStyle(bait);
    const isHidden =
      style.display === "none" ||
      style.visibility === "hidden" ||
      bait.offsetParent === null ||
      bait.offsetHeight === 0 ||
      bait.offsetWidth === 0 ||
      bait.clientHeight === 0 ||
      bait.clientWidth === 0;

    return isHidden;
  } catch {
    return false;
  } finally {
    if (bait.parentNode) {
      bait.parentNode.removeChild(bait);
    }
  }
}

/**
 * Probes general network reachability using a non-ad request.
 * Resolves to true if general network is operational, false if network is down.
 */
async function probeGeneralConnectivity(
  customUrl?: string,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<boolean> {
  if (isBrowserOffline()) {
    return false;
  }

  const probeUrl =
    customUrl ||
    (typeof window !== "undefined"
      ? `${window.location.origin}/favicon.ico`
      : "");

  if (!probeUrl) {
    return true;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Mode no-cors avoids CORS errors on non-same-origin or static assets
    await fetch(probeUrl, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
      signal: controller.signal,
    });
    return true;
  } catch {
    // If the probe URL threw an error, check if navigator reports online
    return typeof navigator !== "undefined" ? navigator.onLine : false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Probes an ad script endpoint to verify if the browser/client is blocking ad requests.
 */
async function probeAdEndpoint(
  baitUrl: string,
  timeoutMs: number,
): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    await fetch(baitUrl, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
      signal: controller.signal,
    });
    // Request succeeded or was handled by browser without client-side block
    return true;
  } catch {
    // Request failed or was blocked by browser client
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Performs a comprehensive, multi-vector ad blocker detection check.
 *
 * Rules:
 * 1. Never flags an ad blocker when the client is offline or general network fails.
 * 2. Combines DOM cosmetic filter detection with network bait probe.
 * 3. Safe in SSR and hydration environments.
 */
export async function detectAdBlocker(
  options: AdBlockerDetectorOptions = {},
): Promise<AdBlockerDetectionResult> {
  const now = Date.now();

  // SSR or non-browser environment
  if (typeof window === "undefined" || typeof document === "undefined") {
    return {
      isBlocked: false,
      isOffline: false,
      reason: "none",
      timestamp: now,
    };
  }

  // 1. First check offline status: offline cannot be assumed to be an ad blocker
  if (isBrowserOffline()) {
    return {
      isBlocked: false,
      isOffline: true,
      reason: "none",
      timestamp: now,
    };
  }

  // 2. Vector A: DOM cosmetic filtering test
  const isDomFiltered = testDomCosmeticFiltering();
  if (isDomFiltered) {
    return {
      isBlocked: true,
      isOffline: false,
      reason: "dom_probe_hidden",
      timestamp: now,
    };
  }

  // 3. Vector B: Network request bait probe
  const baitUrl = options.baitUrl || DEFAULT_BAIT_URL;
  const timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;

  const adProbeSucceeded = await probeAdEndpoint(baitUrl, timeoutMs);

  if (adProbeSucceeded) {
    // Ad network request went through smoothly
    return {
      isBlocked: false,
      isOffline: false,
      reason: "none",
      timestamp: now,
    };
  }

  // The ad probe failed. Verify if it is an ad blocker or general connection loss.
  const isOnline = await probeGeneralConnectivity(
    options.connectivityTestUrl,
    timeoutMs,
  );

  if (!isOnline) {
    // Network as a whole is down or unreachable
    return {
      isBlocked: false,
      isOffline: true,
      reason: "none",
      timestamp: now,
    };
  }

  // General connection is healthy, but the ad request was blocked
  return {
    isBlocked: true,
    isOffline: false,
    reason: "network_probe_blocked",
    timestamp: now,
  };
}
