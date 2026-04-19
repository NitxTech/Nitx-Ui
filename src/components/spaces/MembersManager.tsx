import React, { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    EyeIcon,
    PencilEdit01Icon,
    Shield01Icon,
    Tick02Icon,
    User02Icon,
    UserAdd01Icon,
} from "@hugeicons/core-free-icons";
import { useTranslation } from "react-i18next";
import { Label } from "../ui/label";
import { MemberRole, SpaceSelectorApi } from "../space-selector/types";
import { Loader2, X } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "sonner";

import { useOptionalSpaceSelector } from "../space-selector/context";

export interface MembersManagerProps {
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

const roleDisplay = {
    viewer: {
        label: "Viewer",
        description:
            "Can view content and data only, without making any changes.",
        shortDescription: "Can view content only",
        triggerIcon: User02Icon,
        menuIcon: EyeIcon,
    },
    editor: {
        label: "Editor",
        description:
            "Can edit and update content, but cannot manage settings or users.",
        shortDescription: "Can edit content",
        triggerIcon: PencilEdit01Icon,
        menuIcon: PencilEdit01Icon,
    },
    manager: {
        label: "Manager",
        description:
            "Full control to manage content, settings, and user permissions.",
        shortDescription: "Full control",
        triggerIcon: Shield01Icon,
        menuIcon: Shield01Icon,
    },
    owner: {
        label: "Owner",
        description:
            "Full ownership of the space, including billing, settings, and member permissions.",
        shortDescription: "Full ownership",
        triggerIcon: Shield01Icon,
        menuIcon: Shield01Icon,
    },
} as const satisfies Record<
    MemberRole,
    {
        label: string;
        description: string;
        shortDescription: string;
        triggerIcon: typeof User02Icon;
        menuIcon: typeof User02Icon;
    }
>;

/**
 * MembersManager
 *
 * A fully self-contained member-invitation UI.
 * It does NOT depend on the SpaceSelectorContext and can be embedded
 * anywhere — inside a modal, a sidebar panel, a settings page, etc.
 */

const MembersManager = ({
    spaceId,
    api: apiProp,
    initialEmail,
    initialRole,
    onSuccess,
    onCancel,
}: MembersManagerProps) => {
    const { t } = useTranslation("modals");
    const spaceSelector = useOptionalSpaceSelector();
    const api = apiProp ?? spaceSelector?.api;
    if (!spaceId || !api?.inviteMembers) return null;

    const [email, setEmail] = useState("");
    const [pendingEmails, setPendingEmails] = useState<
        { id: string; email: string }[]
    >([]);
    const [pendingRole, setPendingRole] = useState<MemberRole>(
        initialRole ?? "viewer"
    );
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const selectedRole = roleDisplay[pendingRole];

    // Sync pre-fill values whenever they change from the outside
    useEffect(() => {
        if (initialEmail) {
            setEmail(initialEmail);
            setPendingEmails([{ id: uuidv4(), email: initialEmail }]);
        }
        if (initialRole) {
            setPendingRole(initialRole);
        }
    }, [initialEmail, initialRole]);

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

    const handleEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

        if (email.trim()) {
            addEmailToList(email);
        }

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
            await api.inviteMembers(spaceId, emailsToSubmit, pendingRole);
            setIsSuccess(true);
            onSuccess?.();
        } catch (e: any) {
            console.error("INVITATION_ERROR:", e);
            toast.error(t("manageMembersModal.wrong"));
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setPendingEmails([]);
        setEmail("");
        setPendingRole("viewer");
        setIsSuccess(false);
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-6 gap-4 text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white mb-2 shadow-sm animate-in zoom-in-50 duration-300">
                    <HugeiconsIcon icon={Tick02Icon} className="w-6 h-6" />
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
                    onClick={handleReset}
                >
                    Done
                </Button>
            </div>
        );
    }

    const isInputValidEmail = email.trim() && emailRegex.test(email.trim());
    const isButtonDisabled =
        isLoading || (pendingEmails.length === 0 && !isInputValidEmail);

    return (
        <div className="w-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col items-center gap-3 pt-8 pb-4 px-6 md:px-10">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <HugeiconsIcon icon={UserAdd01Icon} className="h-6 w-6" />
                </div>

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
                        onKeyDown={handleEmailKeyDown}
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
                                            <HugeiconsIcon
                                                icon={selectedRole.triggerIcon}
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-0.5 flex-1">
                                        <span className="font-medium capitalize text-sm text-neutral-700 dark:text-neutral-200">
                                            {selectedRole.label}
                                        </span>
                                        <span className="text-xs text-neutral-500 font-medium line-clamp-1 dark:text-neutral-400">
                                            {selectedRole.description}
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
                                            <HugeiconsIcon
                                                icon={roleDisplay.viewer.menuIcon}
                                                className="w-4 h-4 text-neutral-600 dark:text-neutral-300"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-0.5 text-left">
                                            <span className="font-semibold text-sm">
                                                {roleDisplay.viewer.label}
                                            </span>
                                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                                {roleDisplay.viewer.shortDescription}
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
                                            <HugeiconsIcon
                                                icon={roleDisplay.editor.menuIcon}
                                                className="w-4 h-4 text-neutral-600 dark:text-neutral-300"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-0.5 text-left">
                                            <span className="font-semibold text-sm">
                                                {roleDisplay.editor.label}
                                            </span>
                                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                                {roleDisplay.editor.shortDescription}
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
                                            <HugeiconsIcon
                                                icon={roleDisplay.manager.menuIcon}
                                                className="w-4 h-4 text-neutral-600 dark:text-neutral-300"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-0.5 text-left">
                                            <span className="font-semibold text-sm">
                                                {roleDisplay.manager.label}
                                            </span>
                                            <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                                {roleDisplay.manager.shortDescription}
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
                    {onCancel && (
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onCancel}
                            className="w-full text-neutral-500 font-normal hover:bg-neutral-100 hover:text-neutral-900 rounded-xl h-11 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default MembersManager;
