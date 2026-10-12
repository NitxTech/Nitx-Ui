/**
 * Icon-button treatment for the asset and folder cards.
 *
 * The options ellipsis used to carry `className="icon"`, a utility the library
 * never ships: only Signage and Reach define `.icon` in their own
 * `globals.css`, so on Ads, Publisher and Studio the button had no hit area,
 * no hover and no focus ring. The geometry here is Signage's `.icon` (a 32px
 * square, 8px radius) plus a hover surface and a focus ring, so the control
 * looks and behaves the same in every dashboard.
 *
 * Exported so a host styling its own `renderAssetActions` buttons matches the
 * ellipsis beside them.
 */
export const assetCardIconButtonClass = [
  "flex size-8 shrink-0 items-center justify-center rounded-[8px]",
  "text-zinc-700 transition-colors duration-200",
  "hover:bg-zinc-100 hover:text-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
  "disabled:pointer-events-none disabled:text-zinc-400",
  "dark:text-zinc-200 dark:hover:bg-zinc-800 dark:hover:text-primary",
  "dark:disabled:text-zinc-600",
].join(" ");
