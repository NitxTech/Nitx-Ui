// Name matching shared by every global search source. Case, accents and
// Arabic letter variants are ignored, and separators count as spaces, so
// "summer campaign" finds "Summer-Campaign" and "مدرسة" finds "مدرسه".

const ARABIC_FOLDS: ReadonlyArray<[RegExp, string]> = [
  // NFKD already splits the hamza and madda off أ إ آ; alef wasla needs folding.
  [/ٱ/g, "ا"],
  [/ى/g, "ي"],
  [/ة/g, "ه"],
  // Tatweel is pure stretching.
  [/ـ/g, ""],
];

export function normalizeSearchText(text: string): string {
  let normalized = text.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase();
  for (const [pattern, replacement] of ARABIC_FOLDS) {
    normalized = normalized.replace(pattern, replacement);
  }
  return normalized.replace(/[\s\-_./]+/g, " ").trim();
}

/**
 * How well `text` matches a query already passed through
 * `normalizeSearchText`: 0 exact, 1 prefix, 2 start of a later word,
 * 3 inside a word, null no match.
 */
export function matchRank(text: string, query: string): number | null {
  const name = normalizeSearchText(text);
  if (!name.includes(query)) return null;
  if (name === query) return 0;
  if (name.startsWith(query)) return 1;
  if (` ${name}`.includes(` ${query}`)) return 2;
  return 3;
}

/**
 * The items whose text matches `query`, best match first. Ties keep their
 * input order (sort is stable), so pre-sorted lists stay sorted within a
 * rank. An empty query returns every item.
 */
export function rankMatches<T>(
  items: readonly T[],
  query: string,
  getText: (item: T) => string,
): T[] {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [...items];

  const ranked: { item: T; rank: number }[] = [];
  for (const item of items) {
    const rank = matchRank(getText(item), normalizedQuery);
    if (rank !== null) ranked.push({ item, rank });
  }
  return ranked.sort((a, b) => a.rank - b.rank).map(({ item }) => item);
}
