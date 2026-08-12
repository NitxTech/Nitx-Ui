// Canonical asset domain types shared by every Nitx product.
// This is the single source of truth for `Asset`/`Folder` exported from nitxui.

export type AssetType =
  | "image"
  | "video"
  | "document"
  | "link"
  | "app"
  | "canvas";

export type AssetImage = {
  uuid: string;
  mime_type: string;
  original_path?: string;
  compressed_path?: string;
  thumbnail_path?: string;
  size: string;
  created_at: string;
  updated_at: string;
};

export type AssetVideo = {
  uuid: string;
  mime_type: string;
  duration: number;
  original_path?: string;
  compressed_path?: string;
  thumbnail_path?: string;
  size: string;
  created_at: string;
  updated_at: string;
};

export type AssetDocument = {
  uuid: string;
  mime_type: string;
  original_path: string;
  size: string;
  created_at: string;
  updated_at: string;
};

export type AssetLink = {
  uuid: string;
  thumbnail_url: string;
  url: string;
  is_qr_code: boolean;
  qr_code_position: string;
  created_at: string;
};

export type AssetApp = {
  type: string;
  hour?: number;
  minute?: number;
  second?: number;
  countdown_duration?: number;
  config?: {
    duration?: number;
  };
};

export type AssetCanvas = {
  id: number;
  uuid: string;
  name: string;
  size: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type Asset = {
  id: string;
  uuid: string;
  folder_id: number | null;
  name: string;
  is_ready: boolean;
  created_at: string;
  updated_at: string;
} & (
  | { type: "image"; image: AssetImage }
  | { type: "video"; video: AssetVideo }
  | { type: "document"; document: AssetDocument }
  | { type: "link"; link: AssetLink }
  | { type: "app"; app: AssetApp }
  | { type: "canvas"; canvas: AssetCanvas }
);

export type Folder = {
  id: string;
  space_id: string;
  parent_id: string | null;
  name: string;
  is_corrupted: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  children?: Folder[];
  assets_count: number;
  depth?: number;
};

export type Path = {
  id: string | null;
  label: string;
};

export type LinkDetail = {
  uuid: string;
  url: string;
  thumbnail_url?: string;
  is_qr_code: boolean;
  qr_code_position: string;
  created_at?: string;
  updated_at?: string;
};

export type LinkInput = {
  url: string;
  is_qr_code: boolean;
  qr_code_position: string;
  space_uuid?: string;
};

/**
 * Everything the assets UI needs from the backend. Create one with
 * `createAssetsApi(axios)` and extend via spread-and-override, exactly like
 * `createSpaceSelectorApi`. Every method is implemented against the shared
 * Laravel API; feature flags only gate which parts of the UI render.
 */
export interface AssetsApi {
  fetchAssetsAndFolders(
    folderUuid?: string | null,
  ): Promise<{ assets: Asset[]; folders: Folder[] }>;
  /** Flat, folderless listing. Supports the backend `?types=` filter. */
  fetchAssets(params?: { types?: AssetType[] }): Promise<Asset[]>;
  deleteAssets(uuids: string[]): Promise<void>;
  renameAsset(uuid: string, name: string): Promise<void>;
  moveAssets(uuids: string[], destinationUuid: string | null): Promise<void>;
  downloadAsset(uuid: string): Promise<Blob>;
  createFolder(name: string, parentId: string | null): Promise<Folder>;
  updateFolder(
    id: string,
    patch: { name?: string; parent_id?: string | null },
  ): Promise<void>;
  deleteFolder(id: string): Promise<void>;
  deleteFolders(ids: string[]): Promise<void>;
  downloadFolderContents(id: string): Promise<Blob>;
  // Links (rendered when `features.links` is enabled)
  fetchLink(uuid: string): Promise<LinkDetail>;
  createLink(input: LinkInput): Promise<LinkDetail>;
  updateLink(uuid: string, input: Partial<LinkInput>): Promise<void>;
  /**
   * Whether a URL can be embedded in an iframe. Browsers can't read
   * X-Frame-Options cross-origin, so this needs a consumer-side proxy
   * (signage ships one at /api/check-iframe-access). When omitted, the
   * link editor treats every valid URL as embeddable.
   */
  checkIframeAccess?(url: string): Promise<boolean>;
  // Canvas (rendered when `features.canvas` is enabled)
  fetchCanvases(): Promise<Asset[]>;
}

export interface AssetsFeatureFlags {
  /** Folder tree + breadcrumbs. `false` = flat listing of every asset in the space. Default: true. */
  folders?: boolean;
  /** The "links" asset type: links tab, create/edit link flows. Default: false. */
  links?: boolean;
  /** The "canvas" asset type tab. Default: false. */
  canvas?: boolean;
  /** Dragging assets onto folder cards to move them. Default: false. */
  dragDrop?: boolean;
  /** Upload button + upload modal. Default: true. */
  upload?: boolean;
}

export interface AssetsUploadConfig {
  /** TUS endpoint, e.g. `${NEXT_PUBLIC_API_URL}/api/tus`. */
  endpoint: string;
  /** Uppy Companion URL for Dropbox / Google Drive imports. */
  companionUrl?: string;
  /** Getter, not a value — tokens refresh between renders. */
  getAccessToken: () => string | undefined;
  /** Bytes. Default 1 GiB. */
  maxFileSize?: number;
  /** Uppy `allowedFileTypes`. Defaults to `ALLOWED_ASSET_UPLOAD_FILE_TYPES`. */
  allowedFileTypes?: string[];
}

/**
 * Route hooks for flows that live on their own pages in the consumer app.
 * Required only when `features.links` is enabled.
 */
export interface AssetsNavigation {
  toLinkNew: () => void;
  toLinkEdit: (uuid: string) => void;
  fromLinksBack: () => void;
}
