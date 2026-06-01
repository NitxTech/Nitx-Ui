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

  fetchCanvasAssets: async () => {
    const { data } = await client.get("/api/assets");
    const allAssets: any[] = data.data?.assets ?? [];
    const canvases = allAssets.filter((a: any) => a.type === "canvas");

    // Enrich each canvas asset with full canvas data from the public endpoint.
    // canvas.uuid (data.canvas.uuid) is the identifier for the canvas content endpoint.
    // The top-level asset id (numeric) is what the bulk "send to screen" endpoint expects.
    const enriched = await Promise.all(
      canvases.map(async (asset: any) => {
        const canvasUuid = asset.canvas?.uuid;
        if (!canvasUuid) return asset;
        try {
          const res = await client.get(`/api/public/assets/${canvasUuid}/canvas`);
          const canvasData = res?.data?.data ?? res?.data;
          if (canvasData) {
            return { ...asset, canvas: { ...asset.canvas, ...canvasData } };
          }
        } catch (_) {
          // If the canvas endpoint fails, return the asset as-is
        }
        return asset;
      }),
    );

    return enriched;
  },
});
