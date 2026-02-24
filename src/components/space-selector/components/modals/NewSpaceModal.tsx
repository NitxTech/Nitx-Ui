import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSpaceSelector } from "../../context";
import { DrawerDialog } from "../../ui/drawer-dialog";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { toast } from "sonner";

const NewSpaceModal = () => {
  const { t } = useTranslation("modals");

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
      title={t("newSpaceModal.title")}
      className="p-0 overflow-hidden bg-neutral-50 dark:bg-neutral-900"
    >
      <div className="w-full flex flex-col gap-5 mt-5 relative min-h-[23rem]">
        <form
          className="flex-1 px-2 flex flex-col justify-between gap-3 lg:gap-9"
          onSubmit={handleCreateSpace}
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">{t("newSpaceModal.typeName")}</Label>
              <Input
                id="name"
                placeholder={t("newSpaceModal.spaceNamePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pb-7">
            <Button
              type="button"
              onClick={() => setModal(null)}
              variant="outline"
            >
              {t("newSpaceModal.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={!name || isLoading}
              className="min-w-20"
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
