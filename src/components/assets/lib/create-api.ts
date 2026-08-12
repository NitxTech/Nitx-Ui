import type {
  Asset,
  AssetsApi,
  AssetType,
  Folder,
  LinkDetail,
  LinkInput,
} from "../types";

// Expects an axios-like instance (get/post/put/delete returning
// { data: { data: ... } }) that already carries the consumer's
// Authorization and X-Space-Uuid headers — same contract as
// createSpaceSelectorApi / createContentBrowserApi.
type AxiosLike = {
  get: (url: string, config?: any) => Promise<any>;
  post: (url: string, body?: any, config?: any) => Promise<any>;
  put: (url: string, body?: any, config?: any) => Promise<any>;
  delete: (url: string, config?: any) => Promise<any>;
};

const unwrap = (res: any) => res?.data?.data ?? res?.data ?? {};

// Different products' backends drift slightly in what folder objects carry;
// normalize the union of the shapes seen in signage and studio.
const normalizeFolder = (folder: any): Folder => ({
  ...folder,
  assets_count: folder?.assets_count ?? 0,
  children: folder?.children ?? [],
});

export function createAssetsApi(client: AxiosLike): AssetsApi {
  return {
    async fetchAssetsAndFolders(folderUuid?: string | null) {
      const params = folderUuid ? `?folder_uuid=${folderUuid}` : "";
      const payload = unwrap(await client.get(`/api/assets-and-folders${params}`));
      return {
        assets: (payload.assets ?? []) as Asset[],
        folders: ((payload.folders ?? []) as any[]).map(normalizeFolder),
      };
    },

    async fetchAssets(params?: { types?: AssetType[] }) {
      const query = params?.types?.length
        ? `?types=${params.types.join(",")}`
        : "";
      const payload = unwrap(await client.get(`/api/assets${query}`));
      return (Array.isArray(payload) ? payload : []) as Asset[];
    },

    async deleteAssets(uuids: string[]) {
      await client.delete("/api/assets/delete", {
        data: { assets_uuids: uuids },
      });
    },

    async renameAsset(uuid: string, name: string) {
      await client.put(`/api/assets/${uuid}/rename`, { name });
    },

    async moveAssets(uuids: string[], destinationUuid: string | null) {
      await client.put("/api/assets/move", {
        assets_uuids: uuids,
        destination_uuid: destinationUuid,
      });
    },

    async downloadAsset(uuid: string) {
      const res = await client.get(`/api/assets/${uuid}/download`, {
        responseType: "blob",
      });
      return res.data as Blob;
    },

    async createFolder(name: string, parentId: string | null) {
      const res = await client.post("/api/folders", {
        name,
        parent_id: parentId,
      });
      return normalizeFolder(unwrap(res));
    },

    async updateFolder(
      id: string,
      patch: { name?: string; parent_id?: string | null },
    ) {
      await client.put(`/api/folders/${id}`, patch);
    },

    async deleteFolder(id: string) {
      await client.delete(`/api/folders/${id}`);
    },

    async deleteFolders(ids: string[]) {
      await client.delete("/api/folders/delete", {
        data: { folder_ids: ids },
      });
    },

    async downloadFolderContents(id: string) {
      const res = await client.get(`/api/folders/${id}/download-contents`, {
        responseType: "blob",
      });
      return res.data as Blob;
    },

    async fetchLink(uuid: string) {
      return unwrap(await client.get(`/api/links/${uuid}`)) as LinkDetail;
    },

    async createLink(input: LinkInput) {
      return unwrap(await client.post("/api/links", input)) as LinkDetail;
    },

    async updateLink(uuid: string, input: Partial<LinkInput>) {
      await client.put(`/api/links/${uuid}`, input);
    },

    async fetchCanvases() {
      const payload = unwrap(await client.get("/api/canvases"));
      return (Array.isArray(payload) ? payload : []) as Asset[];
    },
  };
}
