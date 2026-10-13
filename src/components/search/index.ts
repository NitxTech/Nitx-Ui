export {
  GlobalSearchProvider,
  useGlobalSearch,
  type GlobalSearchProviderProps,
} from "./search-provider";
export { SearchTrigger, SearchIconTrigger } from "./search-trigger";
export {
  SearchResultRow,
  SearchResultText,
  SearchResultIcon,
} from "./search-result-row";
export { useSearchEngine } from "./use-search-engine";
export {
  normalizeSearchText,
  matchRank,
  rankMatches,
} from "./match";
export {
  isApplePlatform,
  isSearchShortcut,
  searchShortcut,
  type SearchShortcut,
} from "./shortcut";
export type {
  SearchSource,
  SearchSourceState,
  SearchHit,
  SearchGroup,
  SearchResults,
} from "./types";
