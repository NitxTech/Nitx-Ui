import { ContentBrowserApi } from "../types";

export const createContentBrowserApi = (client: any): ContentBrowserApi => ({
  fetchAssets: async (folderId) => {
    const params = folderId ? { folder_uuid: folderId } : {};
    const { data } = await client.get("/api/assets-and-folders", { params });
    return {
      assets: data.data?.assets ?? [],
      folders: data.data?.folders ?? [],
    };
  },

  fetchLayouts: async () => {
    const { data } = await client.get("/api/layouts");
    return data.data ?? [];
  },

  fetchSequences: async () => {
    const { data } = await client.get("/api/sequences");
    return data.data ?? [];
  },

  fetchChannels: async () => {
    const { data } = await client.get("/api/channels");
    return data.data ?? [];
  },

  fetchApps: async (spaceUuid) => {
    const { data } = await client.get("/api/apps", {
      headers: { "X-Space-Uuid": spaceUuid },
    });
    return data.data ?? [];
  },

  fetchAppInstances: async (spaceUuid, appId) => {
    const { data } = await client.get(`/api/apps/${appId}`, {
      headers: { "X-Space-Uuid": spaceUuid },
    });
    return data.data ?? [];
  },
});
