"use client";

import React from "react";

import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";

export interface ConfirmDeleteState {
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
}

interface ConfirmDeleteDialogProps {
  state: ConfirmDeleteState | null;
  onClose: () => void;
}

const ConfirmDeleteDialog = ({ state, onClose }: ConfirmDeleteDialogProps) => {
  const { t } = useNitxUiTranslation();
  const [busy, setBusy] = React.useState(false);

  if (!state) return null;

  const handleConfirm = async () => {
    setBusy(true);
    try {
      await state.onConfirm();
    } finally {
      setBusy(false);
      onClose();
    }
  };

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{state.title}</DialogTitle>
          <DialogDescription>{state.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={busy}>
            {t("assets.confirmDeleteModal.cancel")}
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={busy}>
            {t("assets.confirmDeleteModal.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
