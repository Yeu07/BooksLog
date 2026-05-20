import { Button } from "@heroui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 pt-1">
      <Button
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        isDisabled={currentPage === 0}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-divider bg-default-50 text-xs font-semibold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-default-100"
      >
        <FiChevronLeft className="w-3.5 h-3.5" /> Anterior
      </Button>
      <span className="text-xs font-bold px-2">
        {currentPage + 1} / {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        isDisabled={currentPage === totalPages - 1}
        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-divider bg-default-50 text-xs font-semibold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-default-100"
      >
        Siguiente <FiChevronRight className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}
