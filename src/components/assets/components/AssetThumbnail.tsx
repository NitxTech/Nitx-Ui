"use client";

import React, { useEffect, useState } from "react";
import { FileText, Globe, ImageOff, Play } from "lucide-react";

import { cn } from "../../../lib/utils";

export type AssetThumbnailKind = "image" | "video" | "document" | "link";

export interface AssetThumbnailProps {
  /** Thumbnail URL. An empty value renders the fallback straight away. */
  src?: string | null;
  alt: string;
  /** Picks the fallback glyph when the image cannot be shown. */
  kind: AssetThumbnailKind;
  /** Classes for the `<img>` while it is loading or has loaded. */
  className?: string;
  /** Classes for the fallback tile. */
  fallbackClassName?: string;
  /** Icon size inside the fallback tile. */
  iconClassName?: string;
}

const FALLBACK_ICON: Record<
  AssetThumbnailKind,
  React.ComponentType<{ className?: string }>
> = {
  image: ImageOff,
  video: Play,
  document: FileText,
  link: Globe,
};

/**
 * A card thumbnail that degrades gracefully.
 *
 * A broken thumbnail used to leave the browser's broken-image glyph and the
 * alt text spilling across the card: a signed URL expires, a CDN object is
 * purged, or a link preview host blocks hotlinking. The `<img>` now swaps to
 * a neutral tile carrying the asset type's icon the moment it errors, and
 * resets if the card is later handed a new URL.
 */
const AssetThumbnail: React.FC<AssetThumbnailProps> = ({
  src,
  alt,
  kind,
  className,
  fallbackClassName,
  iconClassName,
}) => {
  const [failed, setFailed] = useState(false);

  // A new URL deserves a fresh attempt.
  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    const Icon = FALLBACK_ICON[kind];
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex size-full items-center justify-center",
          "bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-400",
          "dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-500",
          fallbackClassName
        )}
      >
        <Icon
          className={cn("size-6 stroke-[1.5]", iconClassName)}
          aria-hidden
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export default AssetThumbnail;
