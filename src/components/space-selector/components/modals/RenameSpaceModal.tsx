"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Check, Loader2, PencilLine, RefreshCw, TriangleAlert } from "lucide-react";

import { useSpaceSelector } from "../../context";
import { DrawerDialog } from "../../ui/drawer-dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useNitxUiTranslation } from "../../../../i18n/nitxuilib";

type RenameModalView = "form" | "success" | "error";

const getFallbackText = (value: string) => value.trim().slice(0, 2).toUpperCase();

interface RenameSpaceFormStateProps {
  t: (key: string, options?: Record<string, unknown>) => string;
  spaceName: string;
  logoName: string;
  isSaving: boolean;
  onSpaceNameChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const RenameSpaceFormState = ({
  t,
  spaceName,
  logoName,
  isSaving,
  onSpaceNameChange,
  onSubmit,
  onCancel,
}: RenameSpaceFormStateProps) => {
  const logoText = getFallbackText(logoName || "SP");

  return (
    <div className="flex w-full flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          {t("renameSpaceModal.title")}
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {t("renameSpaceModal.description")}
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-100/60 p-4 dark:border-neutral-800 dark:bg-neutral-950/40">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
          <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl bg-neutral-900 text-lg font-semibold tracking-tight text-white shadow-sm dark:bg-secondary dark:text-white">
            {logoText || "SP"}
          </div>

          <div className="grid flex-1 items-center gap-1.5">
            <Label
              htmlFor="rename-space-name"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-200"
            >
              {t("renameSpaceModal.spaceNameLabel")}
            </Label>
            <Input
              id="rename-space-name"
              type="text"
              placeholder={t("renameSpaceModal.spaceNamePlaceholder")}
              value={spaceName}
              onChange={(event) => onSpaceNameChange(event.target.value)}
              className="h-12 rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-50"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSaving}
          className="h-11 rounded-xl px-5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          {t("renameSpaceModal.cancel")}
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSaving || !spaceName.trim()}
          className="h-11 min-w-[140px] rounded-xl bg-primary px-5 text-white hover:bg-primary/90 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            t("renameSpaceModal.saveChanges")
          )}
        </Button>
      </div>
    </div>
  );
};

interface RenameSpaceSuccessStateProps {
  t: (key: string, options?: Record<string, unknown>) => string;
  spaceName: string;
  onDone: () => void;
}

const RenameSpaceSuccessState = ({
  t,
  spaceName,
  onDone,
}: RenameSpaceSuccessStateProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-4 p-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
        <Check className="h-7 w-7" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          {t("renameSpaceModal.successTitle")}
        </h2>
        <p className="max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
          {t("renameSpaceModal.successDescription", { name: spaceName })}
        </p>
      </div>

      <Button
        type="button"
        onClick={onDone}
        className="mt-3 h-11 min-w-[140px] rounded-xl bg-primary px-5 text-white hover:bg-primary/90 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary"
      >
        {t("renameSpaceModal.done")}
      </Button>
    </div>
  );
};

interface RenameSpaceErrorStateProps {
  t: (key: string, options?: Record<string, unknown>) => string;
  attemptedName: string;
  errorMessage: string;
  isSaving: boolean;
  onRetry: () => void;
  onBack: () => void;
}

const RenameSpaceErrorState = ({
  t,
  attemptedName,
  errorMessage,
  isSaving,
  onRetry,
  onBack,
}: RenameSpaceErrorStateProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-4 p-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
        <TriangleAlert className="h-7 w-7" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          {t("renameSpaceModal.errorTitle")}
        </h2>
        <p className="max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
          {t("renameSpaceModal.errorDescription", {
            name: attemptedName || t("renameSpaceModal.thisSpace"),
          })}
        </p>
      </div>

      <div className="w-full rounded-2xl border border-red-100 bg-red-50/80 p-4 text-left dark:border-red-500/20 dark:bg-red-500/10">
        <p className="text-sm font-medium text-red-700 dark:text-red-300">
          {errorMessage}
        </p>
      </div>

      <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-center">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={isSaving}
          className="h-11 rounded-xl px-5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
        >
          {t("renameSpaceModal.backToEdit")}
        </Button>
        <Button
          type="button"
          onClick={onRetry}
          disabled={isSaving}
          className="h-11 min-w-[140px] rounded-xl bg-primary px-5 text-white hover:bg-primary/90 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary" 
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("renameSpaceModal.retry")}
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

const RenameSpaceModal = () => {
  const { t } = useNitxUiTranslation();
  const {
    activeModal,
    modalProps,
    setModal,
    api,
    activeSpace,
    setActiveSpace,
    refreshSpaces,
  } = useSpaceSelector();

  const renameProps = modalProps?.renameSpaceModalProps;
  const isOpen = activeModal === "renameSpace" && !!renameProps?.spaceId;

  const initialName = renameProps?.initialName ?? "";
  const [draftName, setDraftName] = useState(initialName);
  const [lastAttemptedName, setLastAttemptedName] = useState(initialName);
  const [view, setView] = useState<RenameModalView>("form");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setDraftName("");
      setLastAttemptedName("");
      setView("form");
      setIsSaving(false);
      setErrorMessage("");
      return;
    }

    setDraftName(initialName);
    setLastAttemptedName(initialName);
    setView("form");
    setIsSaving(false);
    setErrorMessage("");
  }, [initialName, isOpen]);

  const logoName = useMemo(() => draftName.trim() || initialName || "Space", [
    draftName,
    initialName,
  ]);

  const closeModal = () => setModal(null);

  const submitRename = async (nameToSubmit: string) => {
    if (!renameProps?.spaceId || !nameToSubmit.trim() || !api?.renameSpace) return;

    const nextName = nameToSubmit.trim();

    setIsSaving(true);
    setLastAttemptedName(nextName);

    try {
      await api.renameSpace(renameProps.spaceId, nextName);
      await refreshSpaces?.();

      if (
        activeSpace &&
        (activeSpace.space_uuid === renameProps.spaceId ||
          activeSpace.proxyId === renameProps.spaceId ||
          activeSpace.uuid === renameProps.spaceId)
      ) {
        setActiveSpace({
          ...activeSpace,
          name: nextName,
        });
      }

      setDraftName(nextName);
      setView("success");
      setErrorMessage("");
    } catch (error: any) {
      const nextErrorMessage =
        error?.response?.data?.errors?.name?.[0] ??
        error?.response?.data?.message ??
        t("renameSpaceModal.defaultError");

      setErrorMessage(nextErrorMessage);
      setView("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DrawerDialog
      open={isOpen}
      onClose={closeModal}
      className="overflow-hidden border-none bg-neutral-50 p-0 shadow-none dark:bg-neutral-900"
    >
      {isOpen ? (
        <div className="w-full">
          {view === "form" ? (
            <RenameSpaceFormState
              t={t}
              spaceName={draftName}
              logoName={logoName}
              isSaving={isSaving}
              onSpaceNameChange={setDraftName}
              onSubmit={() => submitRename(draftName)}
              onCancel={closeModal}
            />
          ) : view === "success" ? (
            <RenameSpaceSuccessState
              t={t}
              spaceName={lastAttemptedName}
              onDone={closeModal}
            />
          ) : (
            <RenameSpaceErrorState
              t={t}
              attemptedName={lastAttemptedName}
              errorMessage={errorMessage}
              isSaving={isSaving}
              onRetry={() => submitRename(lastAttemptedName)}
              onBack={() => setView("form")}
            />
          )}
        </div>
      ) : null}
    </DrawerDialog>
  );
};

export default RenameSpaceModal;
