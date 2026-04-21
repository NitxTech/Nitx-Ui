import type { ReactNode } from "react";

import { cn } from "../../../lib/utils";

import {
  type DataTableColumn,
  TABLE_CONTAINER_CLASS,
  TABLE_HEADER_CLASS,
} from "./constants";

interface DataTableShellProps {
  columns: DataTableColumn[];
  children?: ReactNode;
  emptyState?: ReactNode;
  hasRows?: boolean;
  className?: string;
}

const DataTableShell = ({
  columns,
  children,
  emptyState,
  hasRows = true,
  className,
}: DataTableShellProps) => {
  return (
    <div className={cn(TABLE_CONTAINER_CLASS, className)}>
      <div className={TABLE_HEADER_CLASS}>
        {columns.map((column) => (
          <div key={column.label} className={column.className}>
            {column.label}
          </div>
        ))}
      </div>

      {hasRows ? children : emptyState}
    </div>
  );
};

export default DataTableShell;
