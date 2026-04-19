import type { ReactNode } from "react";

import MembersLoadingState from "./MembersLoadingState";
import type { StatCardProps } from "./StatsCards";
import StatsCards from "./StatsCards";

interface MembersTabContentProps {
  title: string;
  stats: StatCardProps[];
  loading: boolean;
  pendingInvitesContent?: ReactNode;
  membersContent: ReactNode;
}

const MembersTabContent = ({
  title,
  stats,
  loading,
  pendingInvitesContent,
  membersContent,
}: MembersTabContentProps) => {
  return (
    <div className="flex-1 h-full min-h-0 flex flex-col gap-6 p-4 sm:p-6 overflow-y-auto pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold capitalize">{title}</h2>
      </div>

      <StatsCards items={stats} />

      {loading ? (
        <MembersLoadingState />
      ) : (
        <>
          {pendingInvitesContent}
          {membersContent}
        </>
      )}
    </div>
  );
};

export default MembersTabContent;
