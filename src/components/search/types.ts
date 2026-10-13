import type * as React from "react";

/** What a source reports on each render. */
export interface SearchSourceState<T> {
  items: readonly T[];
  /** First load in flight. The dialog says so without hiding other sources. */
  loading?: boolean;
  /** This source failed. The others still show, and `retry` is offered. */
  failed?: boolean;
  retry?: () => void;
}

/**
 * One kind of thing search can find, supplied by the host.
 *
 * The package owns the dialog, the shortcut, the ranking, the grouping, the
 * keyboard and the states. A product owns what it has and where that opens,
 * which is this.
 *
 * `useItems` is called as a hook, once per render, in array order, so the
 * array of sources must be stable: same sources in the same order every
 * render. Define it at module scope, or memoise it.
 */
export interface SearchSource<T = any> {
  /** Stable identifier, also the group key. */
  kind: string;
  /** Group heading, already translated by the host. */
  label: string;
  /** Most rows to show in this group. Defaults to 8. */
  limit?: number;
  /**
   * Show this source before anything is typed. Suggestions, in effect.
   * Sources that have to be fetched are better left out of the empty state.
   */
  initial?: boolean;
  useItems: () => SearchSourceState<T>;
  /** Unique within the source. */
  getKey: (item: T) => string;
  /** The text a query is matched against. */
  getText: (item: T) => string;
  /** The row's contents. The option chrome around it is supplied. */
  renderRow: (item: T) => React.ReactNode;
  onOpen: (item: T) => void;
  /**
   * Reorders items for the empty state, where there is no query to rank by:
   * putting the current space first, for instance.
   */
  sortInitial?: (items: readonly T[]) => readonly T[];
}

/** One row, flattened so the keyboard can walk the whole list. */
export interface SearchHit {
  /** `kind:key`. */
  id: string;
  kind: string;
  render: () => React.ReactNode;
  open: () => void;
}

export interface SearchGroup {
  kind: string;
  label: string;
  hits: SearchHit[];
}

export interface SearchResults {
  /** Only the groups with something in them, in source order. */
  groups: SearchGroup[];
  /** Every hit, in the order the groups show them. */
  hits: SearchHit[];
  /** Some source is loading its first page. */
  loading: boolean;
  /** Some source failed. */
  failed: boolean;
  /** Retries only the sources that failed. */
  retry: () => void;
}
