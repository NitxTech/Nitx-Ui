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
  "flex size-8 shrink-0 items-center justify-center rounded-full",
  "bg-black/50 text-white backdrop-blur-md border border-white/10",
  "transition-all duration-200 shadow-sm",
  "hover:bg-black/75 hover:scale-105 active:scale-95 hover:text-white",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
  "disabled:pointer-events-none disabled:opacity-40",
].join(" ");

