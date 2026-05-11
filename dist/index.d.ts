import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode, Dispatch, SetStateAction } from 'react';

interface ProductSwitcherProps {
    auth_user: number | string;
    profileImage?: string;
    profileName?: string;
}
declare const ProductSwitcher: ({ auth_user, profileImage, profileName, }: ProductSwitcherProps) => react_jsx_runtime.JSX.Element | null;

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
declare const UserAccount: ({ accounts, isExpanded, auth_user, }: UserAccountProps) => react_jsx_runtime.JSX.Element | null;

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
declare const SpaceBrowser: (props: SpaceBrowserProps) => react_jsx_runtime.JSX.Element;

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
declare const MembersManager: ({ spaceId, api: apiProp, initialEmail, initialRole, onSuccess, onCancel, }: MembersManagerProps) => react_jsx_runtime.JSX.Element | null;

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
declare const SpaceSelector: (props: SpaceSelectorProps) => react_jsx_runtime.JSX.Element;

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
declare const SpaceSelectorProvider: ({ children, activeSpace, spaces, onSpaceSelect, onRefreshSpaces, authUser, api, isExpanded, isLoading, error, onFail, }: SpaceSelectorProviderProps) => react_jsx_runtime.JSX.Element;

declare const createSpaceSelectorApi: (client: any) => SpaceSelectorApi;

interface MembersAndNumbersProps {
    spaceId: string;
    spaceName?: string;
    api?: SpaceSelectorApi;
    isOpen?: boolean;
    onRefreshSpaces?: () => void | Promise<void>;
    onSpaceNameChange?: (spaceName: string) => void;
}
declare const MembersAndNumbers: ({ spaceId, spaceName, api, isOpen, onRefreshSpaces, onSpaceNameChange, }: MembersAndNumbersProps) => react_jsx_runtime.JSX.Element | null;

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
declare const ErrorState: ({ message, title, onRetry, retryLabel, }: ErrorStateProps) => react_jsx_runtime.JSX.Element;

type TabId = "Assets" | "Links" | "Apps" | "Sequences" | "Layout" | "Channels";
interface Folder {
    id: string;
    name: string;
    parent_id?: string | null;
    assets_count?: number;
}
interface Asset {
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
type ContentItem = (Asset & {
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
};
interface ContentBrowserApi {
    fetchAssets(folderId?: string | null): Promise<{
        assets: Asset[];
        folders: Folder[];
    }>;
    fetchLayouts(): Promise<Layout[]>;
    fetchSequences(): Promise<Sequence[]>;
    fetchChannels(): Promise<Channel[]>;
    fetchApps(spaceUuid: string): Promise<App[]>;
    fetchAppInstances(spaceUuid: string, appId: string): Promise<AppInstance[]>;
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

declare const AddContentModal: ({ open, onClose, onSelect, api, spaceUuid, allowedTabs, onUploadClick, singleSelect, }: AddContentModalProps) => react_jsx_runtime.JSX.Element;

declare const UploadModal: ({ open, onClose, uploadEndpoint, accessToken, spaceUuid, currentFolderUuid, companionUrl, onUploadComplete, }: UploadModalProps) => react_jsx_runtime.JSX.Element;

declare const createContentBrowserApi: (client: any) => ContentBrowserApi;

export { AddContentModal, type AddContentModalProps, type App, type AppInstance, type Asset, type Channel, type ContentBrowserApi, type ContentItem, ErrorState, type ErrorStateProps, type Folder, type Invitation, type Layout, type Member, type MemberRole, MembersAndNumbers, type MembersAndNumbersProps, MembersManager, type MembersManagerProps, ProductSwitcher, type ProxySpace, type Sequence, SpaceBrowser, type SpaceBrowserProps, type SpaceFeature, SpaceSelector, type SpaceSelectorApi, type SpaceSelectorProps$1 as SpaceSelectorProps, SpaceSelectorProvider, type TabId, UploadModal, type UploadModalProps, UserAccount, createContentBrowserApi, createSpaceSelectorApi, useOptionalSpaceSelector, useSpaceSelector };
