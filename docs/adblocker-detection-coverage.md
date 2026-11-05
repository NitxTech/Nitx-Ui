# Shared Ad-Blocker Detection and Notice Coverage Matrix

## Overview
Nitx products interact with ad serving tags, analytics, tracking pixels, and publisher scripts. Ad blockers (such as uBlock Origin, AdBlock Plus, Brave Shields, Pi-hole, and browser tracking protection) can selectively block these scripts without breaking standard web navigation.

To provide a consistent, non-intrusive user experience across all Nitx web applications, `nitxui` provides:
1. `useAdBlocker`: A headless React hook for detection, state management, and dismissal.
2. `detectAdBlocker`: A pure utility for one-off programmatic detection.
3. `AdBlockerNotice`: A responsive, localized notice component supporting `banner`, `card`, and `dialog` variants.
4. `AdBlockerInstructions`: Tabbed instructions for popular browser extensions.

---

## Consumer Product Coverage Matrix

| Product | Primary Area Impacted | Suggested Variant | Placement | Default Affected Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Nitx Publisher Dashboard** (`nitx-publisher-dash`) | Ad units, header bidding tags, impression counting, inventory monetization | `banner` (or `card` on ad unit configuration pages) | Root dashboard layout or Ad Units page | Ad serving, creative previews, inventory testing, and publisher tag verification |
| **Nitx Ads Dashboard** (`nitx-ads-dash`) | Creative previews, campaign telemetry, conversion tracking | `banner` (inline warning) | Topbar / Header alert or Creative Builder | Campaign creative previews, conversion telemetry, and impression tracking |
| **Nitx Studio** (`nitx-studio-dash`) | Interactive creative canvas, live tag testing, player simulation | `card` / alert in preview sidebar | Creative preview panel or Canvas top bar | Creative interactive playback, asset telemetry, and ad unit simulation |
| **Nitx Account & Space Dashboard** (`my-nitx-dash`) | Billing/checkout third-party scripts, analytics | `banner` | Root `SidebarLayout` or Subscriptions tab | Analytics and third-party payment gateways |
| **Nitx Digital Signage** (`nitx-signage-dash`) | Screen telemetry, ad loop preview | `banner` (dismissable) | Dashboard top bar | Remote player telemetry and sponsored channel loop previews |
| **Nitx Screen** (`nitx-screen`) | Offline beacons (`sendBeacon` vs `fetch`) | Programmatic `detectAdBlocker` | Offline synchronization handler | Player beacon delivery and telemetry fallbacks |

---

## Detection Mechanism & False-Positive Prevention

The verdict is `isBlocked: true` only when nothing but a blocker explains the evidence. Every probe outcome is returned in `result.details` so a consumer can log why a verdict was reached.

1. **Offline and Network Outage Guard**:
   - Detection first verifies `navigator.onLine`. If offline, blocking is **never** flagged.
   - When every ad bait request is refused, a neutral probe (current origin's favicon) runs. If it fails too, the network is down (`isOffline: true`); if it times out, the result is `inconclusive`.

2. **Network Bait Probe (Vector B)**:
   - Two independent ad endpoints are probed (`pagead2.googlesyndication.com/.../adsbygoogle.js` and `securepubads.g.doubleclick.net/tag/js/gpt.js`). **Both** must be refused; one reachable endpoint clears the check.
   - Each probe is classified, not just pass/fail:
     - `blocked`: rejected immediately, the way an extension, Brave Shields, tracking protection or a DNS sinkhole behaves.
     - `timeout`: no answer within `timeoutMs` (4s). A slow network, never a blocker. This was the main false positive in the field: a cold DNS and TLS handshake to the ad host on a slow connection outran the old 3.5s budget while the same-origin probe answered instantly, and a refresh "fixed" it because the handshake was then cached.
     - `csp`: the page's own Content Security Policy refused the request (detected through the `securitypolicyviolation` event). An app with a `connect-src` policy that omits the ad hosts can never be told apart from a blocker by a network probe, so it is `inconclusive`.
   - **Refused ad hosts alone never produce a verdict.** Browser tracking protection refuses the very same hosts with no ad blocker installed: Safari's Advanced Tracking and Fingerprinting Protection on iOS (on by default in Private Browsing, optional everywhere, and reported as network-level blocking by default in Safari 27), Firefox ETP Strict, Edge Strict. Before this rule every iPhone user was shown the full-page notice while Android passed, because both Google ad hosts are on the tracker lists those browsers use. A network-only result is confirmed by one of two signals tracking protection cannot produce: the cosmetic DOM probe collapsing the bait (Vector A), or the browser identifying itself as Brave through `navigator.brave.isBrave()`, whose Shields refuse ad hosts without necessarily hiding a first-party bait in Standard mode. Without confirmation the result is `inconclusive` and `details.network` still shows the refusals for logging.
   - Known cost: a DNS-level blocker (Pi-hole, AdGuard DNS) on a browser other than Brave is now `inconclusive` instead of `network_probe_blocked`. That is the same evidence a privacy setting produces, and a false lockout is far more expensive than a missed notice.

3. **DOM Cosmetic Filtering (Vector A)**:
   - A bait element carrying the standard EasyList classes (`adsbox`, `pub_300x250`, `ad-banner`, ...) is inserted next to a control element identical in every way except the classes. The test is positive only when the bait collapses and the control does not, which rules out ancestor-level causes.
   - Both elements are 10x10px; the old 1x1px bait could be rounded to zero at fractional browser zoom.
   - A DOM hit counts only while no ad endpoint was reachable. If ad requests go through, ad scripts will load regardless of cosmetic rules.

4. **Confirmation and Self-Recovery (`useAdBlocker`)**:
   - A positive result is re-run after `confirmDelayMs` (1.5s) and reported only if it holds both times. Blockers are deterministic; transient network failures are not.
   - While blocked, detection re-runs whenever the tab regains focus and every `recheckIntervalMs` (15s). The notice clears on its own once a pass comes back clean, so a user who allowlists the site, or who was flagged by a blip, never has to reload.
   - No polling while not blocked. Concurrent hooks on one page share a single detection run.
   - Persists user dismissal in `sessionStorage` (default) or `localStorage` to avoid repeatedly disrupting user workflows across navigation.
   - Core product features remain completely operable.

### Verified scenarios

Run against the real detector in headless Chrome with `fetch` stubbed per scenario:

| Scenario | Verdict |
| :--- | :--- |
| No blocker, live network | not blocked (`none`) |
| Extension blocking both endpoints with cosmetic rules (uBlock Origin, AdBlock Plus, AdGuard, Safari content blockers) | blocked (`network_probe_blocked`) |
| Brave Shields: both endpoints refused, bait not collapsed, `navigator.brave` present | blocked (`network_probe_blocked`, `details.braveShields: true`) |
| Tracking protection only (iOS Safari ATP, Firefox/Edge strict): both endpoints refused, no cosmetic rules, not Brave | not blocked (`inconclusive`) |
| Cosmetic rules only, ad requests hang | blocked (`dom_probe_hidden`) |
| Ad hosts slow, origin fast | not blocked (`inconclusive`) |
| One endpoint fails, the other answers | not blocked (`none`) |
| Every host fails | not blocked, `isOffline: true` |
| Ancestor hides bait and control | not blocked (`inconclusive`) |
| Page with `connect-src 'self'` CSP | not blocked (`inconclusive`, probes report `csp`) |
| Hook: first run fails, confirmation passes | never shows the notice |
| Hook: real blocker, then switched off | notice shows, then clears on the next recheck |

---

## Usage Examples

### 1. Global Banner Notice in Next.js Layout
```tsx
import { AdBlockerNotice } from "nitxui";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdBlockerNotice variant="banner" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

### 2. Tailored Card Notice for Publisher Ad Unit Setup
```tsx
import { AdBlockerNotice } from "nitxui";

export function AdUnitsPage() {
  return (
    <div className="space-y-6">
      <AdBlockerNotice
        variant="card"
        title="Publisher ad serving is blocked"
        description="Your browser extension is preventing live ad tags and inventory auctions from executing."
        affectedFeatures={[
          "Live header bidding auctions",
          "Real-time revenue attribution",
          "Publisher inventory preview"
        ]}
      />
      {/* Rest of the page */}
    </div>
  );
}
```

### 3. Headless Usage with `useAdBlocker` Hook
```tsx
import { useAdBlocker } from "nitxui";

export function CustomAdMonitor() {
  const { isBlocked, isChecking, check, dismiss } = useAdBlocker();

  if (!isBlocked) return null;

  return (
    <div className="alert-custom">
      <p>Ad blocker is active.</p>
      <button onClick={() => check()} disabled={isChecking}>
        {isChecking ? "Checking..." : "Recheck"}
      </button>
      <button onClick={dismiss}>Dismiss</button>
    </div>
  );
}
```

---

## Design System & Internationalization Compliance

- **Visuals**: Adheres to the Nitx UI design system with squircle corner styling (`corner-squircle`), subtle amber border/background tints, and full dark/light theme support.
- **RTL & Arabic Support**: Fully localized with keys in `src/messages/ar/nitxuilib.json` and `src/messages/en/nitxuilib.json`. Bidirectional layout aligns naturally in both LTR and RTL.
- **Typography Standards**: Strict adherence to the Nitx UI copy standard (no em or en dashes in any rendered text).
