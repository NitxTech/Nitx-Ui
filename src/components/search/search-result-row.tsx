"use client";

import * as React from "react";

import { cn } from "../../lib/utils";

interface SearchResultRowProps {
  id: string;
  active: boolean;
  onActivate: () => void;
  onChoose: () => void;
  children: React.ReactNode;
}

/**
 * One listbox option: the chrome around whatever a source renders.
 *
 * The pointer moves the active row rather than adding a hover style of its
 * own, so mouse and keyboard share one highlight and there is never a second
 * row looking selected. Mouse down is prevented so the field keeps focus and
 * goes on driving the list.
 */
export function SearchResultRow({
  id,
  active,
  onActivate,
  onChoose,
  children,
}: SearchResultRowProps) {
  return (
    <div
      id={id}
      role="option"
      aria-selected={active}
      onMouseDown={(event) => event.preventDefault()}
      onMouseMove={onActivate}
      onClick={onChoose}
      className={cn(
        "flex min-h-16 cursor-pointer select-none items-center gap-4 rounded-[18px] px-3 py-2.5",
        active && "bg-muted",
      )}
    >
      {children}
    </div>
  );
}

/**
 * The usual row body: a title with an optional second line, both clipped.
 * A source can ignore this and render whatever it likes.
 */
export function SearchResultText({
  title,
  detail,
}: {
  title: string;
  detail?: string;
}) {
  return (
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-semibold text-foreground">{title}</p>
      {detail && (
        <p className="truncate text-xs text-muted-foreground">{detail}</p>
      )}
    </div>
  );
}

/** A 44px leading tile, for a source's icon or thumbnail. */
export function SearchResultIcon({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[14px]",
        className,
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}
