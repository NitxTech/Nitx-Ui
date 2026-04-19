import { UserPlus } from "lucide-react";

import { Button } from "../../ui/button";

interface MembersEmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onInvite: () => void;
}

const MembersEmptyState = ({
  title,
  description,
  actionLabel,
  onInvite,
}: MembersEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 min-h-[300px]">
      <div className="flex flex-col items-center gap-2 mb-4 opacity-50">
        <div className="w-16 h-8 bg-primary/10 rounded-md mb-[-10px] z-0 mx-auto" />
        <div className="w-20 h-10 bg-primary/10 rounded-md mb-[-15px] z-10 mx-auto border-2 border-white dark:border-neutral-800" />
        <div className="w-24 h-12 bg-neutral-50 border border-neutral-200 shadow-sm rounded-md z-20 flex items-center gap-2 px-2 dark:bg-neutral-900 dark:border-neutral-700">
          <div className="w-6 h-6 bg-neutral-200 rounded-full dark:bg-neutral-700" />
          <div className="h-2 w-10 bg-neutral-200 rounded-full dark:bg-neutral-700" />
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-4">{title}</h3>
      <p className="text-sm text-neutral-500 text-center max-w-sm mt-2 dark:text-neutral-300">
        {description}
      </p>
      <Button
        className="mt-6 bg-primary hover:bg-primary/90 dark:hover:bg-white dark:text-primary text-white rounded-md px-8 !h-12"
        onClick={onInvite}
      >
        <UserPlus className="w-4 h-4 mr-2" />
        {actionLabel}
      </Button>
    </div>
  );
};

export default MembersEmptyState;
