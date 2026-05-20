import { Spinner } from "@heroui/react";
import { Book } from "@/src/types/book";
import { SearchBookCard } from "./SearchBookCard";
import { Pagination } from "../ui/Pagination";

interface SearchResultsSectionProps {
  searching: boolean;
  allResultsCount: number;
  searchResults: Book[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  isBookInLibrary: (id: string) => boolean;
  onOpenDetail: (book: Book) => void;
  onOpenConfigModal: (book: Book) => void;
}

export function SearchResultsSection({
  searching,
  allResultsCount,
  searchResults,
  currentPage,
  totalPages,
  setCurrentPage,
  isBookInLibrary,
  onOpenDetail,
  onOpenConfigModal,
}: SearchResultsSectionProps) {
  if (searching) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-default-400 font-medium animate-pulse">
          Buscando libros...
        </p>
      </div>
    );
  }

  if (allResultsCount === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {searchResults.map((book) => (
          <SearchBookCard
            key={book.id}
            book={book}
            isAdded={isBookInLibrary(book.id)}
            onOpenDetail={onOpenDetail}
            onOpenConfigModal={onOpenConfigModal}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}
