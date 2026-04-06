"use client";

import { useSpaceSelector } from "../../context";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import React from "react";

const DeleteConfirmationModal = () => {
  const { t } = useTranslation("modals");
  const { activeModal, modalProps, setModal } = useSpaceSelector();
  const [isLoading, setIsLoading] = React.useState(false);

  if (activeModal !== "deleteConfirmation" || !modalProps?.deleteModalInfo) {
    return null;
  }

  const { title, description, onDelete } = modalProps.deleteModalInfo;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onDelete();
      setModal(null);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && setModal(null)}>
      <DialogContent
        overlayClassName="z-[10010]"
        className="sm:max-w-[400px] p-6 flex flex-col items-center text-center gap-4 text-neutral-900 bg-neutral-50 z-[10010] dark:text-neutral-50 dark:bg-neutral-900"
      >
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mb-1 dark:bg-red-500/10">
          <Trash2 className="w-6 h-6" />
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {title || t("deleteConfirmation")}
          </h3>
          <p className="text-sm text-neutral-500 max-w-[300px] mx-auto leading-relaxed dark:text-neutral-400">
            {description}
          </p>
        </div>

        <div className="flex flex-col w-full gap-2 mt-2">
          <Button
            onClick={handleConfirm}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg h-11"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              t("remove", "Remove")
            )}
          </Button>
          <Button
            variant="ghost"
            onClick={() => setModal(null)}
            className="w-full text-neutral-600 font-normal hover:bg-neutral-100 rounded-lg h-11 dark:text-neutral-300 dark:hover:bg-neutral-800"
            disabled={isLoading}
          >
            {t("cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
