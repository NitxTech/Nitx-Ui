"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HugeiconsIcon } from "@hugeicons/react";
import { Key01Icon, Tv01Icon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";

import type {
  Invitation,
  Member,
  MemberRole,
  SpaceSelectorApi,
} from "../space-selector/types";
import ManageMembersModal from "../space-selector/components/modals/ManageMembersModal";

import {
  InvitationsTable,
  MembersAndNumbersLayout,
  MembersEmptyState,
  MembersTable,
  MembersTabContent,
  RemoveMemberDialog,
  SettingsTabContent,
  type MembersAndNumbersTab,
  type StatCardProps,
} from "./MembersAndNumbersParts";

export interface MembersAndNumbersProps {
  spaceId: string;
  spaceName?: string;
  api?: SpaceSelectorApi;
  isOpen?: boolean;
  onRefreshSpaces?: () => void;
  onSpaceNameChange?: (spaceName: string) => void;
}

const MembersAndNumbers = ({
  spaceId,
  spaceName,
  api,
  isOpen = true,
  onRefreshSpaces,
  onSpaceNameChange,
}: MembersAndNumbersProps) => {
  const { t } = useTranslation("modals");

  const [activeTab, setActiveTab] = useState<MembersAndNumbersTab>("members");
  const [licenseCount, setLicenseCount] = useState(0);
  const [screensCount, setScreensCount] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [invitesCurrentPage, setInvitesCurrentPage] = useState(1);
  const [invitesRowsPerPage, setInvitesRowsPerPage] = useState(5);
  const [settingsSpaceName, setSettingsSpaceName] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    if (spaceName) {
      setSettingsSpaceName(spaceName);
    }
  }, [spaceName]);

  const fetchData = async () => {
    if (!spaceId || !api) return;

    setLoading(true);
    try {
      const [membersData, invitationsData] = await Promise.all([
        api.fetchMembers(spaceId),
        api.fetchInvitations(spaceId),
      ]);

      setMembers(membersData || []);
      setInvitations(invitationsData || []);

      if (api.fetchStats) {
        const stats = await api.fetchStats();
        setScreensCount(stats.screens);
        setLicenseCount(stats.licenses);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && spaceId) {
      fetchData();
    }
  }, [api, isOpen, spaceId]);

  if (!isOpen || !spaceId || !api) return null;

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const totalInvitePages = Math.ceil(invitations.length / invitesRowsPerPage);
  const paginatedInvitations = invitations.slice(
    (invitesCurrentPage - 1) * invitesRowsPerPage,
    invitesCurrentPage * invitesRowsPerPage,
  );

  const handleUpdateSpace = async () => {
    if (!spaceId || !settingsSpaceName.trim() || !api) return;

    setSavingSettings(true);
    try {
      await api.renameSpace(spaceId, settingsSpaceName);
      onRefreshSpaces?.();
      onSpaceNameChange?.(settingsSpaceName);
      toast.success(t("renameSpaceModal.spaceRenamedSuccessfully"));
    } catch (error) {
      toast.error(t("renameSpaceModal.failedToRenameSpace"));
    } finally {
      setSavingSettings(false);
    }
  };

  const handleRolesUpdate = async (memberId: string, newRole: MemberRole) => {
    try {
      const member = members.find((entry) => entry.id === memberId);
      if (!member) return;

      setMembers((prev) =>
        prev.map((entry) =>
          entry.id === memberId ? { ...entry, role: newRole } : entry,
        ),
      );

      await api.updateMemberRole(spaceId, memberId, newRole, member.email);
      toast.success(t("manageMembersModal.role_success"));
    } catch (error) {
      toast.error(t("manageMembersModal.error"));
      fetchData();
    }
  };

  const handleRevokeInvitation = async (invitationId: string) => {
    try {
      setInvitations((prev) => prev.filter((invite) => invite.id !== invitationId));
      await api.revokeInvitation(spaceId, invitationId);
      toast.success("Invitation revoked successfully");
    } catch (error) {
      toast.error("Failed to revoke invitation");
      fetchData();
    }
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard");
  };

  const confirmRemoveMember = async () => {
    if (!memberToRemove) return;

    try {
      setMembers((prev) => prev.filter((member) => member.id !== memberToRemove.id));
      await api.removeMember(spaceId, memberToRemove.id);
      toast.success(t("manageMembersModal.removed"));
      setMemberToRemove(null);
    } catch (error) {
      toast.error(t("manageMembersModal.error_remove"));
      fetchData();
    }
  };

  const handleResendInvitation = async (id: string) => {
    try {
      await api.resendInvitation(spaceId, id);
      toast.success("Invitation resent successfully");
    } catch (error) {
      toast.error("Failed to resend invitation");
    }
  };

  const handleCopyInviteLink = async (invite: Invitation) => {
    try {
      const link = await api.getInviteLink(spaceId, invite.id);
      if (!link) {
        toast.error("Failed to get invite link");
        return;
      }

      await navigator.clipboard.writeText(link);
      toast.success("Invite link copied to clipboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to get invite link");
    }
  };

  const stats: StatCardProps[] = [
    {
      label: "Total Screen",
      value: screensCount,
      icon: <HugeiconsIcon icon={Tv01Icon} className="w-5 h-5" />,
    },
    {
      label: "Total License",
      value: licenseCount,
      icon: <HugeiconsIcon icon={Key01Icon} className="w-5 h-5" />,
    },
    {
      label: "Total Active License",
      value: null,
      icon: <HugeiconsIcon icon={Key01Icon} className="w-5 h-5" />,
    },
    {
      label: "Unused Licenses",
      value: null,
      icon: <HugeiconsIcon icon={Key01Icon} className="w-5 h-5" />,
    },
  ];

  const pendingInvitesContent =
    invitations.length > 0 ? (
      <InvitationsTable
        items={paginatedInvitations}
        totalItems={invitations.length}
        currentPage={invitesCurrentPage}
        rowsPerPage={invitesRowsPerPage}
        totalPages={totalInvitePages}
        onPageChange={setInvitesCurrentPage}
        onRowsPerPageChange={(nextRowsPerPage) => {
          setInvitesRowsPerPage(nextRowsPerPage);
          setInvitesCurrentPage(1);
        }}
        onResend={handleResendInvitation}
        onCopyEmail={handleCopyEmail}
        onCopyInviteLink={handleCopyInviteLink}
        onRevoke={handleRevokeInvitation}
      />
    ) : null;

  const membersContent =
    members.length === 0 && invitations.length === 0 ? (
      <MembersEmptyState
        title={t("manageMembersModal.noMembersYet")}
        description={t("manageMembersModal.inviteTeammatesDescription")}
        actionLabel={t("manageMembersModal.invite")}
        onInvite={() => setShowInviteModal(true)}
      />
    ) : (
      <MembersTable
        items={paginatedMembers}
        memberCount={members.length}
        totalItems={filteredMembers.length}
        searchQuery={searchQuery}
        inviteLabel={t("manageMembersModal.invite")}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        onSearchQueryChange={setSearchQuery}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={(nextRowsPerPage) => {
          setRowsPerPage(nextRowsPerPage);
          setCurrentPage(1);
        }}
        onOpenInviteModal={() => setShowInviteModal(true)}
        onRoleChange={handleRolesUpdate}
        onCopyEmail={handleCopyEmail}
        onRemove={setMemberToRemove}
      />
    );

  return (
    <>
      <MembersAndNumbersLayout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        spaceName={spaceName}
        membersLabel={t("manageMembersModal.title")}
        settingsLabel={t("manageMembersModal.settings")}
        membersContent={
          <MembersTabContent
            title={t("manageMembersModal.title") || "Members & Numbers"}
            stats={stats}
            loading={loading}
            pendingInvitesContent={pendingInvitesContent}
            membersContent={membersContent}
          />
        }
        settingsContent={
          <SettingsTabContent
            title={t("manageMembersModal.settings")}
            spaceName={settingsSpaceName}
            isSaving={savingSettings}
            onSpaceNameChange={setSettingsSpaceName}
            onSave={handleUpdateSpace}
          />
        }
      />

      <RemoveMemberDialog
        member={memberToRemove}
        onOpenChange={(open) => {
          if (!open) {
            setMemberToRemove(null);
          }
        }}
        onConfirm={confirmRemoveMember}
      />

      <ManageMembersModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        spaceId={spaceId}
        api={api}
      />
    </>
  );
};

export default MembersAndNumbers;
