import {
  EyeIcon,
  PencilEdit01Icon,
  Shield01Icon,
  User02Icon,
} from "@hugeicons/core-free-icons";

import type { MemberRole } from "../space-selector/types";

type RoleLabelKey<Role extends MemberRole> = `roles.${Role}`;
type RoleDescriptionKey<Role extends MemberRole> =
  `membersManager.roles.${Role}.description`;
type RoleShortDescriptionKey<Role extends MemberRole> =
  `membersManager.roles.${Role}.shortDescription`;

export interface MemberRoleDefinition<Role extends MemberRole = MemberRole> {
  value: Role;
  labelKey: RoleLabelKey<Role>;
  descriptionKey: RoleDescriptionKey<Role>;
  shortDescriptionKey: RoleShortDescriptionKey<Role>;
  triggerIcon: typeof User02Icon;
  menuIcon: typeof User02Icon;
}

export const MEMBER_ROLE_DEFINITIONS: Record<MemberRole, MemberRoleDefinition> = {
  viewer: {
    value: "viewer",
    labelKey: "roles.viewer",
    descriptionKey: "membersManager.roles.viewer.description",
    shortDescriptionKey: "membersManager.roles.viewer.shortDescription",
    triggerIcon: User02Icon,
    menuIcon: EyeIcon,
  },
  editor: {
    value: "editor",
    labelKey: "roles.editor",
    descriptionKey: "membersManager.roles.editor.description",
    shortDescriptionKey: "membersManager.roles.editor.shortDescription",
    triggerIcon: PencilEdit01Icon,
    menuIcon: PencilEdit01Icon,
  },
  manager: {
    value: "manager",
    labelKey: "roles.manager",
    descriptionKey: "membersManager.roles.manager.description",
    shortDescriptionKey: "membersManager.roles.manager.shortDescription",
    triggerIcon: Shield01Icon,
    menuIcon: Shield01Icon,
  },
  owner: {
    value: "owner",
    labelKey: "roles.owner",
    descriptionKey: "membersManager.roles.owner.description",
    shortDescriptionKey: "membersManager.roles.owner.shortDescription",
    triggerIcon: Shield01Icon,
    menuIcon: Shield01Icon,
  },
};

export const DEFAULT_MEMBER_ROLE_OPTIONS = [
  "viewer",
  "editor",
  "manager",
] as const satisfies MemberRole[];

export const getMemberRoleDefinition = (role: MemberRole) =>
  MEMBER_ROLE_DEFINITIONS[role];

export const getMemberRoleDefinitions = (
  roles: readonly MemberRole[] = DEFAULT_MEMBER_ROLE_OPTIONS,
) => roles.map((role) => getMemberRoleDefinition(role));
