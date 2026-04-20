import { Loader2 } from "lucide-react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { getFallbackText } from "./constants";

interface SettingsTabContentProps {
  title: string;
  spaceName: string;
  isSaving: boolean;
  onSpaceNameChange: (value: string) => void;
  onSave: () => void;
}

const SettingsTabContent = ({
  title,
  spaceName,
  isSaving,
  onSpaceNameChange,
  onSave,
}: SettingsTabContentProps) => {
  const logoText = getFallbackText(spaceName || "SP");

  return (
    <div className="flex-1 h-full min-h-0 flex flex-col gap-6 p-4 sm:p-8 overflow-y-auto pb-20">
      <h2 className="text-xl font-semibold capitalize mt-4">{title}</h2>

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <div className="w-[70px] h-[70px] shrink-0 rounded-2xl bg-neutral-900 text-white flex items-center justify-center text-lg font-semibold tracking-tight shadow-sm dark:bg-secondary dark:text-white">
            {logoText}
          </div>

          <div className="grid flex-1 items-center gap-1.5">
            <Label
              htmlFor="spaceName"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-200"
            >
              Space Name
            </Label>
            <Input
              type="text"
              id="spaceName"
              placeholder="Enter space name"
              value={spaceName}
              onChange={(event) => onSpaceNameChange(event.target.value)}
              className="bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-50"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={onSave}
            disabled={isSaving || !spaceName.trim()}
            className="bg-primary h-11 hover:bg-primary/90 dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary text-white min-w-[120px]"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTabContent;
