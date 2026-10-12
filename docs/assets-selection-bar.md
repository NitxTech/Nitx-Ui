# Assets selection bar

The bar at the bottom of the Assets browser while items are selected. This
covers the reference, the direction, the change, the consumer matrix and the
evidence.

## What was wrong

`AssetsBrowser` drew the bar as `absolute ... bottom-4` inside its own root.
Every consumer mounts the browser inside a scrolling wrapper, so `absolute`
resolved against the content box, not the viewport: the bar sat at the bottom
of the whole list. Measured in Ads at 1440x900 with three items selected, its
rect was `top 1464, bottom 1509` in a 900px window, and scrolling to the end of
the list still left it at `top 875, bottom 920`, clipped by the wrapper. In
practice no one ever saw it.

The bar also offered only Move to and Delete. There was no count that a screen
reader announced, no way to clear the selection from the bar, and no Select
all, although Cmd+A already did exactly that.

## The direction

Restrained, and the same shape the product already uses elsewhere: one pill
floating over the page, neutral surface, a single destructive action in rose.

- Fixed to the viewport, not the content, so it behaves the same in all six
  consumers regardless of how each one wraps the browser.
- Clear first, then the count, then the actions, so the way out is the first
  thing the eye and the tab order reach.
- Logical spacing (`pe`, `border-e`) throughout, so RTL mirrors with no extra
  rules.
- Labels collapse to icons below `sm`; the icons keep their accessible names.
- Existing tokens only: `zinc` surfaces and borders, `rose` for Delete, the
  `rounded-[14px]` radius the old bar used.

## The change

| file | change |
| --- | --- |
| `components/assets/components/SelectionBar.tsx` | New. The whole bar. `fixed inset-x-0 bottom-4 md:bottom-10` on a `pointer-events-none` wrapper, so the page stays usable either side of it. `role="region"` with a name, and the count in an `aria-live="polite"` paragraph. Returns nothing below one selected item. |
| `components/assets/components/AssetsBrowser.tsx` | Renders `SelectionBar`, drops the old inline bar. Adds `selectAllItems`, which Cmd+A now shares. The grid takes `pb-24 md:pb-32` while anything is selected, so the last row clears the bar. |
| `messages/{en,ar}/nitxuilib.json` | Adds `assets.selectionBar`. |

### Localisation

`assets.selectionBar` is complete in `en` and `ar`. Two notes on what was
already there:

- `assets.assetList.deleteItems` read `Delete {{count}} Item{plural}`. The
  resolver in `src/i18n/nitxuilib.ts` interpolates `{{var}}` only, so a reader
  saw the literal `Delete 3 Item{plural}`. It is now count-agnostic.
- `itemsSelected_$one` and `itemsSelected_$other` are dead keys: the resolver
  has no plural support, so no `_$` suffix is ever looked up. The new count
  string avoids plurals rather than adding a form the resolver cannot pick.

## Consumer coverage

All six products take `AssetsBrowser` from the package. Five render it, and
all five wrap it identically, so the bug and the fix are identical in all of
them. No public prop changed, so nothing in a consumer needs editing.

| product | nitxui installed | mounts the browser as | affected | after upgrading |
| --- | --- | --- | --- | --- |
| nitx-ads-dash | 2.0.5 | `max-h-screen overflow-y-auto` | yes | bar becomes reachable |
| nitx-studio-dash | 2.1.0 | `max-h-dvh overflow-y-auto` | yes | same |
| nitx-reach-dash | 2.1.2 | `max-h-screen overflow-y-auto` | yes | same |
| nitx-signage-dash | 2.0.3 | `max-h-screen overflow-y-auto`, plus `renderAssetActions` and `renderFolderMenuItems` | yes | same; both render props are untouched |
| nitx-publisher-dash | 2.0.3 | `max-h-screen overflow-y-auto` | yes | same |
| my-nitx-dash | 1.7.9 | does not render it | no | no change |

### Upgrade blocker

The package HEAD needs `@hugeicons/core-free-icons@^4.1.1`. Installed today:

| product | hugeicons | can take HEAD |
| --- | --- | --- |
| nitx-signage-dash | 4.2.3 | yes |
| nitx-reach-dash | 2.0.0 | no, one major behind |
| nitx-ads-dash | 1.2.1 | no, three majors behind |
| nitx-studio-dash | 1.2.1 | no |
| nitx-publisher-dash | 1.0.14 | no |
| my-nitx-dash | 1.0.14 | not affected |

So four of the five need the icon bump before they can take this. That is not
this change's doing, and it blocks every package release equally, but it is
the reason Ads cannot simply bump `nitxui` today.

### For the fixed-toolbar owner

The bar centres on the viewport, not on the content area. With a sidebar open
at 1440 that puts it 128px left of the content centre. It was chosen because
it is the one behaviour that is stable across six different shells and
survives the sidebar collapsing. If the shared fixed toolbar settles on
content-anchored instead, this should follow it; `SelectionBar` is internal to
the package, so changing it is a one-file edit with no consumer impact.

## Evidence

Ads on an isolated dev copy, Chrome, seeded with 24 assets and 3 folders.
Scripts and screenshots: `scratchpad/assets/`.

`pinned` compares the bar's rect before and after scrolling the list to its
end. `clearance` compares the grid's reserved bottom padding with the space
the bar occupies.

| combo | count | position | pinned | centred | clearance | Select all | Deselect | Clear | overflow | page errors |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1440 dark LTR | 3 selected | fixed | yes | yes | 104 >= 74 | 27 selected | bar gone | bar hidden | 0 | none |
| 1440 dark RTL | 3 selected | fixed | yes | yes | 104 >= 74 | 27 selected | bar gone | bar hidden | 0 | none |
| 1440 light LTR | 3 selected | fixed | yes | yes | 104 >= 74 | 27 selected | bar gone | bar hidden | 0 | none |
| 768 dark LTR | 3 selected | fixed | yes | yes | 128 >= 90 | 27 selected | bar gone | bar hidden | 0 | none |
| 390 dark LTR | 3 selected | fixed | yes | yes | 96 >= 66 | 27 selected | bar gone | bar hidden | 0 | none |
| 390 dark RTL | 3 selected | fixed | yes | yes | 96 >= 66 | 27 selected | bar gone | bar hidden | 0 | none |
| 390 light LTR | 3 selected | fixed | yes | yes | 96 >= 66 | 27 selected | bar gone | bar hidden | 0 | none |

Delete opens the confirmation with the right count: "Delete 2 selected. Are
you sure you want to delete these 2 items? This action cannot be undone."

Other checks: `tsc --noEmit` gives the same 13 errors before and after, all in
`src/stories/`, none in `assets/`; `npm run build` including `build:css`
succeeds and the bar's utilities are all in `dist/styles.css`; the no-dash
rule passes on every changed file.

The RTL runs flip `dir` only. Ads has no Arabic route today, so the copy in
those screenshots is still English and the count reads "selected 3" under
bidi reordering. The Arabic string is `{{count}} محدد`, which reads correctly
in an Arabic locale.
