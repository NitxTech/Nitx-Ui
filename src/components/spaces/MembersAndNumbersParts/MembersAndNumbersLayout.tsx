import type { ReactNode } from "react";

import { UserPlus } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Settings01Icon } from "@hugeicons/core-free-icons";

import { cn } from "../../../lib/utils";

import type { MembersAndNumbersTab } from "./constants";

interface MembersAndNumbersLayoutProps {
  activeTab: MembersAndNumbersTab;
  onTabChange: (tab: MembersAndNumbersTab) => void;
  spaceName?: string;
  membersLabel: string;
  settingsLabel: string;
  membersContent: ReactNode;
  settingsContent: ReactNode;
}

const MembersAndNumbersLayout = ({
  activeTab,
  onTabChange,
  spaceName,
  membersLabel,
  settingsLabel,
  membersContent,
  settingsContent,
}: MembersAndNumbersLayoutProps) => {
  return (
    <div className="flex flex-col sm:flex-row w-full min-h-full h-full bg-neutral-50 dark:bg-neutral-900">
      <div className="w-full sm:w-64 bg-neutral-50 border-b sm:border-b-0 sm:border-r border-neutral-200 p-4 flex flex-col gap-2 shrink-0 dark:bg-neutral-900 dark:border-neutral-800">
        <h3 className="text-sm font-semibold px-4 py-2 hidden sm:block">
          {spaceName || "Space Nitx"}
        </h3>

        <div className="flex flex-row sm:flex-col gap-2 overflow-x-auto no-scrollbar w-full">
          <button
            onClick={() => onTabChange("members")}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-normal transition-colors whitespace-nowrap flex-1 sm:w-full justify-center sm:justify-start",
              activeTab === "members"
                ? "bg-primary text-white dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
            )}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            {membersLabel}
          </button>

          <button
            onClick={() => onTabChange("settings")}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap flex-1 sm:w-full justify-center sm:justify-start",
              activeTab === "settings"
                ? "bg-primary text-white shadow-sm dark:bg-primarylight dark:hover:bg-primarylighter dark:text-primary"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800",
            )}
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <HugeiconsIcon icon={Settings01Icon} />
            </div>
            {settingsLabel}
          </button>
        </div>
      </div>

      <div className="overflow-y-auto w-full">
        {activeTab === "members" ? membersContent : settingsContent}
      </div>
    </div>
  );
};

export default MembersAndNumbersLayout;
