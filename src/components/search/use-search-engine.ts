"use client";

import { rankMatches } from "./match";
import type { SearchGroup, SearchResults, SearchSource } from "./types";

const DEFAULT_LIMIT = 8;

/**
 * Runs the host's sources against a query and returns grouped, ranked rows.
 *
 * Groups keep the order the sources were given, so a product decides what
 * comes first. Before anything is typed only the sources marked `initial`
 * show, which keeps the empty state to things already in memory rather than
 * a list of everything.
 *
 * Nothing here is memoised. Ranking is a substring match over lists that are
 * already in the browser, and it has to re-run on every keystroke anyway; a
 * memo keyed on anything cheap enough to compare would have gone stale on a
 * rename, which is worse than the work it saved.
 *
 * `sources` must be stable: each source's `useItems` is a hook, and they are
 * called in array order.
 */
export function useSearchEngine(
  sources: readonly SearchSource<any>[],
  query: string,
): SearchResults {
  // Hooks, so this cannot be inside a callback or a conditional.
  const states = sources.map((source) => source.useItems());

  const typing = query.trim().length > 0;
  const groups: SearchGroup[] = [];
  const retries: Array<() => void> = [];
  let loading = false;
  let failed = false;

  sources.forEach((source, index) => {
    const state = states[index];

    if (state.loading) loading = true;
    if (state.failed) {
      failed = true;
      if (state.retry) retries.push(state.retry);
    }

    if (!typing && !source.initial) return;

    const ordered = typing
      ? rankMatches(state.items, query, source.getText)
      : source.sortInitial
        ? [...source.sortInitial(state.items)]
        : [...state.items];

    const hits = ordered.slice(0, source.limit ?? DEFAULT_LIMIT).map((item) => ({
      id: `${source.kind}:${source.getKey(item)}`,
      kind: source.kind,
      render: () => source.renderRow(item),
      open: () => source.onOpen(item),
    }));

    if (hits.length > 0) {
      groups.push({ kind: source.kind, label: source.label, hits });
    }
  });

  return {
    groups,
    hits: groups.flatMap((group) => group.hits),
    loading,
    failed,
    retry: () => {
      for (const retry of retries) retry();
    },
  };
}
