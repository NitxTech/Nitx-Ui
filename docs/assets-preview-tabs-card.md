# Assets: document preview, shared tab bar, floating bar, card ellipsis

One change set in the assets module, covering four tickets that all land in
the same files: the missing PDF preview, the tab bar every dashboard had
copied, the bottom-anchored selection toolbar, and the options ellipsis on the
asset card. This covers the reference, the direction, the change, the consumer
matrix and the evidence.

## What was wrong

**No document preview.** `AssetsPreview.renderMedia()` branched on `image`,
`video` and `link`. A `document` asset fell through to the shared
`notAvailable` string, so every PDF in every dashboard opened the overlay and
showed "Preview not available for this type". The card thumbnails already map
`application/pdf` to a PDF icon, so the type was known all along; only the
viewer was missing.

**Five diverging tab bars.** The Assets tab bar is the reference, and it lives
here. Every dashboard then grew its own copy of the same underline bar:

| file | lines | call sites |
| --- | ---: | ---: |
| `nitx-signage-dash/components/ui/custom-tabbar.tsx` | 351 | 2 |
| `nitx-ads-dash/components/custom-tabbar.tsx` | 61 | 4 |
| `nitx-reach-dash/components/ui/custom-tabbar.tsx` | 58 | 0 |
| `nitx-studio-dash/components/ui/custom-tabbar.tsx` | 58 | 0 |
| `nitx-publisher-dash/components/ui/custom-tabbar.tsx` | 14 | 0 |
| `Nitx-Ui/.../assets/components/CustomTabbar.tsx` | 70 | 1 |

Signage's copy carries the variants (pills, tone, size, badge, trailing
action) and renders the same tab markup three times. Ads' copy drifted far
enough that its call sites correct it from outside, through arbitrary
variants: `[&_button]:gap-[12px] [&_button]:text-body-md`, and in the
inventory browser `[&_button.border-black]:border-[#212121]`, because that
copy uses `border-black` for the active tab where the reference uses
`#212121`. Those overrides are the alignment defects the ticket describes.

None of the copies was a tab list: no `role`, no `aria-selected`, no arrow-key
movement, every tab its own tab stop.

**The ellipsis had no treatment of its own.** The trigger on `AssetCard` was
`className="icon"`, a utility this package has never shipped. Only two of the
five dashboards define `.icon` in their own `globals.css`:

| product | defines `.icon` | ellipsis before this change |
| --- | --- | --- |
| nitx-signage-dash | yes, `app/globals.css:289` | 32px square, hover to primary |
| nitx-reach-dash | yes, `app/globals.css:329` | same |
| nitx-ads-dash | no | bare 16px icon, no hit area, no hover, no focus ring |
| nitx-publisher-dash | no | same |
| nitx-studio-dash | no | same |

The button also had no accessible name: the label existed only in a tooltip,
which a screen reader does not read as the control's name.

The event handling named in that ticket was already fixed and shipped.
`data-nitxui-card-actions` and the `stopPropagation` guards on the actions
container, the trigger and the menu content are present in source and in the
published 2.1.3 bundle, from `464a0fe1`, `c96dfc12` and `7063af95`. Clicking
the ellipsis has not opened the asset since then. What remained was the
styling and the missing name.

**Preview arrows ignored the layout.** `AssetsBrowser`'s window key handler
mapped ArrowLeft to the previous asset and ArrowRight to the next in every
language, so in Arabic both arrows moved the wrong way.

## The direction

Restrained, and the Assets surfaces as they already read:

- The document viewer borrows the overlay's existing chrome. Controls are
  white on the black scrim, the same ghost treatment as the header's download
  and close buttons, and they sit below the page so they never cover its first
  lines. One page at a time with explicit paging, rather than a scrolling
  stack, because the overlay is a preview and not a reader.
- Every failure is a single panel with the same frame: an icon, one sentence,
  and the ways out. A document that cannot be opened always offers the file
  itself, through Open in new tab and Download.
- The shared tab bar keeps the Assets geometry to the pixel: the full-width
  strip with a hairline above and below, `px-4 sm:px-6`, `gap-4 sm:gap-6
  md:gap-8`, `pt-3 pb-3`, a 2px underline, `#212121` on white and white on
  dark. The variants the dashboards' copies use come along so their migration
  changes no behaviour.
- Logical properties throughout (`start`, `end`, `ms`, `rtl:rotate-180`), so
  Arabic mirrors with no extra rules.
- Existing tokens only: `zinc` and `gray` surfaces, `primary` for focus rings
  and active pills, the `rounded-[8px]` and `rounded-[14px]` radii already in
  the module.

## The change

`src/components/assets/components/DocumentPreview.tsx` (new) renders a PDF
with pdf.js: page controls, zoom from 50% to 300%, and four states. It loads
`react-pdf` on first use and keeps it for the session. `tsup` treats
`react-pdf` and `pdfjs-dist` as external, so the dynamic import survives into
`dist` and the host's bundler splits it: in Signage's production build the
assets route is 196 kB first load, with pdf.js in separate 337 kB and 388 kB
chunks that load only when a document is opened.

The worker defaults to the CDN copy matching the bundled pdf.js version. A
host that cannot reach it passes `documentPreview.workerSrc` to
`AssetsProvider` and points at its own file.

Text and annotation layers are off. Both need react-pdf's stylesheets, which
every consuming app would have to import for itself; the trade is no text
selection inside the preview, and the file itself is one click away.

`src/components/ui/tab-bar.tsx` (new) is `TabBar`, exported from the package
root, with `CustomTabbar` as an alias so a dashboard's migration is an import
change. It is a real tab list: `role="tablist"` and `role="tab"`,
`aria-selected`, a roving tab stop, arrow keys that follow the reading
direction, and Home and End. It never navigates; a tab that changes the route
calls the router from the host's `onTabChange`, which keeps the package free
of a router dependency. The assets `CustomTabbar` is now a thin adapter over
it, so the reference and the shared component cannot drift apart.

`src/components/ui/floating-bar.tsx` (new) is the anchoring `SelectionBar`
already had, lifted out so other toolbars can use it. It adds
`--nitx-side-inset` beside `--nitx-bottom-inset`: a logical inset for a
pinned sidebar, so the bar centres on the content rather than the window, and
flips with the layout.

`assetCardIconButtonClass` owns the ellipsis geometry, and is exported so a
host styling its own `renderAssetActions` buttons matches the ellipsis beside
them. The button gained its accessible name.

No public prop was removed. The one reduction is in the *copies*: `TabBar` has
no `url` prop and does not read the pathname. Nothing passes `url` in any
dashboard today, so no call site depends on it.

## Consumer coverage

Five products take the assets module from the package. `my-nitx-dash` (2.0.4)
and `nitx-pay` (1.5.3) install nitxui but render no assets browser;
`nitx-admin-dash`, `nitx-camera` and `nitx-screen` do not use the package.

| product | nitxui | PDF preview | ellipsis | tab bar to migrate | selection bar anchoring |
| --- | --- | --- | --- | --- | --- |
| nitx-signage-dash | 2.1.3 | fixed on upgrade | already styled, gains a name | `components/ui/custom-tabbar.tsx`, 351 lines, 2 call sites | sets `--nitx-bottom-inset`, correct |
| nitx-ads-dash | 2.1.3 | fixed on upgrade | **gains hit area, hover, focus ring** | `components/custom-tabbar.tsx`, 61 lines, 4 call sites, drops the `[&_button]` overrides | no bottom chrome, nothing to clear |
| nitx-publisher-dash | 2.1.3 | fixed on upgrade | **gains hit area, hover, focus ring** | `components/ui/custom-tabbar.tsx`, 14 lines, unused, delete | sets `--nitx-bottom-inset`, correct |
| nitx-reach-dash | 2.1.3 | fixed on upgrade | already styled, gains a name | `components/ui/custom-tabbar.tsx`, 58 lines, unused, delete | no bottom chrome, nothing to clear |
| nitx-studio-dash | 2.1.3 | fixed on upgrade | **gains hit area, hover, focus ring** | `components/ui/custom-tabbar.tsx`, 58 lines, unused, delete | sets `--nitx-bottom-inset`, correct |

One more change rides in the same version, from the sequence-duration
ticket: `AddContentModal`'s sequence card printed `total_duration` on its own,
so a 45 second sequence read as "45". It now uses the exported
`SequenceDuration`, which puts a clock immediately before the value and gives
screen readers the spelled-out phrase. Signage has the matching treatment on
its own sequence cards already; its local copy of the component should be
dropped for this one once this version is published.

Nothing in a consumer needs editing for the preview, the ellipsis or the
selection bar: no public prop changed and the defaults hold. The tab bar
migrations and the deletions are the only consumer edits, and they wait on a
published version.

### Still to do in the consumers

- **Signage content hub** has its own `components/ui/bulk-action-bar.tsx`,
  used by the five content-hub tabs and three old-content-hub lists. It is
  `fixed bottom-10 right-4 left-4 lg:left-72`: a hardcoded sidebar width, no
  `--nitx-bottom-inset`, so it sits under the mobile nav on a phone. It should
  render inside `FloatingBar` with `--nitx-side-inset` set to the sidebar
  width.
- **Ads item 13** is named in the toolbar ticket and is not identifiable from
  this repository. It needs whoever owns that list.
- **React versions differ**: Reach is on React 19.2.7 and Next 16, the other
  four on React 18.3.1. `react-pdf@11` requires React 19, so this pins
  `^10.1.0`, which supports 16.8 through 19. A later bump to 11 would strand
  four of the five.

## Evidence

Run on `Nitx-Ui@feat/assets-pdf-preview-shared-tabs` and
`nitx-signage-dash@fix/assets-sticky-header`, with the package installed into
Signage from a `pnpm pack` tarball so peer resolution matches a real install.

| check | result |
| --- | --- |
| `pnpm build` (Nitx-Ui) | passes; `dist/index.mjs` 592.32 KB, up 10 KB, so pdf.js is not inlined |
| `npx tsc --noEmit` (Nitx-Ui) | 8 errors, all pre-existing, none in a touched file |
| `pnpm build` (Signage, tarball install) | compiles; assets route 196 kB first load; pdf.js in separate 337 kB and 388 kB chunks |
| React dedup under pnpm | one `react@18.3.1` in the store; `react-pdf@10.5.0` resolved against it, not against the package's own React 19 |
| `pnpm vitest run` (Signage) | 96 of 97 pass. The failure is `tests/typography/check-typography.test.ts`, from three pre-existing hits in `screens/[id]/_components/info-content.tsx` introduced by `05d4fc00`, unrelated to this change |

### Gaps

No screenshots. The session that produced this change had no browser tooling
and no Figma access, so the responsive, RTL, light and dark evidence each
ticket asks for is **not** attached, and neither is a visual comparison
against the reference frames. What follows has been reasoned from the code and
needs a pass in a browser before any of these tickets is closed:

1. A PDF at 320px wide: the control row wraps, and the page still fits.
2. Arabic: the control row mirrors, both chevrons point the right way, and
   arrow keys move between assets the right way.
3. Dark mode: the page is white on the black scrim, and the shadow still reads.
4. A damaged PDF, a password-protected PDF, a `.docx`, and a document whose
   host refuses the fetch, each reaching its own panel.
5. The ellipsis in Ads, Publisher and Studio: hover and keyboard focus both
   visible, in both themes.
6. The migrated tab bars at 100% and at 200% zoom, against the Assets
   reference, checking the baseline and the underline alignment.
