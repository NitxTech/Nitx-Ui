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

1. **Offline and Network Outage Guard**:
   - Detection first verifies `navigator.onLine`. If offline, blocking is **never** flagged.
   - If ad bait network requests fail, a neutral probe (request to current origin / neutral static asset) is performed.
   - If the neutral probe also fails, network connectivity is determined to be down (`isOffline: true`), preventing false-positive ad-blocker alerts.

2. **Dual-Vector Verification**:
   - **Vector A (DOM Cosmetic Filtering)**: Injects an isolated probe element with standard ad class identifiers (`adsbox`, `pub_300x250`, `ad-banner`). If CSS rules force `display: none !important` or collapse dimensions to 0, cosmetic filtering is active.
   - **Vector B (Network Bait Probe)**: Probes standard ad network script endpoints (`pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`).

3. **Non-Intrusive Behavior**:
   - Single probe on mount.
   - No periodic polling intervals or background CPU consumption.
   - Persists user dismissal in `sessionStorage` (default) or `localStorage` to avoid repeatedly disrupting user workflows across navigation.
   - Core product features remain completely operable.

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
