"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSpaceSelector } from "../../context"; 
import { DrawerDialog } from "../../ui/drawer-dialog"; 
import { Button } from "../../ui/button"; 
import {
  UserPlus,
  MoreVertical,
  Search,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { Invitation, Member, MemberRole } from "../../types"; 
import { Input } from "../../ui/input"; 
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";  
import { toast } from "sonner";
import { Dialog, DialogContent } from "../../ui/dialog"; 
import { Label } from "../../ui/label"; 
import ManageMembersModal from "./ManageMembersModal"; 
import { Skeleton } from "../../ui/skeleton"; 

const MembersAndNumbersModal = () => {
  const { t } = useTranslation("modals");

  // Adapted to use SpaceSelectorContext
  const {
    activeModal: modal,
    modalProps: props,
    setModal,
    setModalProps: setProps,
    refreshSpaces, 
    api,
  } = useSpaceSelector();

  const [activeTab, setActiveTab] = useState<"members" | "settings">("members");

  const [licenseCount, setLicenseCount] = useState(0); // Fetched via APi
  const [screensCount, setScreensCount] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [memberToRemove, setMemberToRemove] = useState<Member | null>(null);
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Pagination State for Invitations
  const [invitesCurrentPage, setInvitesCurrentPage] = useState(1);
  const [invitesRowsPerPage, setInvitesRowsPerPage] = useState(5);

  // Settings State
  const [settingsSpaceName, setSettingsSpaceName] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Access props safely
  const spaceId = props?.manageSpaceMembers?.spaceId;

  useEffect(() => {
    if (props?.manageSpaceMembers?.spaceName) {
      setSettingsSpaceName(props.manageSpaceMembers.spaceName);
    }
  }, [props?.manageSpaceMembers]);

  const handleUpdateSpace = async () => {
    if (!spaceId || !settingsSpaceName.trim() || !api) return;
    setSavingSettings(true);
    try {
      await api.renameSpace(spaceId, settingsSpaceName);
      refreshSpaces();
      if (props?.manageSpaceMembers) {
        setProps({
          ...props,
          manageSpaceMembers: {
            ...props.manageSpaceMembers,
            spaceName: settingsSpaceName,
          },
        });
      }
      toast.success(t("renameSpaceModal.spaceRenamedSuccessfully"));
    } catch (error) {
      toast.error(t("renameSpaceModal.failedToRenameSpace"));
    } finally {
      setSavingSettings(false);
    }
  };

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
    } catch (e) {
      console.error("Failed to fetch data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (modal === "membersAndNumbers" && spaceId) {
      fetchData();
    }
  }, [modal, spaceId]);

  if (modal !== "membersAndNumbers") return null;
  if (!api) return null; // Ensure API is present

  // Pagination Logic
  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalInvitePages = Math.ceil(invitations.length / invitesRowsPerPage);
  const paginatedInvitations = invitations.slice(
    (invitesCurrentPage - 1) * invitesRowsPerPage,
    invitesCurrentPage * invitesRowsPerPage
  );

  const handleRolesUpdate = async (memberId: string, newRole: MemberRole) => {
    try {
      if (!api) return;
      const member = members.find((m) => m.id === memberId);
      if (!member) return;

      setMembers((prev) =>
        prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m))
      );

      await api.updateMemberRole(spaceId, memberId, newRole, member.email);
      toast.success(t("manageMembersModal.role_success"));
    } catch (error) {
      toast.error(t("manageMembersModal.error"));
      fetchData();
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    // Kept for reference, used in Confirm Dialog
    try {
      if (!spaceId || !api) return;
      setMembers((prev) => prev.filter((m) => m.id !== memberId));
      await api.removeMember(spaceId, memberId);
      toast.success(t("manageMembersModal.removed"));
    } catch (error) {
      toast.error(t("manageMembersModal.error_remove"));
      fetchData();
    }
  };

  const handleRevokeInvitation = async (invitationId: string) => {
    try {
      if (!spaceId || !api) return;
      setInvitations((prev) => prev.filter((i) => i.id !== invitationId));
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
    if (!memberToRemove || !api) return;
    try {
      if (!spaceId) return;
      setMembers((prev) => prev.filter((m) => m.id !== memberToRemove.id));
      await api.removeMember(spaceId, memberToRemove.id);
      toast.success(t("manageMembersModal.removed"));
      setMemberToRemove(null);
    } catch (error) {
      toast.error(t("manageMembersModal.error_remove"));
      fetchData(); // Revert
    }
  };

  const handleResendInvitation = async (id: string) => {
    try {
      if (!spaceId || !api) return;
      await api.resendInvitation(spaceId, id);
      toast.success("Invitation resent successfully");
    } catch (error) {
      toast.error("Failed to resend invitation");
    }
  };

  const handleCopyInviteLink = async (invite: Invitation) => {
    try {
      if (!spaceId || !api) return;
      const link = await api.getInviteLink(spaceId, invite.id);
      if (link) {
        await navigator.clipboard.writeText(link);
        toast.success("Invite link copied to clipboard");
      } else {
        toast.error("Failed to get invite link");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to get invite link");
    }
  };

  return (
    <>
      <DrawerDialog
        size="2xl"
        className="p-0 overflow-hidden sm:max-w-[1280px]"
        open={modal === "membersAndNumbers"}
        onClose={() => setModal(null)}
      >
        <div className="flex flex-col sm:flex-row w-full h-[650px] sm:h-[960px] bg-neutral-50 dark:bg-neutral-900">
          {/* Sidebar */}
          <div className="w-full sm:w-64 bg-neutral-50 border-b sm:border-b-0 sm:border-r border-neutral-200 p-4 flex flex-col gap-2 shrink-0 dark:bg-neutral-900 dark:border-neutral-800">
            <h3 className="text-sm font-semibold px-4 py-2 hidden sm:block">
              {props?.manageSpaceMembers?.spaceName || "Space Nitx"}
            </h3>
            <div className="flex flex-row sm:flex-col gap-2 overflow-x-auto no-scrollbar w-full">
              <button
                onClick={() => setActiveTab("members")}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-normal transition-colors whitespace-nowrap flex-1 sm:w-full justify-center sm:justify-start ${
                  activeTab === "members"
                    ? "bg-primary text-white "
                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                {t("manageMembersModal.title")}
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex-1 sm:w-full justify-center sm:justify-start ${
                  activeTab === "settings"
                    ? "bg-primary text-white shadow-sm"
                    : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M13.5013 4.52275L13.1887 3.98024C12.9523 3.56995 12.8341 3.3648 12.633 3.28299C12.4318 3.20119 12.2043 3.26574 11.7494 3.39484L10.9766 3.61252C10.6862 3.6795 10.3814 3.6415 10.1162 3.50524L9.90287 3.38214C9.67544 3.23648 9.50051 3.02171 9.40368 2.76927L9.19221 2.1376C9.05313 1.71959 8.98359 1.51058 8.81803 1.39103C8.65254 1.27148 8.43265 1.27148 7.99286 1.27148H7.28682C6.8471 1.27148 6.62721 1.27148 6.46165 1.39103C6.29613 1.51058 6.2266 1.71959 6.08754 2.1376L5.87603 2.76927C5.7792 3.02171 5.60428 3.23648 5.37686 3.38214L5.1635 3.50524C4.89829 3.6415 4.59357 3.6795 4.30311 3.61252L3.5303 3.39484C3.07535 3.26574 2.84788 3.20119 2.64675 3.28299C2.44562 3.3648 2.32741 3.56995 2.09099 3.98024L1.77839 4.52275C1.55678 4.90734 1.44597 5.09964 1.46748 5.30435C1.48898 5.50905 1.63732 5.67402 1.93399 6.00395L2.58698 6.73398C2.74658 6.93601 2.85989 7.28814 2.85989 7.60475C2.85989 7.92148 2.74662 8.27348 2.587 8.47558L1.93399 9.20562C1.63732 9.53559 1.48899 9.70051 1.46748 9.90527C1.44597 10.11 1.55678 10.3022 1.77839 10.6868L2.09098 11.2293C2.3274 11.6396 2.44562 11.8448 2.64675 11.9265C2.84788 12.0084 3.07536 11.9438 3.53031 11.8147L4.30309 11.597C4.59359 11.53 4.89838 11.5681 5.16362 11.7044L5.37694 11.8275C5.60432 11.9732 5.7792 12.1879 5.87601 12.4403L6.08754 13.0721C6.2266 13.4901 6.29613 13.6991 6.46165 13.8186C6.62721 13.9381 6.8471 13.9381 7.28682 13.9381H7.99286C8.43265 13.9381 8.65254 13.9381 8.81803 13.8186C8.98359 13.6991 9.05313 13.4901 9.19221 13.0721L9.40374 12.4403C9.50051 12.1879 9.67538 11.9732 9.90281 11.8275L10.1161 11.7044C10.3814 11.5681 10.6861 11.53 10.9766 11.597L11.7494 11.8147C12.2043 11.9438 12.4318 12.0084 12.633 11.9265C12.8341 11.8448 12.9523 11.6396 13.1887 11.2293L13.5013 10.6868C13.7229 10.3022 13.8337 10.11 13.8122 9.90527C13.7907 9.70051 13.6424 9.53559 13.3457 9.20562L12.6927 8.47558C12.5331 8.27348 12.4198 7.92148 12.4198 7.60475C12.4198 7.28814 12.5332 6.93601 12.6927 6.73398L13.3457 6.00395C13.6424 5.67402 13.7907 5.50905 13.8122 5.30435C13.8337 5.09964 13.7229 4.90734 13.5013 4.52275Z"
                      stroke="currentColor"
                      strokeWidth="0.96"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.82882 7.59948C9.82882 8.82371 8.83639 9.81615 7.61216 9.81615C6.38792 9.81615 5.39551 8.82371 5.39551 7.59948C5.39551 6.37525 6.38792 5.38281 7.61216 5.38281C8.83639 5.38281 9.82882 6.37525 9.82882 7.59948Z"
                      stroke="currentColor"
                      strokeWidth="0.96"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                {t("manageMembersModal.settings")}
              </button>
            </div>
          </div>

          {/* Main Content */}
          {activeTab === "members" && (
            <div className="flex-1 flex flex-col gap-6 p-4 sm:p-8 overflow-y-auto pb-20">
              {/* Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold capitalize">
                  {t("manageMembersModal.title")}
                </h2>
              </div>

              {loading ? (
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-32" />
                  </div>
                  {/* Stats Loading */}
                  <div className="border border-neutral-200 rounded-lg overflow-hidden dark:border-neutral-800">
                    <div className="bg-neutral-50/50 p-4 border-b border-neutral-200 hidden sm:block dark:bg-neutral-900/40 dark:border-neutral-800">
                      <div className="grid grid-cols-[1fr_200px_100px] gap-4">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-10 ml-auto" />
                      </div>
                    </div>
                    {[1].map((i) => (
                      <div
                        key={i}
                        className="p-4 border-b border-neutral-200 last:border-0 relative dark:border-neutral-800"
                      >
                        <div className="flex flex-col sm:grid sm:grid-cols-[1fr_200px_100px] gap-4 items-start sm:items-center">
                          <div className="flex items-center gap-3 w-full">
                            <Skeleton className="w-8 h-8 rounded-md" />
                            <div className="flex flex-col gap-1 flex-1">
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-48" />
                            </div>
                          </div>
                          <Skeleton className="h-8 w-20 ml-11 sm:ml-0" />
                          <Skeleton className="h-8 w-8 absolute right-4 top-4 sm:static sm:ml-auto" />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Table Loading */}
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex justify-between">
                      <Skeleton className="h-10 w-64" /> {/* Search */}
                      <Skeleton className="h-10 w-32" /> {/* Invite Button */}
                    </div>
                    <div className="border border-neutral-200 rounded-lg overflow-hidden dark:border-neutral-800">
                      <div className="bg-neutral-50/50 p-4 border-b border-neutral-200 hidden sm:block dark:bg-neutral-900/40 dark:border-neutral-800">
                        <div className="grid grid-cols-[1fr_200px_100px] gap-4">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-10 ml-auto" />
                        </div>
                      </div>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="p-4 border-b border-neutral-200 last:border-0 relative dark:border-neutral-800"
                        >
                          <div className="flex flex-col sm:grid sm:grid-cols-[1fr_200px_100px] gap-4 items-start sm:items-center">
                            <div className="flex items-center gap-3 w-full">
                              <Skeleton className="w-8 h-8 rounded-md" />
                              <div className="flex flex-col gap-1 flex-1">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-48" />
                              </div>
                            </div>
                            <Skeleton className="h-8 w-20 ml-11 sm:ml-0" />
                            <Skeleton className="h-8 w-8 absolute right-4 top-4 sm:static sm:ml-auto" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Pending Invites Section */}
                  {invitations.length > 0 && (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-base font-semibold">
                        Pending Invite
                      </h3>
                      <p className="text-xs text-neutral-500 -mt-3 dark:text-neutral-400">
                        Invite teammates to start collaborating
                      </p>

                      {/* Table Header */}
                      <div className="hidden sm:grid grid-cols-[1fr_200px_100px] gap-4 px-4 py-3 bg-primary/5 rounded-t-lg text-xs font-semibold text-neutral-700 dark:bg-primary/10 dark:text-neutral-200">
                        <div>Person</div>
                        <div>Roles</div>
                        <div className="text-right">Action</div>
                      </div>

                      <div className="w-full bg-neutral-50 border border-neutral-200 rounded-b-lg overflow-hidden sm:-mt-4 dark:bg-neutral-900 dark:border-neutral-800">
                        {paginatedInvitations.map((invite) => (
                          <div
                            key={invite.id}
                            className="relative flex flex-col sm:grid sm:grid-cols-[1fr_200px_100px] gap-4 items-start sm:items-center p-4 border-b border-neutral-200 last:border-0 hover:bg-neutral-100 transition-colors dark:border-neutral-800 dark:hover:bg-neutral-800"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-600 text-xs font-medium dark:bg-neutral-800 dark:text-neutral-200">
                                {invite.email.substring(0, 2).toUpperCase()}
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                                  Member
                                </span>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                  {invite.email}
                                </span>
                              </div>
                            </div>
                            <div className="text-sm text-neutral-600 capitalize ml-11 sm:ml-0 dark:text-neutral-300">
                              {invite.role}
                            </div>
                            <div className="absolute right-2 top-2 sm:static flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                  >
                                    <MoreVertical className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-[200px] p-2"
                                >
                                  <DropdownMenuItem
                                    className="gap-2 cursor-pointer py-2.5"
                                    onClick={() =>
                                      handleResendInvitation(invite.id)
                                    }
                                  >
                                    <div className="w-4 h-4 flex items-center justify-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                                        <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                                      </svg>
                                    </div>
                                    <span>Resend Invitation</span>
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    className="gap-2 cursor-pointer py-2.5"
                                    onClick={() =>
                                      handleCopyEmail(invite.email)
                                    }
                                  >
                                    <div className="w-4 h-4 flex items-center justify-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <rect
                                          width="14"
                                          height="14"
                                          x="8"
                                          y="8"
                                          rx="2"
                                          ry="2"
                                        />
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                      </svg>
                                    </div>
                                    <span>Copy Email</span>
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    className="gap-2 cursor-pointer py-2.5"
                                    onClick={() => handleCopyInviteLink(invite)}
                                  >
                                    <div className="w-4 h-4 flex items-center justify-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                                      </svg>
                                    </div>
                                    <span>Copy Invite Link</span>
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    className="gap-2 cursor-pointer py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50"
                                    onClick={() =>
                                      handleRevokeInvitation(invite.id)
                                    }
                                  >
                                    <div className="w-4 h-4 flex items-center justify-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="m15 9-6 6" />
                                        <path d="m9 9 6 6" />
                                      </svg>
                                    </div>
                                    <span>Cancel Invitation</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination Footer */}
                      {invitations.length > 0 && (
                        <div className="flex items-center justify-between px-2 text-xs text-neutral-500 mt-2 dark:text-neutral-400">
                          <div className="flex items-center gap-2">
                            <select
                              className="border border-neutral-200 rounded p-1 bg-neutral-50 focus:outline-none focus:border-primary dark:border-neutral-700 dark:bg-neutral-900"
                              value={invitesRowsPerPage}
                              onChange={(e) => {
                                setInvitesRowsPerPage(Number(e.target.value));
                                setInvitesCurrentPage(1);
                              }}
                            >
                              <option value={5}>5</option>
                              <option value={10}>10</option>
                              <option value={20}>20</option>
                              <option value={50}>50</option>
                            </select>
                            <span>Rows per page</span>
                          </div>

                          <div className="flex items-center gap-4">
                            <span>
                              {(invitesCurrentPage - 1) * invitesRowsPerPage +
                                1}
                              -
                              {Math.min(
                                invitesCurrentPage * invitesRowsPerPage,
                                invitations.length
                              )}{" "}
                              of {invitations.length}
                            </span>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                disabled={invitesCurrentPage === 1}
                                onClick={() =>
                                  setInvitesCurrentPage((p) =>
                                    Math.max(1, p - 1)
                                  )
                                }
                              >
                                <span className="sr-only">Previous</span>
                                &lsaquo;
                              </Button>
                              <span className="text-neutral-900 font-medium dark:text-neutral-50">
                                {invitesCurrentPage} / {totalInvitePages || 1}{" "}
                                pages
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                disabled={
                                  invitesCurrentPage === totalInvitePages
                                }
                                onClick={() =>
                                  setInvitesCurrentPage((p) =>
                                    Math.min(totalInvitePages, p + 1)
                                  )
                                }
                              >
                                <span className="sr-only">Next</span>
                                &rsaquo;
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Members Section / Empty State logic */}
                  {members.length === 0 && invitations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 min-h-[300px]">
                      {/* Empty state illustration */}
                        <div className="flex flex-col items-center gap-2 mb-4 opacity-50">
                        <div className="w-16 h-8 bg-primary/10 rounded-md mb-[-10px] z-0 mx-auto" />
                        <div className="w-20 h-10 bg-primary/10 rounded-md mb-[-15px] z-10 mx-auto border-2 border-white dark:border-neutral-800" />
                        <div className="w-24 h-12 bg-neutral-50 border border-neutral-200 shadow-sm rounded-md z-20 flex items-center gap-2 px-2 dark:bg-neutral-900 dark:border-neutral-700">
                          <div className="w-6 h-6 bg-neutral-200 rounded-full dark:bg-neutral-700" />
                          <div className="h-2 w-10 bg-neutral-200 rounded-full dark:bg-neutral-700" />
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mt-4">
                        {t("manageMembersModal.noMembersYet")}
                      </h3>
                      <p className="text-sm text-neutral-500 text-center max-w-sm mt-2 dark:text-neutral-400">
                        {t("manageMembersModal.inviteTeammatesDescription")}
                      </p>
                      <Button
                        className="mt-6 bg-primary hover:bg-primary/90 text-white rounded-md px-8 h-10"
                        onClick={() => setShowInviteModal(true)}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        {t("manageMembersModal.invite")}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 mt-2">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <h3 className="text-base font-semibold">
                            Members {members.length}
                          </h3>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            Invite teammates to start collaborating
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                          <Input
                            placeholder="Search"
                            className="pl-9 h-10 bg-neutral-50 border-neutral-200 rounded-sm text-sm dark:bg-neutral-900 dark:border-neutral-700"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Button
                          className="bg-primary hover:bg-primary/90 text-white h-10 px-6 rounded-sm font-normal"
                          onClick={() => setShowInviteModal(true)}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          {t("manageMembersModal.invite")}
                        </Button>
                      </div>

                      {/* Members Table */}
                      <div className="w-full bg-neutral-50 border border-neutral-200 rounded-lg overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
                        {/* Table Header */}
                        <div className="hidden sm:grid grid-cols-[1fr_200px_100px] gap-4 px-4 py-3 bg-neutral-50/50 border-b border-neutral-200 text-xs font-semibold text-neutral-500 dark:bg-neutral-900/40 dark:border-neutral-800 dark:text-neutral-400">
                          <div>Person</div>
                          <div>Roles</div>
                          <div className="text-right">Action</div>
                        </div>

                        {paginatedMembers.map((member) => (
                          <div
                            key={member.id}
                            className="relative flex flex-col sm:grid sm:grid-cols-[1fr_200px_100px] gap-4 items-start sm:items-center p-4 border-b border-neutral-200 last:border-0 hover:bg-neutral-100 transition-colors dark:border-neutral-800 dark:hover:bg-neutral-800"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar className="size-10 ">
                                <AvatarImage src={member.imageURL} />
                                <AvatarFallback className="bg-primary/10 text-primary text-xs ">
                                  {member.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                                  {member.name}
                                </span>
                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                  {member.email}
                                </span>
                              </div>
                            </div>
                            <div className="ml-14 sm:ml-0">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 px-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 capitalize justify-start w-24 dark:text-neutral-200 dark:hover:bg-neutral-800"
                                  >
                                    {member.role}
                                    <ChevronDown className="w-4 h-4 ml-2" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleRolesUpdate(member.id, "viewer")
                                    }
                                  >
                                    Viewer
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleRolesUpdate(member.id, "editor")
                                    }
                                  >
                                    Editor
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleRolesUpdate(member.id, "manager")
                                    }
                                  >
                                    Manager
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <div className="absolute right-2 top-2 sm:static flex justify-end">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                  >
                                    <MoreVertical className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="w-[200px] p-2"
                                >
                                  <DropdownMenuItem
                                    className="gap-2 cursor-pointer py-2.5"
                                    onClick={() =>
                                      handleCopyEmail(member.email)
                                    }
                                  >
                                    <div className="w-4 h-4 flex items-center justify-center">
                                      {/* Icon for copy */}
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                      >
                                        <g clipPath="url(#clip0_7149_14050)">
                                          <path
                                            d="M9.89553 5.23975C9.89413 3.51883 9.86811 2.62744 9.36708 2.01709C9.27037 1.89922 9.16228 1.79114 9.04444 1.69441C8.4005 1.16602 7.44389 1.16602 5.53054 1.16602C3.61722 1.16602 2.66056 1.16602 2.01666 1.69441C1.89878 1.79114 1.7907 1.89922 1.69396 2.01709C1.16553 2.66095 1.16553 3.61754 1.16553 5.53073C1.16553 7.44394 1.16553 8.40049 1.69396 9.04438C1.79069 9.16221 1.89878 9.2703 2.01666 9.36702C2.62705 9.86798 3.51851 9.894 5.23954 9.8954"
                                            stroke="#212121"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M8.18321 5.26412L9.9132 5.23926M8.17504 12.8339L9.90498 12.809M12.8168 8.17936L12.8005 9.90585M5.25606 8.18729L5.23975 9.91372M6.70096 5.26412C6.21516 5.35113 5.43543 5.44062 5.25606 6.44493M11.3719 12.809C11.859 12.7295 12.64 12.6519 12.8348 11.6505M11.3719 5.26412C11.8577 5.35113 12.6374 5.44062 12.8168 6.44493M6.70837 12.8082C6.22257 12.7215 5.44276 12.6324 5.26285 11.6282"
                                            stroke="#212121"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_7149_14050">
                                            <rect
                                              width="14"
                                              height="14"
                                              fill="white"
                                            />
                                          </clipPath>
                                        </defs>
                                      </svg>
                                    </div>
                                    <span>Copy Email</span>
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    className="gap-2 cursor-pointer py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50"
                                    onClick={() => setMemberToRemove(member)}
                                  >
                                    <div className="w-4 h-4 flex items-center justify-center">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="13"
                                        height="14"
                                        viewBox="0 0 13 14"
                                        fill="none"
                                      >
                                        <path
                                          d="M0.879331 6.34768L1.91868 9.13184C2.40271 10.4285 2.64476 11.0768 3.03998 11.5211C3.64442 12.2004 4.51484 12.5977 5.43492 12.6144C6.03661 12.6252 6.69948 12.39 8.02521 11.9195C8.72048 11.6728 9.06812 11.5494 9.36568 11.3651C9.81966 11.0838 10.1948 10.6965 10.4573 10.2381C10.6294 9.93764 10.7365 9.59162 10.9505 8.89957L11.8938 5.85011C12.0388 5.38158 11.8408 4.87587 11.4125 4.62071C10.8528 4.28722 10.1217 4.5027 9.84555 5.08255L9.21565 6.40503L7.44206 1.65401C7.25756 1.15976 6.69705 0.904925 6.19011 1.08482C5.68317 1.26471 5.42185 1.81121 5.60635 2.30545M5.60635 2.30545L5.16087 1.11223C4.97636 0.617985 4.41585 0.363153 3.90898 0.543045C3.40204 0.722931 3.14065 1.26943 3.32515 1.76368L3.77057 2.95689M5.60635 2.30545L6.60857 4.99019M3.77057 2.95689C3.58607 2.46265 3.02556 2.20781 2.51868 2.3877C2.01174 2.56759 1.75035 3.11409 1.93485 3.60833L2.38027 4.80155M3.77057 2.95689L4.77286 5.64162M2.38027 4.80155C2.19577 4.3073 1.63526 4.05247 1.12839 4.23236C0.621447 4.41225 0.360058 4.95875 0.544559 5.453L1.10137 6.94451M2.38027 4.80155L2.93708 6.2931"
                                          stroke="#F44336"
                                          strokeWidth="0.97035"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                    <span>Remove From Space</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}

                        {filteredMembers.length === 0 && (
                          <div className="p-8 text-center text-neutral-500 text-sm dark:text-neutral-400">
                            No members found matching "{searchQuery}"
                          </div>
                        )}
                      </div>

                      {/* Pagination Footer */}
                      {filteredMembers.length > 0 && (
                        <div className="flex items-center justify-between px-2 text-xs text-neutral-500 mt-2 dark:text-neutral-400">
                          <div className="flex items-center gap-2">
                            <select
                              className="border border-neutral-200 rounded p-1 bg-neutral-50 focus:outline-none focus:border-primary dark:border-neutral-700 dark:bg-neutral-900"
                              value={rowsPerPage}
                              onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                              }}
                            >
                              <option value={10}>10</option>
                              <option value={20}>20</option>
                              <option value={50}>50</option>
                            </select>
                            <span>Rows per page</span>
                          </div>

                          <div className="flex items-center gap-4">
                            <span>
                              {(currentPage - 1) * rowsPerPage + 1}-
                              {Math.min(
                                currentPage * rowsPerPage,
                                filteredMembers.length
                              )}{" "}
                              of {filteredMembers.length}
                            </span>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                disabled={currentPage === 1}
                                onClick={() =>
                                  setCurrentPage((p) => Math.max(1, p - 1))
                                }
                              >
                                <span className="sr-only">Previous</span>
                                &lsaquo;
                              </Button>
                              <span className="text-neutral-900 font-medium dark:text-neutral-50">
                                {currentPage} / {totalPages || 1} pages
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                  setCurrentPage((p) =>
                                    Math.min(totalPages, p + 1)
                                  )
                                }
                              >
                                <span className="sr-only">Next</span>
                                &rsaquo;
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Settings Tab Content (Placeholder) */}
          {activeTab === "settings" && (
            <div className="flex-1 flex flex-col gap-6 p-4 sm:p-8 overflow-y-auto">
              <h2 className="text-xl font-semibold capitalize">
                {t("manageMembersModal.settings")}
              </h2>

              <div className="flex flex-col gap-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label
                    htmlFor="spaceName"
                    className="text-sm font-medium text-neutral-700 dark:text-neutral-200"
                  >
                    Space Name
                  </Label>
                  <Input
                    type="text"
                    id="spaceName"
                    placeholder="Enter space name"
                    value={settingsSpaceName}
                    onChange={(e) => setSettingsSpaceName(e.target.value)}
                    className="bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-50"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleUpdateSpace}
                    disabled={savingSettings || !settingsSpaceName.trim()}
                    className="bg-primary hover:bg-primary/90 text-white min-w-[120px]"
                  >
                    {savingSettings ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DrawerDialog>

      {/* Confirmation Dialog */}
      {memberToRemove && (
        <Dialog
          open={!!memberToRemove}
          onOpenChange={(open) => !open && setMemberToRemove(null)}
        >
          <DialogContent
            overlayClassName="z-[10010]"
            className="sm:max-w-[400px] p-6 flex flex-col items-center text-center gap-4 text-black z-[10010]"
          >
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mb-1 font-bold text-lg">
              {memberToRemove.name.substring(0, 2).toUpperCase()}
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Remove {memberToRemove.email} from Space?
              </h3>
              <p className="text-sm text-neutral-500 max-w-[300px] mx-auto leading-relaxed dark:text-neutral-400">
                They have been an active Nitx member. Removing them may cause
                loss of private pages.
              </p>
            </div>

            <div className="flex flex-col w-full gap-2 mt-2">
              <Button
                onClick={confirmRemoveMember}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg h-11"
              >
                Remove
              </Button>
              <Button
                variant="ghost"
                onClick={() => setMemberToRemove(null)}
                className="w-full text-neutral-600 font-normal hover:bg-neutral-100 rounded-lg h-11 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Invite Member Modal - Stacked */}
      <ManageMembersModal // Fixed Name
        isOpen={showInviteModal}
        onClose={() => {
          setShowInviteModal(false);
          setMemberToEdit(null);
        }}
        initialEmail={memberToEdit?.email}
        initialRole={memberToEdit?.role}
      />
    </>
  );
};

export default MembersAndNumbersModal;
