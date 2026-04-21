import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSpaceSelector } from "../../context";
import { DrawerDialog } from "../../ui/drawer-dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { toast } from "sonner";

const NewSpaceModal = () => {
  const { t } = useTranslation("nitxuilib");

  const {
    activeModal,
    setModal,
    api,
    setActiveSpace,
    authUser,
    refreshSpaces,
  } = useSpaceSelector();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = activeModal === "newSpace";

  useEffect(() => {
    if (!isModalOpen) {
      setName("");
      setIsLoading(false);
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const handleCreateSpace = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.length) return;
    if (authUser === undefined) return; // Basic validation

    setIsLoading(true);
    try {
      if (!api?.createSpace) throw new Error("API not configured");

      const spaceData = await api.createSpace(name);

      // Ensure space_uuid exists logic handled in API or here
      if (!spaceData.space_uuid && spaceData.uuid) {
        spaceData.space_uuid = spaceData.uuid;
      }

      refreshSpaces();
      setActiveSpace(spaceData); // Select it

      toast.success(t("newSpaceModal.spaceCreatedSuccessfully"));
      setName("");
      setModal(null);
    } catch (error: any) {
      console.error("Error creating space:", error);
      toast.error(t("newSpaceModal.failedToCreateSpace"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DrawerDialog
      open={isModalOpen}
      onClose={() => setModal(null)}
      className="p-0 overflow-hidden bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="w-full flex flex-col p-6">
        <div className="flex flex-col mb-4 gap-2">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
            {t("newSpaceModal.title")}
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {t("newSpaceModal.description")}
          </p>
        </div>
        <form
          className="flex flex-col flex-1 justify-between gap-6"
          onSubmit={handleCreateSpace}
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3 mt-2">
              <Label htmlFor="name">{t("newSpaceModal.typeName")}</Label>
              <Input
                id="name"
                placeholder={t("newSpaceModal.spaceNamePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={() => setModal(null)}
              variant="ghost"
              className="h-11 rounded-xl px-5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {t("newSpaceModal.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={!name || isLoading}
              size="smlg"
              className="min-w-24 h-11 text-white bg-primary dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary"
            >
              {isLoading
                ? t("newSpaceModal.creating")
                : t("newSpaceModal.create")}
            </Button>
          </div>
        </form>
      </div>
    </DrawerDialog>
  );
};

export default NewSpaceModal;
