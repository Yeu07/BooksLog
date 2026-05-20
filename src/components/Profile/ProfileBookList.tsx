import { SavedBook, ViewMode } from "@/src/types/book";
import { ProfileBookCard } from "./ProfileBookCard";

interface ProfileBookListProps {
  books: SavedBook[];
  viewMode: ViewMode;
  onOpenDetail: (b: SavedBook) => void;
  onOpenEdit: (b: SavedBook) => void;
  onOpenDelete: (b: SavedBook) => void;
}

export function ProfileBookList({
  books,
  viewMode,
  onOpenDetail,
  onOpenEdit,
  onOpenDelete,
}: ProfileBookListProps) {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-3">
        {books.map((b) => (
          <ProfileBookCard
            key={b.dbId}
            book={b}
            onOpenDetail={onOpenDetail}
            onOpenEdit={onOpenEdit}
            onOpenDelete={onOpenDelete}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {books.map((b) => (
        <ProfileBookCard
          key={b.dbId}
          book={b}
          compact
          onOpenDetail={onOpenDetail}
          onOpenEdit={onOpenEdit}
          onOpenDelete={onOpenDelete}
        />
      ))}
    </div>
  );
}
