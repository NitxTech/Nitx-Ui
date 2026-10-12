"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

export interface FloatingBarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Styles the bar itself; `className` styles the anchor around it. */
  barClassName?: string;
  children: React.ReactNode;
}

/**
 * Anchors a floating toolbar to the bottom of the viewport.
 *
 * `fixed`, not `absolute`: every dashboard scrolls its content inside its own
 * container, so an absolutely placed bar sits at the bottom of the content,
 * far below the fold, and is never seen. Because it is fixed it also stays put
 * through nested scrolling, resize and browser zoom.
 *
 * Two custom properties position it, both 0 when a host sets neither:
 *
 * - `--nitx-bottom-inset`: the host's own bottom chrome (a mobile nav bar, a
 *   player). The bar rides above it instead of hiding underneath.
 * - `--nitx-side-inset`: the width of a persistent sidebar, as a logical
 *   inset, so the bar centres on the content rather than the window. It flips
 *   with the layout, so Arabic needs no separate value.
 *
 * The anchor takes no pointer events, so the page underneath stays usable
 * everywhere the bar does not cover it.
 */
export const FloatingBar = React.forwardRef<HTMLDivElement, FloatingBarProps>(
  ({ className, barClassName, children, ...props }, ref) => (
    <div
      className={cn(
        "pointer-events-none fixed z-50 flex justify-center px-4",
        "bottom-[calc(1rem_+_var(--nitx-bottom-inset,0px))] md:bottom-[calc(2.5rem_+_var(--nitx-bottom-inset,0px))]",
        "start-[var(--nitx-side-inset,0px)] end-0",
        className,
      )}
    >
      <div
        ref={ref}
        {...props}
        className={cn(
          "pointer-events-auto flex max-w-[calc(100vw_-_2rem)] items-center gap-1 overflow-x-auto rounded-[14px] border p-2 shadow-lg sm:gap-2",
          "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900",
          "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-200",
          barClassName,
        )}
      >
        {children}
      </div>
    </div>
  ),
);

FloatingBar.displayName = "FloatingBar";

export default FloatingBar;
