import type { Member } from "../../space-selector/types";
import { Button } from "../../ui/button";
import { Dialog, DialogContent } from "../../ui/dialog";

import { getFallbackText } from "./constants";
import { useNitxUiTranslation } from "../../../i18n/nitxuilib";

interface RemoveMemberDialogProps {
  member: Member | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const RemoveMemberDialog = ({
  member,
  onOpenChange,
  onConfirm,
}: RemoveMemberDialogProps) => {
  const { t } = useNitxUiTranslation();
  if (!member) return null;

  return (
    <Dialog open={!!member} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="z-[10010]"
        className="sm:max-w-[400px] p-6 flex flex-col items-center text-center gap-4 z-[10010] border-none shadow-none bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50"
      >
        <div className="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center mb-1 font-bold text-lg">
          {getFallbackText(member.name)}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {t("removeMemberDialog.title", { email: member.email })}
          </h3>
          <p className="text-sm text-neutral-500 max-w-[300px] mx-auto leading-relaxed dark:text-neutral-400">
            {t("removeMemberDialog.description")}
          </p>
        </div>

        <div className="flex flex-col w-full gap-2 mt-2">
          <Button
            onClick={onConfirm}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg h-11"
          >
            {t("removeMemberDialog.confirm")}
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full text-neutral-600 font-normal hover:bg-neutral-100 rounded-lg h-11 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {t("removeMemberDialog.cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveMemberDialog;
