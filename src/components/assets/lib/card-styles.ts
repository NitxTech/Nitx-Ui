/**
 * Icon-button treatment for the asset and folder cards.
 *
 * The options ellipsis used to carry `className="icon"`, a utility the library
 * never ships: only Signage and Reach define `.icon` in their own
 * `globals.css`, so on Ads, Publisher and Studio the button had no hit area,
 * no hover and no focus ring. The geometry here is a 28px square with a
 * hover surface and a focus ring, so the control looks and behaves the same
 * in every dashboard.
 *
 * Exported so a host styling its own `renderAssetActions` buttons matches the
 * ellipsis beside them.
 */
export const assetCardIconButtonClass = [
  "flex size-7 shrink-0 items-center justify-center rounded-[8px]",
  "text-zinc-700 dark:text-zinc-200",
  "transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
  "disabled:pointer-events-none disabled:opacity-40",
].join(" ");

/** The same button on top of a grid thumbnail: a dark pill on the photo. */
export const assetCardOverlayButtonClass = [
  "flex size-7 shrink-0 items-center justify-center rounded-full",
  "bg-black/55 text-white backdrop-blur-sm",
  "transition-colors hover:bg-black/75",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
  "disabled:pointer-events-none disabled:opacity-40",
].join(" ");

/**
 * Column template shared by the list rows and the column header above
 * them: Name, Size, Added Date, Action. A phone keeps Name and Action only;
 * the two middle cells carry `assetListCellMdClass` so they drop out
 * together with the header's.
 */
export const assetListColumnsClass =
  "grid grid-cols-[minmax(0,1fr)_56px] sm:grid-cols-[minmax(0,1fr)_120px_160px_72px] items-center gap-3";

export const assetListCellMdClass = "hidden sm:block";

/** The 40px row every list item and the folder grid card share. */
export const assetListRowClass =
  "h-10 rounded-[12px] border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900";

/** dd/mm/yyyy, as the list's Added Date column shows it. */
export function formatAddedDate(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${date.getFullYear()}`;
}
