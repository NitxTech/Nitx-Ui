import { Button } from "../../ui/button";

interface TablePaginationProps {
  currentPage: number;
  rowsPerPage: number;
  totalItems: number;
  totalPages: number;
  pageSizeOptions: number[];
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
}

const TablePagination = ({
  currentPage,
  rowsPerPage,
  totalItems,
  totalPages,
  pageSizeOptions,
  onPageChange,
  onRowsPerPageChange,
}: TablePaginationProps) => {
  if (totalItems === 0) return null;

  const safeTotalPages = totalPages || 1;
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between px-2 text-xs text-neutral-500 mt-2 dark:text-neutral-400">
      <div className="flex items-center gap-2">
        <select
          className="border border-neutral-200 rounded p-1 bg-neutral-50 focus:outline-none focus:border-primary dark:border-neutral-700 dark:bg-neutral-900"
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span>Rows per page</span>
      </div>

      <div className="flex items-center gap-4">
        <span>
          {startItem}-{endItem} of {totalItems}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            disabled={currentPage === 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          >
            <span className="sr-only">Previous</span>
            &lsaquo;
          </Button>
          <span className="text-neutral-900 font-medium dark:text-neutral-50">
            {currentPage} / {safeTotalPages} pages
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            disabled={currentPage >= safeTotalPages}
            onClick={() => onPageChange(Math.min(safeTotalPages, currentPage + 1))}
          >
            <span className="sr-only">Next</span>
            &rsaquo;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
