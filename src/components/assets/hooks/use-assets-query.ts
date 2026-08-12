"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useNitxUiTranslation } from "../../../i18n/nitxuilib";
import { useAssetsConfig } from "../context";
import type { Asset, Folder } from "../types";

// Query keys are space-scoped: without the space in the key, switching
// spaces can serve another tenant's cached assets until invalidation.
export const assetKeys = {
  all: (spaceUuid: string | null | undefined) =>
    ["assets", spaceUuid ?? "no-space"] as const,
  list: (spaceUuid: string | null | undefined, folderId: string | null) =>
    [...assetKeys.all(spaceUuid), "list", folderId] as const,
};

// Newest first. Items without a created_at (e.g. studio's flat responses if
// the field is ever absent) sort to the end rather than crashing.
const newestFirst = <T extends { created_at?: string }>(items: T[]): T[] =>
  [...items].sort(
    (a, b) =>
      (new Date(b.created_at ?? 0).getTime() || 0) -
      (new Date(a.created_at ?? 0).getTime() || 0)
  );

/**
 * Shared fetcher so the main query and the folder-hover prefetch populate
 * the cache with identically sorted data.
 */
export async function fetchAssetsAndFoldersSorted(
  api: Pick<import("../types").AssetsApi, "fetchAssetsAndFolders">,
  folderId: string | null
) {
  const { assets, folders } = await api.fetchAssetsAndFolders(folderId);
  return { assets: newestFirst(assets), folders: newestFirst(folders) };
}

export function useAssetsQuery(
  folderId: string | null,
  options?: { enabled?: boolean },
) {
  const { api, spaceUuid, features } = useAssetsConfig();

  return useQuery({
    queryKey: assetKeys.list(spaceUuid, features.folders ? folderId : null),
    queryFn: async () => {
      if (!features.folders) {
        // Flat mode: every asset in the space, no folder tree.
        const assets = await api.fetchAssets();
        return { assets: newestFirst(assets), folders: [] as Folder[] };
      }
      return fetchAssetsAndFoldersSorted(api, folderId);
    },
    staleTime: 1000 * 60 * 5,
    enabled: (options?.enabled ?? true) && !!spaceUuid,
  });
}

export function useDeleteAssetMutation(folderId: string | null) {
  const queryClient = useQueryClient();
  const { api, spaceUuid } = useAssetsConfig();
  const { t } = useNitxUiTranslation();
  const key = assetKeys.list(spaceUuid, folderId);

  return useMutation({
    mutationFn: async (uuids: string[]) => {
      await api.deleteAssets(uuids);
    },
    onMutate: async (uuids) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previousData = queryClient.getQueryData(key);

      queryClient.setQueryData(key, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          assets: old.assets.filter((a: Asset) => !uuids.includes(a.uuid)),
        };
      });

      return { previousData };
    },
    onError: (err, uuids, context) => {
      queryClient.setQueryData(key, context?.previousData);
      toast.error(t("assets.mutations.deleteAssetFailed"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
}

export function useCreateFolderMutation(folderId: string | null) {
  const queryClient = useQueryClient();
  const { api, spaceUuid } = useAssetsConfig();
  const { t } = useNitxUiTranslation();
  const key = assetKeys.list(spaceUuid, folderId);

  return useMutation({
    mutationFn: async ({
      name,
      parentId,
    }: {
      name: string;
      parentId: string | null;
    }) => {
      return api.createFolder(name, parentId);
    },
    onMutate: async (newFolder) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previousData = queryClient.getQueryData(key);

      queryClient.setQueryData(key, (old: any) => {
        if (!old) return old;

        const optimisticFolder = {
          id: `temp-${Date.now()}`,
          uuid: `temp-${Date.now()}`,
          name: newFolder.name,
          parent_id: newFolder.parentId,
          assets_count: 0,
          children: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Newest first — the fresh folder belongs at the top, matching
        // where the server-sorted refetch will place it.
        return {
          ...old,
          folders: [optimisticFolder, ...(old.folders || [])],
        };
      });

      return { previousData };
    },
    onError: (err, newFolder, context) => {
      queryClient.setQueryData(key, context?.previousData);
      toast.error(t("assets.mutations.createFolderFailed"));
    },
    onSuccess: () => {
      toast.success(t("assets.mutations.createFolderSuccess"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
}

export function useDeleteFolderMutation(folderId: string | null) {
  const queryClient = useQueryClient();
  const { api, spaceUuid } = useAssetsConfig();
  const { t } = useNitxUiTranslation();
  const key = assetKeys.list(spaceUuid, folderId);

  return useMutation({
    mutationFn: async (id: string) => {
      await api.deleteFolder(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: key });
      const previousData = queryClient.getQueryData(key);

      queryClient.setQueryData(key, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          folders: old.folders.filter((f: Folder) => f.id !== id),
        };
      });

      return { previousData };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(key, context?.previousData);
      toast.error(t("assets.mutations.deleteFolderFailed"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
}

export function useBulkDeleteFoldersMutation(folderId: string | null) {
  const queryClient = useQueryClient();
  const { api, spaceUuid } = useAssetsConfig();
  const { t } = useNitxUiTranslation();
  const key = assetKeys.list(spaceUuid, folderId);

  return useMutation({
    mutationFn: async (folderIds: string[]) => {
      await api.deleteFolders(folderIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      toast.success(t("assets.mutations.deleteFoldersSuccess"));
    },
    onError: () => {
      toast.error(t("assets.mutations.deleteFoldersFailed"));
    },
  });
}

export function useRenameAssetMutation(folderId: string | null) {
  const queryClient = useQueryClient();
  const { api, spaceUuid } = useAssetsConfig();
  const { t } = useNitxUiTranslation();
  const key = assetKeys.list(spaceUuid, folderId);

  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      await api.renameAsset(id, name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      toast.success(t("assets.mutations.renameAssetSuccess"));
    },
    onError: () => {
      toast.error(t("assets.mutations.renameAssetFailed"));
    },
  });
}

export function useRenameFolderMutation(folderId: string | null) {
  const queryClient = useQueryClient();
  const { api, spaceUuid } = useAssetsConfig();
  const { t } = useNitxUiTranslation();
  const key = assetKeys.list(spaceUuid, folderId);

  return useMutation({
    mutationFn: async ({
      id,
      name,
      parentId,
    }: {
      id: string;
      name: string;
      parentId: string | null;
    }) => {
      await api.updateFolder(id, { name, parent_id: parentId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
      toast.success(t("assets.mutations.renameFolderSuccess"));
    },
    onError: () => {
      toast.error(t("assets.mutations.renameFolderFailed"));
    },
  });
}

export function useMoveAssetMutation(folderId: string | null) {
  const queryClient = useQueryClient();
  const { api, spaceUuid } = useAssetsConfig();
  const { t } = useNitxUiTranslation();

  return useMutation({
    mutationFn: async ({
      uuids,
      destinationId,
    }: {
      uuids: string[];
      destinationId: string | null;
    }) => {
      await api.moveAssets(uuids, destinationId);
      return { destinationId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: assetKeys.list(spaceUuid, folderId),
      });
      if (data.destinationId !== folderId) {
        queryClient.invalidateQueries({
          queryKey: assetKeys.list(spaceUuid, data.destinationId),
        });
      }
      toast.success(t("assets.mutations.moveAssetsSuccess"));
    },
    onError: () => {
      toast.error(t("assets.mutations.moveAssetsFailed"));
    },
  });
}

export function useMoveFolderMutation(folderId: string | null) {
  const queryClient = useQueryClient();
  const { api, spaceUuid } = useAssetsConfig();
  const { t } = useNitxUiTranslation();

  return useMutation({
    mutationFn: async ({
      id,
      parentId,
    }: {
      id: string;
      parentId: string | null;
    }) => {
      await api.updateFolder(id, { parent_id: parentId });
      return { parentId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: assetKeys.list(spaceUuid, folderId),
      });
      if (data.parentId !== folderId) {
        queryClient.invalidateQueries({
          queryKey: assetKeys.list(spaceUuid, data.parentId),
        });
      }
      toast.success(t("assets.mutations.moveFolderSuccess"));
    },
    onError: () => {
      toast.error(t("assets.mutations.moveFolderFailed"));
    },
  });
}
