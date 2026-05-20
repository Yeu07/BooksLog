import { Spinner } from "@heroui/react";
import { FiBookOpen } from "react-icons/fi";
import { SavedBook, BookDetailData } from "@/src/types/book";
import { EmptyState } from "../ui/EmptyState";
import { LibraryBookCard } from "./LibraryBookCard";

interface LibrarySectionProps {
  loadingCollection: boolean;
  recentBooks: SavedBook[];
  onOpenDetail: (book: BookDetailData) => void;
}

export function LibrarySection({
  loadingCollection,
  recentBooks,
  onOpenDetail,
}: LibrarySectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-base">Mi Biblioteca</h3>
        {recentBooks.length > 0 && (
          <span className="text-xs text-default-400 bg-default-100 px-2.5 py-1 rounded-full">
            {recentBooks.length} {recentBooks.length === 1 ? "libro" : "libros"}
          </span>
        )}
      </div>

      {loadingCollection ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : recentBooks.length === 0 ? (
        <EmptyState
          icon={<FiBookOpen className="w-8 h-8 text-default-400" />}
          title="Tu biblioteca está vacía"
          description="Buscá un libro y registrá tu primera lectura."
        />
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-3">
          {recentBooks.map((book) => (
            <LibraryBookCard
              key={`${book.id}-${book.readAt}`}
              book={book}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      )}
    </section>
  );
}
