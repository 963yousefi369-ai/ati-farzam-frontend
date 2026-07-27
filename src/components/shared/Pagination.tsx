"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn, toFa } from "@/lib/utils";

interface AfiPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function AfiPagination({
  currentPage,
  totalPages,
  onPageChange,
}: AfiPaginationProps) {
  if (totalPages <= 1) return null;
  const getPages = (): (number | "ellipsis")[] => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "ellipsis")[] = [1];
    if (currentPage > 3) pages.push("ellipsis");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    )
      pages.push(i);
    if (currentPage < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  };
  return (
    <Pagination dir="rtl" className="overflow-x-auto py-1">
      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage === 1}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={cn(
              "min-h-10 rounded-xl border border-border-default",
              currentPage === 1
                ? "pointer-events-none opacity-40"
                : "cursor-pointer hover:bg-bg-secondary",
            )}
          />
        </PaginationItem>
        {getPages().map((page, idx) =>
          page === "ellipsis" ? (
            <PaginationItem key={`e-${idx}`} className="hidden sm:block">
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                aria-current={page === currentPage ? "page" : undefined}
                onClick={() => onPageChange(page)}
                className={cn(
                  "min-h-10 min-w-10 cursor-pointer rounded-xl border",
                  page === currentPage
                    ? "border-primary bg-primary text-white"
                    : "border-border-default bg-white hover:bg-bg-secondary",
                )}
              >
                {toFa(page)}
              </PaginationLink>
            </PaginationItem>
          ),
        )}
        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage === totalPages}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            className={cn(
              "min-h-10 rounded-xl border border-border-default",
              currentPage === totalPages
                ? "pointer-events-none opacity-40"
                : "cursor-pointer hover:bg-bg-secondary",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
