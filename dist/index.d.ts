import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';

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

interface SpaceSelectorProps {
    spaces: ProxySpace[];
    activeSpace: ProxySpace | undefined;
    onSpaceSelect: (space: ProxySpace) => void;
    api?: SpaceSelectorApi;
    authUser?: string | number;
    isExpanded?: boolean;
    className?: string;
    onRefreshSpaces?: () => void;
    showtype?: "DropDown" | "Browser" | "SpaceManager";
    browserClassNames?: SpaceBrowserClasses;
    isLoading?: boolean;
    error?: string | null;
    onFail?: () => void;
}
declare const SpaceSelector: (props: SpaceSelectorProps) => react_jsx_runtime.JSX.Element;

interface SpaceSelectorContextType {
    activeSpace: ProxySpace | undefined;
    spaces: ProxySpace[];
    isExpanded: boolean;
    setActiveSpace: (space: ProxySpace) => void;
    refreshSpaces: () => void;
    activeModal: string | null;
    setModal: (modal: string | null) => void;
    modalProps: any;
    setModalProps: (props: any) => void;
    api?: SpaceSelectorApi;
    authUser?: string | number;
    isLoading?: boolean;
    error?: string | null;
    onFail?: () => void;
}
declare const useSpaceSelector: () => SpaceSelectorContextType;
interface SpaceSelectorProviderProps {
    children: ReactNode;
    activeSpace: ProxySpace | undefined;
    spaces: ProxySpace[];
    onSpaceSelect: (space: ProxySpace) => void;
    onRefreshSpaces?: () => void;
    authUser?: string | number;
    api?: SpaceSelectorApi;
    isExpanded?: boolean;
    isLoading?: boolean;
    error?: string | null;
    onFail?: () => void;
}
declare const SpaceSelectorProvider: ({ children, activeSpace, spaces, onSpaceSelect, onRefreshSpaces, authUser, api, isExpanded, isLoading, error, onFail, }: SpaceSelectorProviderProps) => react_jsx_runtime.JSX.Element;

declare const createSpaceSelectorApi: (client: any) => SpaceSelectorApi;

interface MembersManagerProps {
    /** The space to invite members into */
    spaceId: string;
    /** API implementation provided by the library consumer */
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
declare const MembersManager: ({ spaceId, initialEmail, initialRole, onSuccess, onCancel, }: MembersManagerProps) => react_jsx_runtime.JSX.Element | null;

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
declare const ErrorState: ({ message, title, onRetry, retryLabel }: ErrorStateProps) => react_jsx_runtime.JSX.Element;

export { ErrorState, type ErrorStateProps, type Invitation, type Member, type MemberRole, MembersManager, type MembersManagerProps, ProductSwitcher, type ProxySpace, SpaceBrowser, type SpaceBrowserProps, type SpaceFeature, SpaceSelector, type SpaceSelectorApi, type SpaceSelectorProps$1 as SpaceSelectorProps, SpaceSelectorProvider, UserAccount, createSpaceSelectorApi, useSpaceSelector };
