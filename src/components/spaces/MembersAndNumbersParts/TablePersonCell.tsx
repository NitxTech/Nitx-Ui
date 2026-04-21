import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

import { getFallbackText } from "./constants";

interface TablePersonCellProps {
  title: string;
  subtitle: string;
  fallbackValue: string;
  avatarSrc?: string;
}

const TablePersonCell = ({
  title,
  subtitle,
  fallbackValue,
  avatarSrc,
}: TablePersonCellProps) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-10 h-12 w-12 !rounded-sm">
        <AvatarImage src={avatarSrc} />
        <AvatarFallback className="bg-primary/10 text-primary dark:bg-secondary dark:text-white text-sm !rounded-sm font-semibold">
          {getFallbackText(fallbackValue)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
          {title}
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

export default TablePersonCell;
