import type {
  AdBlockerDetectionResult,
  AdBlockerDetectorOptions,
  AdBlockerProbeOutcome,
} from "./types";

/**
 * Two independent ad networks. A blocker list that catches one catches
 * both, so a verdict of "blocked" needs both to fail, which a single
 * flaky endpoint or CDN hiccup cannot produce.
 */
const DEFAULT_BAIT_URLS = [
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
  "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
];
const DEFAULT_TIMEOUT_MS = 4000;

/**
 * How long to wait for a `securitypolicyviolation` event after a fetch
 * rejects. The event is queued as its own task, so it can land just after
 * the rejection.
 */
const CSP_EVENT_GRACE_MS = 40;

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
}

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
 *
 * Ad blockers inject stylesheets that hide elements carrying the standard
 * EasyList bait classes. A bait and a control element are inserted side by
 * side: the test is positive only when the bait is collapsed while the
 * control, which differs solely by class names, is not. That rules out
 * every ancestor-level cause (a hidden body, a transition, a print
 * stylesheet) that used to read as a blocker.
 *
 * The elements are 10x10px rather than 1x1px, so fractional browser zoom
 * cannot round a visible box down to zero.
 */
export function testDomCosmeticFiltering(): boolean {
  if (typeof document === "undefined" || !document.body) {
    return false;
  }

  const makeProbe = (className: string) => {
    const el = document.createElement("div");
    el.className = className;
    el.setAttribute("aria-hidden", "true");
    el.style.setProperty("position", "absolute", "important");
    el.style.setProperty("top", "-9999px", "important");
    el.style.setProperty("left", "-9999px", "important");
    el.style.setProperty("width", "10px", "important");
    el.style.setProperty("height", "10px", "important");
    el.style.setProperty("pointer-events", "none", "important");
    // Give it a box of its own so an empty element is still measurable.
    el.textContent = " ";
    return el;
  };

  const bait = makeProbe(
    "adsbox ad-banner pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links banner-ad"
  );
  bait.setAttribute("data-ad-client", "ca-pub-0000000000000000");
  const control = makeProbe("nitx-adblock-control");

  try {
    document.body.appendChild(control);
    document.body.appendChild(bait);

    const collapsed = (el: HTMLElement) => {
      const style = window.getComputedStyle(el);
      return (
        style.display === "none" ||
        style.visibility === "hidden" ||
        el.offsetHeight === 0 ||
        el.offsetWidth === 0
      );
    };

    return collapsed(bait) && !collapsed(control);
  } catch {
    return false;
  } finally {
    bait.parentNode?.removeChild(bait);
    control.parentNode?.removeChild(control);
  }
}

/**
 * Fetches a URL and classifies why it failed, if it failed.
 *
 * - `reachable`: the request completed (an opaque no-cors response counts).
 * - `blocked`: rejected straight away, as an extension, Brave Shields, a
 *   DNS sinkhole or tracking protection does.
 * - `timeout`: no answer inside the budget. A slow network, never a blocker:
 *   blockers reject in milliseconds.
 * - `csp`: the page's own Content Security Policy refused the request. The
 *   probe cannot say anything about ad blocking on such a page.
 */
async function probeUrl(
  url: string,
  timeoutMs: number
): Promise<AdBlockerProbeOutcome> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const host = hostOf(url);
  let cspViolation = false;

  const onViolation = (event: Event) => {
    const violation = event as SecurityPolicyViolationEvent;
    const blocked = violation.blockedURI || "";
    if (!blocked || (host && blocked.includes(host))) {
      cspViolation = true;
    }
  };
  document.addEventListener("securitypolicyviolation", onViolation);

  try {
    await fetch(url, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      signal: controller.signal,
    });
    return "reachable";
  } catch {
    if (controller.signal.aborted) {
      return "timeout";
    }
    await delay(CSP_EVENT_GRACE_MS);
    return cspViolation ? "csp" : "blocked";
  } finally {
    clearTimeout(timer);
    document.removeEventListener("securitypolicyviolation", onViolation);
  }
}

/**
 * Probes general network reachability using a non-ad request.
 * Resolves `reachable` when the network is up, `timeout` when it is too slow
 * to tell, and `blocked` when the request failed outright.
 */
async function probeGeneralConnectivity(
  customUrl?: string,
  timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<AdBlockerProbeOutcome> {
  if (isBrowserOffline()) {
    return "blocked";
  }

  const probeUrlValue =
    customUrl ||
    (typeof window !== "undefined"
      ? `${window.location.origin}/favicon.ico`
      : "");

  if (!probeUrlValue) {
    return "reachable";
  }

  const outcome = await probeUrl(probeUrlValue, timeoutMs);
  // A same-origin probe refused by CSP would be a misconfigured page; treat
  // it as reachable so it never masquerades as an outage.
  return outcome === "csp" ? "reachable" : outcome;
}

function result(
  partial: Pick<AdBlockerDetectionResult, "isBlocked" | "isOffline" | "reason">,
  details?: AdBlockerDetectionResult["details"]
): AdBlockerDetectionResult {
  return { ...partial, timestamp: Date.now(), details };
}

/**
 * Brave ships Shields on by default and exposes itself through
 * `navigator.brave.isBrave()`. Shields refuses ad hosts at the network level
 * without necessarily collapsing a first-party bait element (Standard mode
 * only hides elements that carry third-party content), so the browser's own
 * signal stands in for the cosmetic probe there.
 */
async function isBraveBrowser(): Promise<boolean> {
  if (typeof navigator === "undefined") return false;
  const brave = (navigator as Navigator & {
    brave?: { isBrave?: () => Promise<boolean> };
  }).brave;
  if (!brave || typeof brave.isBrave !== "function") return false;
  try {
    return (await brave.isBrave()) === true;
  } catch {
    return false;
  }
}

/**
 * Performs a multi-vector ad blocker detection check.
 *
 * The verdict is `isBlocked: true` only when the evidence cannot be
 * explained by anything other than a blocker:
 *
 * 1. Offline, or a general connectivity probe that fails, is never a blocker.
 * 2. Every bait endpoint must be rejected outright. One reachable endpoint
 *    clears the check; a timeout or a CSP refusal makes it inconclusive.
 * 3. Refused ad hosts alone are not enough. Browser tracking protection
 *    (Safari's Advanced Tracking Protection on iOS, Firefox and Edge strict
 *    modes) refuses the same hosts with no ad blocker installed, and that
 *    used to lock every iPhone out of the dashboards. The network vector is
 *    confirmed only by a signal tracking protection cannot produce: a
 *    cosmetic-filter hit on the DOM bait, or the browser being Brave (whose
 *    Shields are the blocker). Otherwise the result is `inconclusive`.
 * 4. A cosmetic-filter hit on the DOM bait counts only while no ad endpoint
 *    was reachable, since a reachable network means ad scripts will load.
 *
 * Safe in SSR and hydration environments.
 */
export async function detectAdBlocker(
  options: AdBlockerDetectorOptions = {}
): Promise<AdBlockerDetectionResult> {
  // SSR or non-browser environment
  if (typeof window === "undefined" || typeof document === "undefined") {
    return result({ isBlocked: false, isOffline: false, reason: "none" });
  }

  // 1. Offline cannot be assumed to be an ad blocker.
  if (isBrowserOffline()) {
    return result({ isBlocked: false, isOffline: true, reason: "none" });
  }

  const timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;
  const baitUrls =
    options.baitUrls && options.baitUrls.length > 0
      ? options.baitUrls
      : options.baitUrl
        ? [options.baitUrl]
        : DEFAULT_BAIT_URLS;

  // 2. Both vectors run together; the DOM probe is synchronous.
  const domHidden = testDomCosmeticFiltering();
  const [network, braveShields] = await Promise.all([
    Promise.all(baitUrls.map((url) => probeUrl(url, timeoutMs))),
    isBraveBrowser(),
  ]);
  const details = { domHidden, network, braveShields };

  const anyReachable = network.some((o) => o === "reachable");
  const allBlocked =
    network.length > 0 && network.every((o) => o === "blocked");

  if (anyReachable) {
    // Ad network requests go through, so ad scripts will load.
    return result({ isBlocked: false, isOffline: false, reason: "none" }, details);
  }

  if (allBlocked) {
    // Every ad endpoint was refused outright. Make sure the network itself
    // is up before calling it a blocker.
    const connectivity = await probeGeneralConnectivity(
      options.connectivityTestUrl,
      timeoutMs
    );

    if (connectivity === "blocked") {
      return result({ isBlocked: false, isOffline: true, reason: "none" }, details);
    }
    if (connectivity === "timeout") {
      return result(
        { isBlocked: false, isOffline: false, reason: "inconclusive" },
        details
      );
    }
    // Refused ad hosts on a working network. Call it a blocker only with a
    // signal that host-based tracking protection cannot produce; otherwise
    // this is indistinguishable from Safari/Firefox/Edge privacy settings
    // (or a DNS sinkhole) and must stay inconclusive.
    if (domHidden || braveShields) {
      return result(
        { isBlocked: true, isOffline: false, reason: "network_probe_blocked" },
        details
      );
    }
    return result(
      { isBlocked: false, isOffline: false, reason: "inconclusive" },
      details
    );
  }

  // Timeouts or CSP refusals: the network vector cannot decide. Cosmetic
  // filtering is deterministic and independent of the network, so a DOM hit
  // on its own still identifies a blocker.
  if (domHidden) {
    return result(
      { isBlocked: true, isOffline: false, reason: "dom_probe_hidden" },
      details
    );
  }

  return result(
    { isBlocked: false, isOffline: false, reason: "inconclusive" },
    details
  );
}
