import React, { useState } from "react";
import { useNitxUiTranslation } from "../../i18n/nitxuilib";
import { cn } from "../../lib/utils";

interface InstructionItem {
  id: string;
  titleKey: string;
  textKey: string;
}

const EXTENSION_ITEMS: InstructionItem[] = [
  {
    id: "ublock",
    titleKey: "adBlocker.stepUblockTitle",
    textKey: "adBlocker.stepUblockText",
  },
  {
    id: "adblock",
    titleKey: "adBlocker.stepAdblockTitle",
    textKey: "adBlocker.stepAdblockText",
  },
  {
    id: "brave",
    titleKey: "adBlocker.stepBraveTitle",
    textKey: "adBlocker.stepBraveText",
  },
  {
    id: "other",
    titleKey: "adBlocker.stepOtherTitle",
    textKey: "adBlocker.stepOtherText",
  },
];

export interface AdBlockerInstructionsProps {
  className?: string;
}

export const AdBlockerInstructions: React.FC<AdBlockerInstructionsProps> = ({
  className,
}) => {
  const { t } = useNitxUiTranslation();
  const [activeTab, setActiveTab] = useState<string>("ublock");

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4 text-start dark:border-zinc-800 dark:bg-zinc-900/60 corner-squircle",
        className,
      )}
    >
      <div className="mb-2">
        <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
          {t("adBlocker.howToAllow")}
        </h4>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          {t("adBlocker.howToAllowInstructions")}
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-3 flex flex-wrap gap-1.5 border-b border-zinc-200/70 pb-2.5 dark:border-zinc-800">
        {EXTENSION_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-colors corner-squircle",
                isActive
                  ? "bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-200/70 dark:text-zinc-400 dark:hover:bg-zinc-800",
              )}
            >
              {t(item.titleKey)}
            </button>
          );
        })}
      </div>

      {/* Instruction text */}
      <div className="mt-2.5">
        {EXTENSION_ITEMS.map((item) => {
          if (activeTab !== item.id) return null;
          return (
            <p
              key={item.id}
              className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300"
            >
              {t(item.textKey)}
            </p>
          );
        })}
      </div>
    </div>
  );
};
