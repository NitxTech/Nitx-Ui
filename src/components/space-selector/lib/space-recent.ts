import { ProxySpace } from "../types";

export const SPACE_RECENT_STORAGE_PREFIX = "nitx_space_last_used_";
export const SPACE_RECENT_EVENT_NAME = "nitx-space-recent-updated";

/**
 * Returns the primary identifier for a space (space_uuid, proxyId, or uuid).
 */
export function getSpaceIdentifier(space: ProxySpace | undefined | null): string {
  if (!space) return "";
  return space.space_uuid || space.proxyId || space.uuid || "";
}

/**
 * Derives a storage key for recent spaces scoped to the authenticated user.
 */
export function getRecentSpacesStorageKey(authUser?: string | number): string {
  const normalized =
    authUser !== undefined && authUser !== null && String(authUser).trim() !== ""
      ? String(authUser).trim()
      : "default";
  return `${SPACE_RECENT_STORAGE_PREFIX}${normalized}`;
}

/**
 * Retrieves the map of space identifiers to epoch timestamps from localStorage.
 */
export function getRecentSpacesMap(authUser?: string | number): Record<string, number> {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const key = getRecentSpacesStorageKey(authUser);
    const raw = window.localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, number>;
    }
    return {};
  } catch {
    return {};
  }
}

/**
 * Records space usage timestamp in localStorage and dispatches a notification event.
 */
export function recordSpaceUsage(
  spaceOrId: ProxySpace | string | undefined | null,
  authUser?: string | number,
  timestamp: number = Date.now()
): Record<string, number> {
  if (typeof window === "undefined" || !spaceOrId) {
    return {};
  }

  const primaryId = typeof spaceOrId === "string" ? spaceOrId : getSpaceIdentifier(spaceOrId);
  if (!primaryId) return {};

  try {
    const key = getRecentSpacesStorageKey(authUser);
    const currentMap = getRecentSpacesMap(authUser);
    const updatedMap: Record<string, number> = {
      ...currentMap,
      [primaryId]: timestamp,
    };

    if (typeof spaceOrId === "object") {
      if (spaceOrId.space_uuid) updatedMap[spaceOrId.space_uuid] = timestamp;
      if (spaceOrId.proxyId) updatedMap[spaceOrId.proxyId] = timestamp;
      if (spaceOrId.uuid) updatedMap[spaceOrId.uuid] = timestamp;
    }

    window.localStorage.setItem(key, JSON.stringify(updatedMap));

    window.dispatchEvent(
      new CustomEvent(SPACE_RECENT_EVENT_NAME, {
        detail: { authUser, spaceId: primaryId, timestamp },
      })
    );

    return updatedMap;
  } catch {
    return {};
  }
}

/**
 * Removes a space from the recent spaces tracking map.
 */
export function removeSpaceRecent(
  spaceOrId: ProxySpace | string | undefined | null,
  authUser?: string | number
): Record<string, number> {
  if (typeof window === "undefined" || !spaceOrId) {
    return {};
  }

  const idsToRemove: string[] = [];
  if (typeof spaceOrId === "string") {
    idsToRemove.push(spaceOrId);
  } else {
    if (spaceOrId.space_uuid) idsToRemove.push(spaceOrId.space_uuid);
    if (spaceOrId.proxyId) idsToRemove.push(spaceOrId.proxyId);
    if (spaceOrId.uuid) idsToRemove.push(spaceOrId.uuid);
  }

  try {
    const key = getRecentSpacesStorageKey(authUser);
    const currentMap = getRecentSpacesMap(authUser);
    const updatedMap: Record<string, number> = { ...currentMap };

    for (const id of idsToRemove) {
      delete updatedMap[id];
    }

    window.localStorage.setItem(key, JSON.stringify(updatedMap));

    window.dispatchEvent(
      new CustomEvent(SPACE_RECENT_EVENT_NAME, {
        detail: { authUser, spaceId: idsToRemove[0] || "", removed: true },
      })
    );

    return updatedMap;
  } catch {
    return {};
  }
}

/**
 * Resolves the latest last-used timestamp for a space from backend and local records.
 */
export function getSpaceTimestamp(
  space: ProxySpace,
  recentMap: Record<string, number>
): number {
  let timestamp = 0;

  // 1. Check space.last_used_at from backend contract if available
  if (space.last_used_at) {
    if (typeof space.last_used_at === "number" && Number.isFinite(space.last_used_at)) {
      timestamp = space.last_used_at;
    } else if (typeof space.last_used_at === "string") {
      const parsed = new Date(space.last_used_at).getTime();
      if (Number.isFinite(parsed) && parsed > 0) {
        timestamp = parsed;
      }
    }
  }

  // 2. Check locally recorded timestamps across all known identifiers
  const candidateIds = [space.space_uuid, space.proxyId, space.uuid].filter(
    Boolean
  ) as string[];

  for (const id of candidateIds) {
    const localTime = recentMap[id];
    if (typeof localTime === "number" && Number.isFinite(localTime) && localTime > timestamp) {
      timestamp = localTime;
    }
  }

  return timestamp;
}

/**
 * Checks if two space objects refer to the same space.
 */
export function isSameSpace(
  a: ProxySpace | undefined | null,
  b: ProxySpace | undefined | null
): boolean {
  if (!a || !b) return false;
  if (a.space_uuid && b.space_uuid && a.space_uuid === b.space_uuid) return true;
  if (a.proxyId && b.proxyId && a.proxyId === b.proxyId) return true;
  if (a.uuid && b.uuid && a.uuid === b.uuid) return true;
  return false;
}

/**
 * Sorts spaces by last used (most recent first).
 * - Spaces with timestamps are placed first in descending order.
 * - Spaces never used maintain a stable order after used ones.
 * - Own spaces and invited spaces are sorted together as one unified list.
 */
export function sortSpacesByLastUsed(
  spaces: ProxySpace[],
  recentMap: Record<string, number> = {},
  activeSpace?: ProxySpace
): ProxySpace[] {
  if (!spaces || spaces.length === 0) return [];

  const indexed = spaces.map((space, originalIndex) => {
    let timestamp = getSpaceTimestamp(space, recentMap);

    // If this space is currently active and has no recorded timestamp yet,
    // give it an initial baseline timestamp so it ranks as used.
    if (isSameSpace(space, activeSpace) && timestamp === 0) {
      timestamp = 1;
    }

    return {
      space,
      originalIndex,
      timestamp,
    };
  });

  indexed.sort((a, b) => {
    // Both have been used: order descending by timestamp
    if (a.timestamp > 0 && b.timestamp > 0) {
      if (b.timestamp !== a.timestamp) {
        return b.timestamp - a.timestamp;
      }
      return a.originalIndex - b.originalIndex;
    }

    // One used, one unused: used comes first
    if (a.timestamp > 0 && b.timestamp === 0) {
      return -1;
    }
    if (b.timestamp > 0 && a.timestamp === 0) {
      return 1;
    }

    // Neither has been used: keep original stable order
    return a.originalIndex - b.originalIndex;
  });

  return indexed.map((item) => item.space);
}
