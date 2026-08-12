"use client";

import React, { useState, type FormEvent } from "react";

import { DrawerDialog } from "../../../ui/drawer-dialog";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { useNitxUiTranslation } from "../../../../i18n/nitxuilib";
import { useAssetsStore } from "../../hooks/use-assets-store";
import {
  useAssetsQuery,
  useCreateFolderMutation,
} from "../../hooks/use-assets-query";

interface CreateFolderModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateFolderModal = ({ open, onClose }: CreateFolderModalProps) => {
  const { t } = useNitxUiTranslation();
  const [folderName, setFolderName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const path = useAssetsStore((s) => s.path);

  const parentId = path[path.length - 1]?.id || null;

  const { data } = useAssetsQuery(parentId, { enabled: open });
  const folders = data?.folders || [];
  const { mutateAsync: createFolder } = useCreateFolderMutation(parentId);

  if (!open) return null;

  const handleCreate = async () => {
    if (!folderName?.trim()) {
      setError(t("assets.createFolderModal.folderNameCannotBeEmpty"));
      return;
    }

    const existingFolder = folders.find(
      (folder) =>
        folder.name.toLowerCase() === folderName?.trim().toLowerCase() &&
        folder.parent_id === parentId
    );

    if (existingFolder) {
      setError(t("assets.createFolderModal.folderNameAlreadyExists"));
      return;
    }

    try {
      await createFolder({
        name: folderName.trim(),
        parentId: parentId,
      });
      setFolderName(null);
      onClose();
    } catch {
      // Error toast is handled by the mutation.
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCreate();
  };

  return (
    <DrawerDialog title={t("assets.createFolderModal.title")} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="px-3 lg:px-7 flex flex-col gap-3 lg:gap-5 pt-1 pb-5"
      >
        <div className="mb-4">
          <Input
            placeholder={t("assets.createFolderModal.folderNamePlaceholder")}
            value={folderName || ""}
            onChange={(e) => {
              setFolderName(e.target.value);
              setError(null);
            }}
            className="w-full"
          />
          {error && <p className="text-error text-sm mt-1">{error}</p>}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={onClose}>
            {t("assets.createFolderModal.cancel")}
          </Button>
          <Button type="submit">{t("assets.createFolderModal.create")}</Button>
        </div>
      </form>
    </DrawerDialog>
  );
};

export default CreateFolderModal;
