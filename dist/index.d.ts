import * as React$1 from 'react';
import React__default, { ReactNode, Dispatch, SetStateAction, ComponentType, MouseEvent } from 'react';
import Uppy from '@uppy/core';
import * as zustand from 'zustand';
import * as _tanstack_react_query from '@tanstack/react-query';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as vaul from 'vaul';
import { Drawer as Drawer$1 } from 'vaul';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ClassValue } from 'clsx';

interface ProductSwitcherProps {
    auth_user: number | string;
    profileImage?: string;
    profileName?: string;
}
declare const ProductSwitcher: ({ auth_user, profileImage, profileName, }: ProductSwitcherProps) => React$1.JSX.Element | null;

interface UserAccountProps {
    accounts: {
        id: string;
        name: string;
        email: string;
        imageUrl?: string | null;
        active: boolean;
    }[];
    isExpanded: boolean;
    auth_user: string | number;
}
declare const UserAccount: ({ accounts, isExpanded, auth_user, }: UserAccountProps) => React$1.JSX.Element | null;

type MemberRole = "owner" | "manager" | "editor" | "viewer";
interface Member {
    id: string;
    name: string;
    email: string;
    role: MemberRole;
    imageURL?: string;
    joinedAt?: string;
}
interface Invitation {
    id: string;
    email: string;
    role: MemberRole;
    status: "pending" | "accepted";
    createdAt: string;
}
interface SpaceFeature {
    id: string;
    label: string;
    available: boolean;
}
interface ProxySpace {
    space_uuid: string;
    proxyId: string;
    name: string;
    role?: string;
    total_members?: number;
    totalMembers?: number;
    members_count?: number;
    member_count?: number;
    memberCount?: number;
    members?: unknown[];
    features?: SpaceFeature[];
    uuid?: string;
    avatar?: string;
}
interface SpaceSelectorProps$1 {
    /**
     * The currently active space object
     */
    activeSpace: ProxySpace | undefined;
    /**
     * List of all available spaces
     */
    spaces: ProxySpace[];
    /**
     * Current authenticated user ID (for routing/validation)
     */
    authUser?: string | number;
    /**
     * Callback when a space is selected
     */
    onSpaceSelect: (space: ProxySpace) => void;
    /**
     * Optional: Provide if you want to override internal API calls
     */
    api?: SpaceSelectorApi;
    /**
     * Class name for the trigger button
     */
    className?: string;
    /**
     * Whether the sidebar is expanded (visual mode)
     */
    isExpanded?: boolean;
}
interface SpaceSelectorApi {
    createSpace: (name: string) => Promise<ProxySpace>;
    deleteSpace: (id: string) => Promise<void>;
    renameSpace: (id: string, name: string) => Promise<void>;
    fetchMembers: (spaceId: string) => Promise<Member[]>;
    fetchInvitations: (spaceId: string) => Promise<Invitation[]>;
    inviteMembers: (spaceId: string, emails: string[], role: MemberRole) => Promise<void>;
    removeMember: (spaceId: string, memberId: string) => Promise<void>;
    updateMemberRole: (spaceId: string, memberId: string, role: MemberRole, email: string) => Promise<void>;
    revokeInvitation: (spaceId: string, inviteId: string) => Promise<void>;
    resendInvitation: (spaceId: string, inviteId: string) => Promise<void>;
    getInviteLink: (spaceId: string, inviteId: string) => Promise<string>;
    fetchStats: () => Promise<{
        screens: number;
        licenses: number;
    }>;
}

interface SpaceBrowserClasses {
    className?: string;
    internalContainerStyle?: string;
    searchStyle?: string;
    spacesContainerStyle?: string;
    spaceCardStyle?: string;
}
interface SpaceBrowserProps {
    browserClassNames?: SpaceBrowserClasses;
    isLoading?: boolean;
    error?: string | null;
    onFail?: () => void;
}
declare const SpaceBrowser: (props: SpaceBrowserProps) => React__default.JSX.Element;

interface MembersManagerProps {
    /** The space to invite members into */
    spaceId: string;
    /** API implementation provided by the library consumer */
    api?: Pick<SpaceSelectorApi, "inviteMembers">;
    /** Pre-fill a specific email address */
    initialEmail?: string;
    /** Pre-select a specific role */
    initialRole?: MemberRole;
    /** Called after invitations are sent successfully */
    onSuccess?: () => void;
    /** Called when the user clicks Cancel */
    onCancel?: () => void;
}
/**
 * MembersManager
 *
 * A fully self-contained member-invitation UI.
 * It does NOT depend on the SpaceSelectorContext and can be embedded
 * anywhere — inside a modal, a sidebar panel, a settings page, etc.
 */
declare const MembersManager: ({ spaceId, api: apiProp, initialEmail, initialRole, onSuccess, onCancel, }: MembersManagerProps) => React__default.JSX.Element | null;

interface SpaceSelectorProps {
    spaces: ProxySpace[];
    activeSpace: ProxySpace | undefined;
    onSpaceSelect: (space: ProxySpace) => void;
    api?: SpaceSelectorApi;
    authUser?: string | number;
    isExpanded?: boolean;
    className?: string;
    onRefreshSpaces?: () => void | Promise<void>;
    showtype?: "DropDown" | "Browser" | "SpaceManager";
    browserClassNames?: SpaceBrowserClasses;
    isLoading?: boolean;
    error?: string | null;
    onFail?: () => void;
    MembersManager?: MembersManagerProps;
}
declare const SpaceSelector: (props: SpaceSelectorProps) => React$1.JSX.Element;

interface SpaceSelectorContextType {
    activeSpace: ProxySpace | undefined;
    spaces: ProxySpace[];
    isExpanded: boolean;
    setActiveSpace: (space: ProxySpace) => void;
    refreshSpaces: () => void | Promise<void>;
    activeModal: string | null;
    setModal: (modal: string | null) => void;
    modalProps: any;
    setModalProps: Dispatch<SetStateAction<any>>;
    api?: SpaceSelectorApi;
    authUser?: string | number;
    isLoading?: boolean;
    error?: string | null;
    onFail?: () => void;
}
declare const useOptionalSpaceSelector: () => SpaceSelectorContextType | undefined;
declare const useSpaceSelector: () => SpaceSelectorContextType;
interface SpaceSelectorProviderProps {
    children: ReactNode;
    activeSpace: ProxySpace | undefined;
    spaces: ProxySpace[];
    onSpaceSelect: (space: ProxySpace) => void;
    onRefreshSpaces?: () => void | Promise<void>;
    authUser?: string | number;
    api?: SpaceSelectorApi;
    isExpanded?: boolean;
    isLoading?: boolean;
    error?: string | null;
    onFail?: () => void;
}
declare const SpaceSelectorProvider: ({ children, activeSpace, spaces, onSpaceSelect, onRefreshSpaces, authUser, api, isExpanded, isLoading, error, onFail, }: SpaceSelectorProviderProps) => React__default.JSX.Element;

declare const createSpaceSelectorApi: (client: any) => SpaceSelectorApi;

interface MembersAndNumbersProps {
    spaceId: string;
    spaceName?: string;
    api?: SpaceSelectorApi;
    isOpen?: boolean;
    onRefreshSpaces?: () => void | Promise<void>;
    onSpaceNameChange?: (spaceName: string) => void;
}
declare const MembersAndNumbers: ({ spaceId, spaceName, api, isOpen, onRefreshSpaces, onSpaceNameChange, }: MembersAndNumbersProps) => React$1.JSX.Element | null;

interface ErrorStateProps {
    /** Short description text shown below the icon */
    message: string;
    /** Optional heading — defaults to "Couldn't load data" */
    title?: string;
    /** Called when the user clicks the retry button. If omitted the button is hidden. */
    onRetry?: () => void;
    /** Label for the retry button — defaults to "Try again" */
    retryLabel?: string;
}
declare const ErrorState: ({ message, title, onRetry, retryLabel, }: ErrorStateProps) => React__default.JSX.Element;

type TabId = "Assets" | "Links" | "Apps" | "Sequences" | "Layout" | "Channels" | "Canvas";
interface Folder$1 {
    id: string;
    name: string;
    parent_id?: string | null;
    assets_count?: number;
}
interface Asset$1 {
    uuid: string;
    name: string;
    type: "image" | "video" | "document" | "link";
    is_ready: boolean;
    created_at: string;
    image?: {
        thumbnail_path: string;
    };
    video?: {
        thumbnail_path: string;
    };
    document?: {
        mime_type: string;
    };
    link?: {
        thumbnail_url?: string;
    };
}
interface CanvasAsset {
    id: number;
    uuid: string;
    name: string;
    type: "canvas";
    is_ready: boolean;
    created_at: string;
    updated_at: string;
    canvas?: any;
    assetable?: any;
}
interface Layout {
    uuid: string;
    name: string;
}
interface Sequence {
    id: string;
    name: string;
    total_duration?: string;
}
interface Channel {
    id: string;
    name: string;
    isPublished?: boolean;
}
interface App {
    id: string;
    name: string;
    icon_url?: string;
}
interface AppInstance {
    id: string;
    name: string;
    app_name: string;
    app_icon_url?: string;
    app_id: string;
    raw?: any;
}
type ContentItem = (Asset$1 & {
    screenable_type?: never;
}) | (Layout & {
    type: "layout";
    screenable_type: "layout";
}) | (Sequence & {
    type: "sequence";
    screenable_type: "sequence";
}) | (Channel & {
    type: "channel";
    screenable_type: "channel";
}) | {
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
} | (CanvasAsset & {
    screenable_type: "asset";
});
interface ContentBrowserApi {
    fetchAssets(folderId?: string | null): Promise<{
        assets: Asset$1[];
        folders: Folder$1[];
    }>;
    fetchLayouts(): Promise<Layout[]>;
    fetchSequences(): Promise<Sequence[]>;
    fetchChannels(): Promise<Channel[]>;
    fetchApps(spaceUuid: string): Promise<App[]>;
    fetchAppInstances(spaceUuid: string, appId: string): Promise<AppInstance[]>;
    fetchCanvasAssets(): Promise<CanvasAsset[]>;
}
interface AddContentModalProps {
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
interface UploadModalProps {
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

declare const AddContentModal: ({ open, onClose, onSelect, api, spaceUuid, allowedTabs, onUploadClick, singleSelect, }: AddContentModalProps) => React__default.JSX.Element;

declare const UploadModal: ({ open, onClose, uploadEndpoint, accessToken, spaceUuid, currentFolderUuid, companionUrl, onUploadComplete, }: UploadModalProps) => React$1.JSX.Element;

declare const createContentBrowserApi: (client: any) => ContentBrowserApi;

interface AssetImagesMap {
    clock: string;
    folder: string;
    pdf: string;
    doc: string;
    ppt: string;
    xls: string;
    videoPlay: string;
    linkFallback: string;
}
declare const DEFAULT_ASSET_IMAGES: AssetImagesMap;

type AssetType = "image" | "video" | "document" | "link" | "app" | "canvas";
type AssetImage = {
    uuid: string;
    mime_type: string;
    original_path?: string;
    compressed_path?: string;
    thumbnail_path?: string;
    size: string;
    created_at: string;
    updated_at: string;
};
type AssetVideo = {
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
type AssetDocument = {
    uuid: string;
    mime_type: string;
    original_path: string;
    size: string;
    created_at: string;
    updated_at: string;
};
type AssetLink = {
    uuid: string;
    thumbnail_url: string;
    url: string;
    is_qr_code: boolean;
    qr_code_position: string;
    created_at: string;
};
type AssetApp = {
    type: string;
    hour?: number;
    minute?: number;
    second?: number;
    countdown_duration?: number;
    config?: {
        duration?: number;
    };
};
type AssetCanvas = {
    id: number;
    uuid: string;
    name: string;
    size: string;
    content: string;
    created_at: string;
    updated_at: string;
};
type Asset = {
    id: string;
    uuid: string;
    folder_id: number | null;
    name: string;
    is_ready: boolean;
    created_at: string;
    updated_at: string;
} & ({
    type: "image";
    image: AssetImage;
} | {
    type: "video";
    video: AssetVideo;
} | {
    type: "document";
    document: AssetDocument;
} | {
    type: "link";
    link: AssetLink;
} | {
    type: "app";
    app: AssetApp;
} | {
    type: "canvas";
    canvas: AssetCanvas;
});
type Folder = {
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
type Path = {
    id: string | null;
    label: string;
};
type LinkDetail = {
    uuid: string;
    url: string;
    thumbnail_url?: string;
    is_qr_code: boolean;
    qr_code_position: string;
    created_at?: string;
    updated_at?: string;
};
type LinkInput = {
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
interface AssetsApi {
    fetchAssetsAndFolders(folderUuid?: string | null): Promise<{
        assets: Asset[];
        folders: Folder[];
    }>;
    /** Flat, folderless listing. Supports the backend `?types=` filter. */
    fetchAssets(params?: {
        types?: AssetType[];
    }): Promise<Asset[]>;
    deleteAssets(uuids: string[]): Promise<void>;
    renameAsset(uuid: string, name: string): Promise<void>;
    moveAssets(uuids: string[], destinationUuid: string | null): Promise<void>;
    downloadAsset(uuid: string): Promise<Blob>;
    createFolder(name: string, parentId: string | null): Promise<Folder>;
    updateFolder(id: string, patch: {
        name?: string;
        parent_id?: string | null;
    }): Promise<void>;
    deleteFolder(id: string): Promise<void>;
    deleteFolders(ids: string[]): Promise<void>;
    downloadFolderContents(id: string): Promise<Blob>;
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
    fetchCanvases(): Promise<Asset[]>;
}
interface AssetsFeatureFlags {
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
interface AssetsUploadConfig {
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
interface AssetsNavigation {
    toLinkNew: () => void;
    toLinkEdit: (uuid: string) => void;
    fromLinksBack: () => void;
}

interface AssetsProviderProps {
    /**
     * Axios-like client carrying Authorization + X-Space-Uuid. The provider
     * builds the standard AssetsApi from it — the zero-config path.
     */
    client?: any;
    /** Full custom api. Overrides `client`; use for spread-and-override setups. */
    api?: AssetsApi;
    /** Scopes the react-query cache; queries are disabled while undefined. */
    spaceUuid: string | undefined;
    features?: AssetsFeatureFlags;
    /**
     * Upload transport. `endpoint` defaults to `${NEXT_PUBLIC_API_URL}/api/tus`
     * and `companionUrl` to `NEXT_PUBLIC_COMPANION_URL`, so most apps only
     * pass `getAccessToken`.
     */
    upload?: Partial<AssetsUploadConfig>;
    /** Required when `features.links` is enabled. */
    navigation?: AssetsNavigation;
    /** Override any of the bundled card/preview images. */
    images?: Partial<AssetImagesMap>;
    /** Defaults to `true` when the app language is Arabic. */
    rtl?: boolean;
    children: React$1.ReactNode;
}
interface AssetsConfig {
    api: AssetsApi;
    spaceUuid: string | undefined;
    features: Required<AssetsFeatureFlags>;
    upload?: AssetsUploadConfig;
    navigation?: AssetsNavigation;
    images: AssetImagesMap;
    rtl: boolean;
}
declare function AssetsProvider({ client, api, spaceUuid, features, upload, navigation, images, rtl, children, }: AssetsProviderProps): React$1.JSX.Element;
declare function useAssetsConfig(): AssetsConfig;
declare function useOptionalAssetsConfig(): AssetsConfig | null;

type AxiosLike = {
    get: (url: string, config?: any) => Promise<any>;
    post: (url: string, body?: any, config?: any) => Promise<any>;
    put: (url: string, body?: any, config?: any) => Promise<any>;
    delete: (url: string, config?: any) => Promise<any>;
};
declare function createAssetsApi(client: AxiosLike): AssetsApi;

/**
 * Video uploads are intentionally extension-restricted to MP4 until the
 * backend compression pipeline can safely normalize other video containers.
 * Consumers whose backend policy differs (e.g. reach allows QuickTime) pass
 * their own list via `AssetsUploadConfig.allowedFileTypes`.
 */
declare const ALLOWED_ASSET_UPLOAD_FILE_TYPES: readonly ["image/png", "image/jpeg", "image/jpg", "image/gif", ".mp4", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
interface UploadMessages {
    fileUploadedSuccessfully: string;
    filesWillAppear: string;
    pleaseTryAgain: string;
    processingUploads: string;
    uploadFailed: string;
}
interface CreateAssetUploaderOptions {
    accessToken: string;
    companionUrl: string;
    currentFolderUuid?: string;
    messages: UploadMessages;
    onClose: () => void;
    onUploadComplete: () => void;
    spaceUuid: string;
    uploadEndpoint: string;
    maxFileSize?: number;
    allowedFileTypes?: string[];
}
/**
 * Creates the configured asset uploader used by the upload modal.
 *
 * Keeping restrictions and transport configuration together ensures local,
 * Dropbox, and Google Drive selections all follow the same upload policy.
 */
declare function createAssetUploader({ accessToken, companionUrl, currentFolderUuid, messages, onClose, onUploadComplete, spaceUuid, uploadEndpoint, maxFileSize, allowedFileTypes, }: CreateAssetUploaderOptions): Uppy;

type AssetsTab = "all" | "media" | "document" | "link";
type AssetsViewType = "grid" | "list" | "grid-list";
interface AssetsStoreState {
    path: Path[];
    setPath: (value: Path[]) => void;
    addPath: (value: Path) => void;
    activeTab: AssetsTab;
    setActiveTab: (value: AssetsTab) => void;
    viewType: AssetsViewType;
    setViewType: (value: AssetsViewType) => void;
    activeDirectory: Folder | null;
    setActiveDirectory: (value: Folder | null) => void;
    renamingItemId: string | null;
    setRenamingItemId: (value: string | null) => void;
    reset: () => void;
}
declare const useAssetsStore: zustand.UseBoundStore<zustand.StoreApi<AssetsStoreState>>;

declare const assetKeys: {
    all: (spaceUuid: string | null | undefined) => readonly ["assets", string];
    list: (spaceUuid: string | null | undefined, folderId: string | null) => readonly ["assets", string, "list", string | null];
};
declare function useAssetsQuery(folderId: string | null, options?: {
    enabled?: boolean;
}): _tanstack_react_query.UseQueryResult<{
    assets: Asset[];
    folders: Folder[];
}, Error>;
declare function useDeleteAssetMutation(folderId: string | null): _tanstack_react_query.UseMutationResult<void, Error, string[], {
    previousData: unknown;
}>;
declare function useCreateFolderMutation(folderId: string | null): _tanstack_react_query.UseMutationResult<Folder, Error, {
    name: string;
    parentId: string | null;
}, {
    previousData: unknown;
}>;
declare function useDeleteFolderMutation(folderId: string | null): _tanstack_react_query.UseMutationResult<void, Error, string, {
    previousData: unknown;
}>;
declare function useBulkDeleteFoldersMutation(folderId: string | null): _tanstack_react_query.UseMutationResult<void, Error, string[], unknown>;
declare function useRenameAssetMutation(folderId: string | null): _tanstack_react_query.UseMutationResult<void, Error, {
    id: string;
    name: string;
}, unknown>;
declare function useRenameFolderMutation(folderId: string | null): _tanstack_react_query.UseMutationResult<void, Error, {
    id: string;
    name: string;
    parentId: string | null;
}, unknown>;
declare function useMoveAssetMutation(folderId: string | null): _tanstack_react_query.UseMutationResult<{
    destinationId: string | null;
}, Error, {
    uuids: string[];
    destinationId: string | null;
}, unknown>;
declare function useMoveFolderMutation(folderId: string | null): _tanstack_react_query.UseMutationResult<{
    parentId: string | null;
}, Error, {
    id: string;
    parentId: string | null;
}, unknown>;

interface UseLazyLoadingOptions {
    itemsPerBatch?: number;
    rootMargin?: string;
    threshold?: number;
}
interface UseLazyLoadingReturn<T> {
    visibleItems: T[];
    loadingMore: boolean;
    hasMore: boolean;
    loadMore: () => void;
    reset: () => void;
    observerRef: React.RefObject<HTMLDivElement | null>;
}
declare function useLazyLoading<T>(items: T[], options?: UseLazyLoadingOptions): UseLazyLoadingReturn<T>;

interface AssetsBrowserProps {
    className?: string;
    /**
     * Reports the localized page title so the consumer can surface it in its
     * own topbar (signage renders it in a custom topbar component).
     */
    onTitleChange?: (title: string) => void;
    /** Consumer-public empty state illustrations per tab. */
    emptyStateImages?: Partial<Record<"media" | "document" | "link", string>>;
    /** Extra per-asset action buttons (e.g. signage's "send to screen"). */
    renderAssetActions?: (asset: Asset) => React__default.ReactNode;
    /** Extra folder dropdown menu items (e.g. signage's "create sequence"). */
    renderFolderMenuItems?: (folder: Folder) => React__default.ReactNode;
}
declare const AssetsBrowser: ({ className, onTitleChange, emptyStateImages, renderAssetActions, renderFolderMenuItems, }: AssetsBrowserProps) => React__default.JSX.Element;

interface AssetsTabbarProps {
    className?: string;
    sticky?: boolean;
}
declare const AssetsTabbar: ({ className, sticky }: AssetsTabbarProps) => React__default.JSX.Element;

interface AssetsPathProps {
    className?: string;
}
/**
 * Responsive breadcrumb component for the assets module. Reads the shared
 * breadcrumb path from the assets store.
 */
declare const AssetsPath: React__default.FC<AssetsPathProps>;

interface AssetsUploadModalProps {
    open: boolean;
    onClose: () => void;
    /** Override the destination folder; defaults to the browser's current folder. */
    folderUuid?: string | null;
    /** Called after a successful upload batch, in addition to query invalidation. */
    onUploadComplete?: () => void;
}
/**
 * Controlled upload modal. All transport configuration (endpoint, token,
 * space, restrictions) comes from the AssetsProvider's `upload` config, so
 * consumers can also mount this outside the assets browser (e.g. reach's
 * email-builder flow) with just `open`/`onClose`.
 */
declare function AssetsUploadModal({ open, onClose, folderUuid, onUploadComplete, }: AssetsUploadModalProps): React__default.JSX.Element | null;

interface LinkEditorTitleInfo {
    title: string;
    subtitle: string;
    isLoading: boolean;
}
type LinkEditorProps = ({
    mode: "create";
} | {
    mode: "edit";
    linkUuid: string;
}) & {
    className?: string;
    /**
     * Reports the page title (link name + created-at line) so the consumer can
     * surface it in its own topbar/header chrome.
     */
    onTitleChange?: (info: LinkEditorTitleInfo) => void;
};
/**
 * Page-content component for the link create/edit flows. Consumers render it
 * from their own route shells (e.g. signage's `assets/links/[id]/page.tsx`)
 * and provide navigation via the AssetsProvider's `navigation` config —
 * saving or cancelling calls `navigation.fromLinksBack()` in create mode.
 */
declare const LinkEditor: (props: LinkEditorProps) => React__default.JSX.Element;

interface SidebarNavItem$1 {
    id: string;
    label: string;
    icon: ReactNode;
    /** Renders a link (via `LinkComponent`). Mutually exclusive with `onSelect`. */
    href?: string;
    /** Renders a button. */
    onSelect?: () => void;
    active?: boolean;
    /** Small pill shown after the label, e.g. "Soon". */
    badge?: string;
    disabled?: boolean;
    /**
     * Replaces the default grey hover surface, e.g. `hover:bg-[#305DFD]/10`
     * for a tool whose icon carries its own colour. The icon also lifts on hover.
     */
    accentClassName?: string;
    /**
     * Collapsed rail only: paint the whole control with this class (a tool's
     * colour) so it matches the active-item footprint, and show
     * `collapsedIcon` (the white glyph, sized like every other rail icon)
     * instead of `icon`.
     */
    collapsedFillClassName?: string;
    collapsedIcon?: ReactNode;
}
interface SidebarNavGroup {
    id: string;
    /** Uppercase section label; hidden when the rail is collapsed. */
    label?: string;
    items: SidebarNavItem$1[];
    /** Draw a hairline above this group (used for the tools section). */
    dividerAbove?: boolean;
}
interface SidebarLinkProps {
    href: string;
    className?: string;
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    "aria-current"?: "page";
}
/** Injected so the core never imports next/link (or any router). */
type SidebarLinkComponent = ComponentType<SidebarLinkProps>;
type SidebarDirection = "ltr" | "rtl";

/** Every clickable rail control shares this footprint. */
declare const RAIL_CONTROL = "size-9 rounded-[10px]";
interface SidebarShellProps {
    collapsed: boolean;
    dir?: SidebarDirection;
    /** Logo row, toggle, etc. Rendered above the scrollable body. */
    header?: ReactNode;
    /** Scrollable middle: navigation, selectors. */
    children: ReactNode;
    /** Pinned to the bottom: credits, account. */
    footer?: ReactNode;
    className?: string;
}
/**
 * The sidebar frame. Owns background, border, padding and the
 * header / scroll body / footer stacking; knows nothing about routes.
 * Width is the parent's job (e.g., CSS variable or width utility).
 * The same `gap-3` separates header, body sections and footer so the rhythm
 * is identical at every root font-size.
 */
declare function SidebarShell({ collapsed, dir, header, children, footer, className, }: SidebarShellProps): React$1.JSX.Element;
interface SidebarToggleProps {
    collapsed: boolean;
    onToggle: () => void;
    /** Accessible name, e.g. "Collapse sidebar" / "Expand sidebar". */
    label: string;
    dir?: SidebarDirection;
    className?: string;
}
/** Panel-toggle button for the expanded header (inline icon, no icon-library dependency). */
declare function SidebarToggle({ collapsed, onToggle, label, dir, className, }: SidebarToggleProps): React$1.JSX.Element;
interface SidebarBrandToggleProps {
    /** The brand mark shown at rest (collapsed rail). */
    mark: ReactNode;
    onToggle: () => void;
    label: string;
    dir?: SidebarDirection;
    className?: string;
}
/**
 * Collapsed-rail header: the brand mark and the expand control are one
 * button — the mark shows at rest and cross-fades into the panel icon on
 * hover/focus; clicking expands the sidebar.
 */
declare function SidebarBrandToggle({ mark, onToggle, label, dir, className, }: SidebarBrandToggleProps): React$1.JSX.Element;

interface SidebarNavProps {
    groups: SidebarNavGroup[];
    collapsed: boolean;
    dir?: SidebarDirection;
    LinkComponent?: SidebarLinkComponent;
    className?: string;
}
declare function SidebarNav({ groups, collapsed, dir, LinkComponent, className, }: SidebarNavProps): React$1.JSX.Element;

interface SidebarNavItemProps {
    item: SidebarNavItem$1;
    collapsed: boolean;
    dir?: SidebarDirection;
    LinkComponent?: SidebarLinkComponent;
}
/** Hover surface shared by rows and their collapsed tooltips. */
declare const RAIL_HOVER = "bg-neutral-100 dark:bg-zinc-800";
/** One nav row. A single class list serves both the expanded and collapsed rail. */
declare function SidebarNavItem({ item, collapsed, dir, LinkComponent, }: SidebarNavItemProps): React$1.JSX.Element;

interface SidebarCreditsCardProps {
    collapsed: boolean;
    /** e.g. "Credits remaining" */
    label: string;
    /** Swapped in on hover when expanded; the action button label when collapsed. */
    hoverLabel?: string;
    /** Formatted value, e.g. "1,250". */
    value: string;
    /** 0–100 fill for the progress bar; omit to hide the bar. */
    percent?: number | null;
    icon: ReactNode;
    onClick?: () => void;
    dir?: SidebarDirection;
    className?: string;
}
declare function SidebarCreditsCard({ collapsed, label, hoverLabel, value, percent, icon, onClick, dir, className, }: SidebarCreditsCardProps): React$1.JSX.Element;

declare const buttonVariants: (props?: ({
    variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

declare function Skeleton({ className, ...props }: React__default.HTMLAttributes<HTMLDivElement>): React__default.JSX.Element;

declare const Card: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardDescription: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardContent: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;

declare const Avatar: React$1.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarProps & React$1.RefAttributes<HTMLSpanElement>, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
declare const AvatarImage: React$1.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarImageProps & React$1.RefAttributes<HTMLImageElement>, "ref"> & React$1.RefAttributes<HTMLImageElement>>;
declare const AvatarFallback: React$1.ForwardRefExoticComponent<Omit<AvatarPrimitive.AvatarFallbackProps & React$1.RefAttributes<HTMLSpanElement>, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;

declare const Checkbox: React$1.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare const Dialog: React$1.FC<DialogPrimitive.DialogProps>;
declare const DialogTrigger: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React$1.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DialogOverlay: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DialogContent: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    overlayClassName?: string;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): React$1.JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): React$1.JSX.Element;
    displayName: string;
};
declare const DialogTitle: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React$1.RefAttributes<HTMLHeadingElement>, "ref"> & React$1.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>, "ref"> & React$1.RefAttributes<HTMLParagraphElement>>;

declare const Drawer: {
    ({ shouldScaleBackground, ...props }: React$1.ComponentProps<typeof Drawer$1.Root>): React$1.JSX.Element;
    displayName: string;
};
declare const DrawerTrigger: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DrawerPortal: typeof vaul.Portal;
declare const DrawerClose: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DrawerOverlay: React$1.ForwardRefExoticComponent<Omit<Omit<DialogPrimitive.DialogOverlayProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DrawerContent: React$1.ForwardRefExoticComponent<Omit<Omit<DialogPrimitive.DialogContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DrawerHeader: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): React$1.JSX.Element;
    displayName: string;
};
declare const DrawerFooter: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLDivElement>): React$1.JSX.Element;
    displayName: string;
};
declare const DrawerTitle: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React$1.RefAttributes<HTMLHeadingElement>, "ref"> & React$1.RefAttributes<HTMLHeadingElement>>;
declare const DrawerDescription: React$1.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>, "ref"> & React$1.RefAttributes<HTMLParagraphElement>>;

declare const DropdownMenu: React$1.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: React$1.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
declare const DropdownMenuSub: React$1.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: React$1.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubTrigger: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSubContent: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuContent: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuCheckboxItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuRadioItem: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuLabel: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuSeparator: React$1.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuShortcut: {
    ({ className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): React$1.JSX.Element;
    displayName: string;
};

declare const Input: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref"> & React$1.RefAttributes<HTMLInputElement>>;

declare const Label: React$1.ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & React$1.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: class_variance_authority_types.ClassProp | undefined) => string> & React$1.RefAttributes<HTMLLabelElement>>;

declare const Select: React$1.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React$1.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React$1.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React$1.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const SelectScrollUpButton: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectScrollDownButton: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectContent: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const Switch: React$1.ForwardRefExoticComponent<Omit<SwitchPrimitives.SwitchProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

declare const TooltipProvider: React$1.FC<TooltipPrimitive.TooltipProviderProps>;
declare const Tooltip: React$1.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTrigger: React$1.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const TooltipContent: React$1.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare function cn(...inputs: ClassValue[]): string;
declare function cx(...args: ClassValue[]): string;

export { ALLOWED_ASSET_UPLOAD_FILE_TYPES, AddContentModal, type AddContentModalProps, type App, type AppInstance, type Asset, type AssetApp, type AssetCanvas, type AssetDocument, type AssetImage, type AssetImagesMap, type AssetLink, type AssetType, type AssetVideo, type AssetsApi, AssetsBrowser, type AssetsBrowserProps, type AssetsConfig, type AssetsFeatureFlags, type AssetsNavigation, AssetsPath, AssetsProvider, type AssetsProviderProps, type AssetsTab, AssetsTabbar, type AssetsUploadConfig, AssetsUploadModal, type AssetsUploadModalProps, type AssetsViewType, Avatar, AvatarFallback, AvatarImage, Button, type ButtonProps, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, type Channel, Checkbox, type Asset$1 as ContentAsset, type ContentBrowserApi, type Folder$1 as ContentFolder, type ContentItem, DEFAULT_ASSET_IMAGES, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger, Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger, DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, ErrorState, type ErrorStateProps, type Folder, Input, type Invitation, Label, type Layout, type LinkDetail, LinkEditor, type LinkEditorProps, type LinkEditorTitleInfo, type LinkInput, type Member, type MemberRole, MembersAndNumbers, type MembersAndNumbersProps, MembersManager, type MembersManagerProps, type Path, ProductSwitcher, type ProxySpace, RAIL_CONTROL, RAIL_HOVER, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue, type Sequence, SidebarBrandToggle, type SidebarBrandToggleProps, SidebarCreditsCard, type SidebarCreditsCardProps, type SidebarDirection, type SidebarLinkComponent, type SidebarLinkProps, SidebarNav, type SidebarNavGroup, SidebarNavItem, type SidebarNavItem$1 as SidebarNavItemModel, type SidebarNavItemProps, type SidebarNavProps, SidebarShell, type SidebarShellProps, SidebarToggle, type SidebarToggleProps, Skeleton, SpaceBrowser, type SpaceBrowserProps, type SpaceFeature, SpaceSelector, type SpaceSelectorApi, type SpaceSelectorProps$1 as SpaceSelectorProps, SpaceSelectorProvider, Switch, type TabId, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, UploadModal, type UploadModalProps, UserAccount, assetKeys, buttonVariants, cn, createAssetUploader, createAssetsApi, createContentBrowserApi, createSpaceSelectorApi, cx, useAssetsConfig, useAssetsQuery, useAssetsStore, useBulkDeleteFoldersMutation, useCreateFolderMutation, useDeleteAssetMutation, useDeleteFolderMutation, useLazyLoading, useMoveAssetMutation, useMoveFolderMutation, useOptionalAssetsConfig, useOptionalSpaceSelector, useRenameAssetMutation, useRenameFolderMutation, useSpaceSelector };
