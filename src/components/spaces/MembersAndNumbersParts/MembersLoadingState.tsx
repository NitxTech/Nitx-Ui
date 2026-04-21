import { Skeleton } from "../../ui/skeleton";

const LoadingTableCard = ({ rowCount }: { rowCount: number }) => {
  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden dark:border-neutral-800">
      <div className="bg-neutral-50/50 p-4 border-b border-neutral-200 hidden sm:block dark:bg-neutral-900/40 dark:border-neutral-800">
        <div className="grid grid-cols-[1fr_200px_100px] gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-10 ml-auto" />
        </div>
      </div>

      {Array.from({ length: rowCount }).map((_, index) => (
        <div
          key={index}
          className="p-4 border-b border-neutral-200 last:border-0 relative dark:border-neutral-800"
        >
          <div className="flex flex-col sm:grid sm:grid-cols-[1fr_200px_100px] gap-4 items-start sm:items-center">
            <div className="flex items-center gap-3 w-full">
              <Skeleton className="w-8 h-8 rounded-md" />
              <div className="flex flex-col gap-1 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <Skeleton className="h-8 w-20 ml-11 sm:ml-0" />
            <Skeleton className="h-8 w-8 absolute right-4 top-4 sm:static sm:ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};

const MembersLoadingState = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
      </div>

      <LoadingTableCard rowCount={1} />

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>

        <LoadingTableCard rowCount={5} />
      </div>
    </div>
  );
};

export default MembersLoadingState;
