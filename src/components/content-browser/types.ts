export type TabId = "Assets" | "Links" | "Apps" | "Sequences" | "Layout" | "Channels";

export interface Folder {
  id: string;
  name: string;
  parent_id?: string | null;
  assets_count?: number;
}

export interface Asset {
  uuid: string;
  name: string;
  type: "image" | "video" | "document" | "link";
  is_ready: boolean;
  created_at: string;
  image?: { thumbnail_path: string };
  video?: { thumbnail_path: string };
  document?: { mime_type: string };
  link?: { thumbnail_url?: string };
}

export interface Layout {
  uuid: string;
  name: string;
}

export interface Sequence {
  id: string;
  name: string;
  total_duration?: string;
}

export interface Channel {
  id: string;
  name: string;
  isPublished?: boolean;
}

export interface App {
  id: string;
  name: string;
  icon_url?: string;
}

export interface AppInstance {
  id: string;
  name: string;
  app_name: string;
  app_icon_url?: string;
  app_id: string;
  raw?: any;
}

export type ContentItem =
  | (Asset & { screenable_type?: never })
  | (Layout & { type: "layout"; screenable_type: "layout" })
  | (Sequence & { type: "sequence"; screenable_type: "sequence" })
  | (Channel & { type: "channel"; screenable_type: "channel" })
  | {
      type: "app";
      screenable_type: "app";
      uuid: string;
      name: string;
      instanceId: string;
      app_id: string;
      app?: any;
      is_ready: true;
      duration: object;
      created_at: string;
      updated_at: string;
    };

export interface ContentBrowserApi {
  fetchAssets(folderId?: string | null): Promise<{ assets: Asset[]; folders: Folder[] }>;
  fetchLayouts(): Promise<Layout[]>;
  fetchSequences(): Promise<Sequence[]>;
  fetchChannels(): Promise<Channel[]>;
  fetchApps(spaceUuid: string): Promise<App[]>;
  fetchAppInstances(spaceUuid: string, appId: string): Promise<AppInstance[]>;
}

export interface AddContentModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (items: ContentItem[]) => void;
  api: ContentBrowserApi;
  spaceUuid: string;
  /** Tabs to display. Defaults to all six tabs. */
  allowedTabs?: TabId[];
  /** Called when the Upload button is clicked. Consumer controls the UploadModal. */
  onUploadClick?: () => void;
  /** Restrict asset selection to a single item. */
  singleSelect?: boolean;
}

export interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  /** TUS upload endpoint, e.g. `${NEXT_PUBLIC_API_URL}/api/tus` */
  uploadEndpoint: string;
  accessToken: string;
  spaceUuid: string;
  currentFolderUuid?: string;
  /** Uppy companion URL for Dropbox/Google Drive. Defaults to "http://localhost:3020" */
  companionUrl?: string;
  onUploadComplete?: () => void;
}
