
export type MemberRole = "owner" | "manager" | "editor" | "viewer";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  imageURL?: string;
  image?: string;
  avatar?: string;
  avatar_url?: string;
  joinedAt?: string;
}

export interface Invitation {
  id: string;
  email: string;
  role: MemberRole;
  status: "pending" | "accepted";
  createdAt: string;
}

export interface SpaceFeature {
  id: string;
  label: string;
  available: boolean;
}

export interface ProxySpace {
  space_uuid: string; // The backend ID
  proxyId: string;    // The visible ID (often same as UUID or slug)
  name: string;
  role?: string;
  total_members?: number;
  totalMembers?: number;
  members_count?: number;
  member_count?: number;
  memberCount?: number;
  members?: unknown[];
  features?: SpaceFeature[];
  uuid?: string; // Sometimes used interchangeably
  avatar?: string;
  image?: string;
  image_url?: string;
  icon?: string;
  last_used_at?: string | number | null;
}

export interface SpaceSelectorProps {
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
   * Optional custom class name applied directly to the space selector trigger
   */
  triggerClassName?: string;

  /**
   * Whether the sidebar is expanded (visual mode)
   */
  isExpanded?: boolean;
}

export interface SpaceSelectorApi {
  createSpace: (name: string, image?: File | string | null) => Promise<ProxySpace>;
  deleteSpace: (id: string) => Promise<void>;
  renameSpace: (id: string, name: string, image?: File | string | null) => Promise<void>;
  updateSpace?: (id: string, data: { name?: string; image?: File | string | null }) => Promise<void>;
  fetchMembers: (spaceId: string) => Promise<Member[]>;
  fetchInvitations: (spaceId: string) => Promise<Invitation[]>;
  inviteMembers: (spaceId: string, emails: string[], role: MemberRole) => Promise<void>;
  removeMember: (spaceId: string, memberId: string) => Promise<void>;
  updateMemberRole: (spaceId: string, memberId: string, role: MemberRole, email: string) => Promise<void>;
  revokeInvitation: (spaceId: string, inviteId: string) => Promise<void>;
  resendInvitation: (spaceId: string, inviteId: string) => Promise<void>;
  getInviteLink: (spaceId: string, inviteId: string) => Promise<string>;
  fetchStats: () => Promise<{ screens: number; licenses: number }>;
}
