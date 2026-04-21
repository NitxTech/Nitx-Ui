import { useSpaceSelector } from "../../context";
import { DrawerDialog } from "../../ui/drawer-dialog";
import SpaceBrowser from "../../../spaces/SpaceBrowser";
import { useNitxUiTranslation } from "../../../../i18n/nitxuilib";

const BrowseSpaceModal = () => {
  const { t } = useNitxUiTranslation();
  const { activeModal, setModal } = useSpaceSelector();

  if (activeModal !== "browseSpace") return null;

  return (
    <DrawerDialog
      size="2xl"
      open={true}
      onClose={() => setModal(null)}
      title={t("browseSpacesModal.title")}
      className="p-0 overflow-hidden bg-neutral-50 dark:bg-neutral-900"
    >
      <SpaceBrowser />
    </DrawerDialog>
  );
};

export default BrowseSpaceModal;
