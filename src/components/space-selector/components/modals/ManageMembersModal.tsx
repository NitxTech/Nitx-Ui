import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSpaceSelector } from "../../context";
import { DrawerDialog } from "../../ui/drawer-dialog";
import { Label } from "../../ui/label";
import { MemberRole } from "../../types";
import { Loader2, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface ManageMembersProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialEmail?: string;
  initialRole?: MemberRole;
}

const ManageMembersModal = ({
  isOpen,
  onClose,
  initialEmail,
  initialRole,
}: ManageMembersProps) => {
  const { t } = useTranslation("modals");
  const [email, setEmail] = useState("");
  const [pendingEmails, setPendingEmails] = useState<
    { id: string; email: string }[]
  >([]);
  const [pendingRole, setPendingRole] = useState<MemberRole>("viewer");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { activeModal, modalProps, setModal, api } = useSpaceSelector();

  // Combine props from direct component usage and context
  const editEmail =
    initialEmail || modalProps?.manageMembersProps?.initialEmail;
  const editRole = initialRole || modalProps?.manageMembersProps?.initialRole;
  const spaceId = modalProps?.manageSpaceMembers?.spaceId;

  // Reset state when modal opens/closes
  const effectiveOpen = isOpen || activeModal === "manageMembers";

  useEffect(() => {
    if (effectiveOpen) {
      if (editEmail) {
        setEmail(editEmail);
        setPendingEmails([{ id: uuidv4(), email: editEmail }]);
      }
      if (editRole) {
        setPendingRole(editRole);
      }
    } else {
      setPendingEmails([]);
      setEmail("");
      setPendingRole("viewer");
      setIsSuccess(false);
    }
  }, [effectiveOpen, editEmail, editRole]);

  if (!modalProps?.manageSpaceMembers && !isOpen) return null;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const addEmailToList = (emailToAdd: string) => {
    const cleanEmail = emailToAdd.trim().replace(/,$/, "");
    if (cleanEmail && emailRegex.test(cleanEmail)) {
      setPendingEmails((prev) => {
        if (prev.some((p) => p.email === cleanEmail)) return prev;
        return [...prev, { id: uuidv4(), email: cleanEmail }];
      });
      setEmail("");
      return true;
    }
    return false;
  };

  const handleEmailSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === "Enter" || e.key === "Tab" || e.key === ",") &&
      email.trim()
    ) {
      e.preventDefault();
      addEmailToList(email);
    }
  };

  const handleEmailBlur = () => {
    addEmailToList(email);
  };

  const removeEmail = (idToRemove: string) => {
    setPendingEmails((prev) => prev.filter((item) => item.id !== idToRemove));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if there's an email typing in input
    if (email.trim()) {
      addEmailToList(email);
    }

    // Capture the latest state including the potential add above?
    // State update is async, so we manually check
    const currentEmailValue = email.trim();
    let emailsToSubmit = pendingEmails.map((p) => p.email);

    if (
      currentEmailValue &&
      emailRegex.test(currentEmailValue) &&
      !emailsToSubmit.includes(currentEmailValue)
    ) {
      emailsToSubmit.push(currentEmailValue);
    }

    if (emailsToSubmit.length === 0) return;

    setIsLoading(true);
    try {
      if (!spaceId || !api?.inviteMembers)
        throw new Error("API not configured");

      await api.inviteMembers(spaceId, emailsToSubmit, pendingRole);

      setIsSuccess(true);
    } catch (e: any) {
      console.error("INVITATION_ERROR:", e);
      // Adapted error handling to display generic message or utilize toast
      toast.error(t("manageMembersModal.wrong"));
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <DrawerDialog
        open={effectiveOpen}
        onClose={onClose || (() => setModal(null))}
        className="sm:max-w-[425px] p-6 z-[10011] bg-neutral-50 dark:bg-neutral-900"
        overlayClassName="z-[10010]"
      >
        <div className="flex flex-col items-center justify-center py-6 gap-4 text-center">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-2 shadow-sm animate-in zoom-in-50 duration-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
            Invitations sent successfully
          </h2>
          <p className="text-sm text-neutral-500 max-w-[250px] dark:text-neutral-400">
            Invited users will receive an email to join your Space
          </p>

          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white min-w-[200px] mt-6 rounded-lg h-11"
            onClick={() => {
              setIsSuccess(false);
              if (onClose) {
                onClose();
              } else {
                setModal("membersAndNumbers");
              }
            }}
          >
            Done
          </Button>
        </div>
      </DrawerDialog>
    );
  }

  const isInputValidEmail = email.trim() && emailRegex.test(email.trim());
  const isButtonDisabled =
    isLoading || (pendingEmails.length === 0 && !isInputValidEmail);

  return (
      <DrawerDialog
        open={effectiveOpen}
        onClose={onClose || (() => setModal(null))}
        className="sm:max-w-[500px] p-0 overflow-hidden z-[10011] bg-neutral-50 dark:bg-neutral-900"
        overlayClassName="z-[10010]"
      >
        <div className="w-full flex flex-col">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 pt-8 pb-4 px-6 md:px-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              opacity="0.4"
              d="M19.9997 12.5001C19.9997 15.7217 17.388 18.3334 14.1663 18.3334C10.9447 18.3334 8.33301 15.7217 8.33301 12.5001C8.33301 9.27841 10.9447 6.66675 14.1663 6.66675C17.388 6.66675 19.9997 9.27841 19.9997 12.5001Z"
              fill="#0000FF"
            />
            <path
              opacity="0.4"
              d="M3.33301 30.4761C3.33301 32.0541 4.71879 33.3333 6.42824 33.3333H21.9048C23.6143 33.3333 25.0002 32.0541 25.0002 30.4761C25.0002 26.5313 21.5357 23.3333 17.262 23.3333H11.0711C6.79747 23.3333 3.33301 26.5313 3.33301 30.4761Z"
              fill="#0000FF"
            />
            <path
              d="M19.9997 12.5001C19.9997 15.7217 17.388 18.3334 14.1663 18.3334C10.9447 18.3334 8.33301 15.7217 8.33301 12.5001C8.33301 9.27841 10.9447 6.66675 14.1663 6.66675C17.388 6.66675 19.9997 9.27841 19.9997 12.5001Z"
              stroke="#0000FF"
              strokeWidth="2"
            />
            <path
              d="M22.5 18.3334C25.7217 18.3334 28.3333 15.7217 28.3333 12.5001C28.3333 9.27841 25.7217 6.66675 22.5 6.66675"
              stroke="#0000FF"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M21.9045 33.3333H6.42824C4.71879 33.3333 3.33301 32.0541 3.33301 30.4761C3.33301 26.5313 6.79747 23.3333 11.0711 23.3333H17.2615C19.0035 23.3333 20.6112 23.8646 21.9045 24.7613"
              stroke="#0000FF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M31.667 23.3333V33.3333M36.667 28.3333H26.667"
              stroke="#0000FF"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <h2 className="text-2xl font-medium text-neutral-900 dark:text-neutral-50">
            Add Members
          </h2>
          <p className="text-center text-sm text-neutral-600 max-w-sm leading-relaxed dark:text-neutral-400">
            Type or paste in emails below, separated by commas. Your workspace
            will be billed by members.
          </p>
        </div>

        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-6 px-6 md:px-10 pb-10"
        >
          {/* Email Input */}
          <div className="flex flex-wrap items-center gap-2 min-h-[50px] p-2.5 border border-neutral-200 rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-neutral-50 sticky top-0 dark:border-neutral-700 dark:bg-neutral-900">
            {pendingEmails.map((item) => (
              <div
                key={item.id}
                className="bg-primary text-white text-sm pl-3 pr-1 py-1 rounded-full flex items-center gap-1 animate-in fade-in zoom-in-95 duration-200"
              >
                <span>{item.email}</span>
                <button
                  type="button"
                  onClick={() => removeEmail(item.id)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleEmailSubmit}
              onBlur={handleEmailBlur}
              placeholder={
                pendingEmails.length === 0 ? "Search names or emails" : ""
              }
              className="flex-1 border-0 focus:ring-0 outline-none text-sm min-w-[150px] bg-transparent placeholder:text-neutral-400 h-8 dark:text-neutral-50 dark:placeholder:text-neutral-500"
            />
          </div>

          {/* Role Selection */}
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
              Select Role
            </Label>
            <div className="relative">
              <Select
                value={pendingRole}
                onValueChange={(v) => setPendingRole(v as MemberRole)}
              >
                <SelectTrigger
                  type="button"
                  className="w-full h-auto p-4 flex items-start text-left bg-neutral-50 border-neutral-200 rounded-xl hover:border-primary/50 hover:bg-neutral-50 data-[state=open]:border-primary data-[state=open]:ring-2 data-[state=open]:ring-primary/10 transition-all [&>span]:w-full dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800"
                >
                  <div className="flex gap-4 items-center w-full">
                    <div className="flex items-start justify-start">
                      <div className="w-5 h-5 text-gray-600">
                        {/* Dynamic Icon based on role */}
                        {pendingRole === "viewer" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <path
                              d="M12.75 6.375C12.75 4.30393 11.071 2.625 9 2.625C6.92893 2.625 5.25 4.30393 5.25 6.375C5.25 8.44605 6.92893 10.125 9 10.125C11.071 10.125 12.75 8.44605 12.75 6.375Z"
                              stroke="#212121"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14.25 15.375C14.25 12.4755 11.8995 10.125 9 10.125C6.10051 10.125 3.75 12.4755 3.75 15.375"
                              stroke="#212121"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : pendingRole === "editor" ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-full h-full"
                          >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-full h-full"
                          >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-0.5 flex-1">
                      <span className="font-medium capitalize text-sm text-neutral-700 dark:text-neutral-200">
                        {pendingRole}
                      </span>
                      {/* Description based on role */}
                      <span className="text-xs text-neutral-500 font-medium line-clamp-1 dark:text-neutral-400">
                        {pendingRole === "viewer" &&
                          "Can view content and data only, without making any changes."}
                        {pendingRole === "editor" &&
                          "Can edit and update content, but cannot manage settings or users."}
                        {pendingRole === "manager" &&
                          "Full control to manage content, settings, and user permissions."}
                      </span>
                    </div>
                  </div>
                </SelectTrigger>
                <SelectContent className="p-1 bg-neutral-50 dark:bg-neutral-900">
                  <SelectItem
                    value="viewer"
                    className="rounded-lg py-3 cursor-pointer focus:bg-primary/5 focus:text-primary dark:focus:bg-primary/15"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center shrink-0 dark:bg-neutral-800">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                              className="w-4 h-4 text-neutral-600 dark:text-neutral-300"
                        >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0.5 text-left">
                        <span className="font-semibold text-sm">Viewer</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          Can view content only
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="editor"
                    className="rounded-lg py-3 cursor-pointer focus:bg-primary/5 focus:text-primary dark:focus:bg-primary/15"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center shrink-0 dark:bg-neutral-800">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                              className="w-4 h-4 text-neutral-600 dark:text-neutral-300"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0.5 text-left">
                        <span className="font-semibold text-sm">Editor</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          Can edit content
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="manager"
                    className="rounded-lg py-3 cursor-pointer focus:bg-primary/5 focus:text-primary dark:focus:bg-primary/15"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center shrink-0 dark:bg-neutral-800">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="w-4 h-4 text-gray-600"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div className="flex flex-col gap-0.5 text-left">
                        <span className="font-semibold text-sm">Manager</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400">
                          Full control
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col gap-3 mt-4">
            <Button
              type="submit"
              disabled={isButtonDisabled}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold text-base rounded-xl transition-all shadow-sm shadow-primary/20 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : null}
              {isLoading ? "Sending invites..." : "Send invite"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => (onClose ? onClose() : setModal(null))}
              className="w-full text-neutral-500 font-normal hover:bg-neutral-100 hover:text-neutral-900 rounded-xl h-11 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DrawerDialog>
  );
};

export default ManageMembersModal;
