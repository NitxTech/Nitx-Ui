import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  icon: ReactNode;
}

const StatCard = ({ label, value, icon }: StatCardProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-neutral-200 rounded-xl shadow-sm dark:bg-neutral-900/40 dark:border-neutral-800">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
          {value}
        </span>
        <span className="text-xs text-neutral-500 font-medium dark:text-neutral-400">
          {label}
        </span>
      </div>
    </div>
  );
};

interface StatsCardsProps {
  items: StatCardProps[];
}

const StatsCards = ({ items }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
};

export type { StatCardProps };
export { StatCard };
export default StatsCards;
