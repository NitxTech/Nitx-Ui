import type { ProxySpace } from "../types";

export const getSpaceImageUrl = (
  space?: Partial<ProxySpace> | null,
  overrideUrl?: string | null
): string | undefined => {
  if (overrideUrl) return overrideUrl;
  if (!space) return undefined;
  return (
    space.avatar ||
    space.image ||
    space.image_url ||
    space.icon ||
    undefined
  );
};

export const getSpaceInitials = (name?: string | null): string => {
  if (!name) return "SP";
  const trimmed = name.trim();
  if (!trimmed) return "SP";
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
};

