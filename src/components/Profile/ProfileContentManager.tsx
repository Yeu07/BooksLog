import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FiBookOpen } from "react-icons/fi";
import { SavedBook, ViewMode } from "@/src/types/book";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { ProfileBookList } from "./ProfileBookList";

interface ProfileContentManagerProps {
  books: SavedBook[];
  sortedBooks: SavedBook[];
  groupData: Record<string, SavedBook[]> | null;
  viewMode: ViewMode;
  onOpenDetail: (b: SavedBook) => void;
  onOpenEdit: (b: SavedBook) => void;
  onOpenDelete: (b: SavedBook) => void;
}

export function ProfileContentManager({
  books,
  sortedBooks,
  groupData,
  viewMode,
  onOpenDetail,
  onOpenEdit,
  onOpenDelete,
}: ProfileContentManagerProps) {
  const router = useRouter();

  if (books.length === 0) {
    return (
      <EmptyState
        icon={<FiBookOpen className="w-8 h-8 text-default-400" />}
        title="No hay libros todavía"
        description="Agregá tu primera lectura desde la página principal."
        action={
          <Button
            variant="primary"
            onPress={() => router.push("/")}
            className="mt-2"
          >
            Ir al inicio
          </Button>
        }
      />
    );
  }

  if (groupData) {
    return (
      <div className="flex flex-col gap-8">
        {Object.entries(groupData).map(([title, bks]) => (
          <div key={title} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h4 className="text-xs font-bold text-default-500 uppercase tracking-widest capitalize whitespace-nowrap">
                {title}
              </h4>
              <span className="text-xs text-default-300 bg-default-100 px-2 py-0.5 rounded-full">
                {bks.length}
              </span>
              <div className="h-px flex-1 bg-divider" />
            </div>
            <ProfileBookList
              books={bks}
              viewMode={viewMode}
              onOpenDetail={onOpenDetail}
              onOpenEdit={onOpenEdit}
              onOpenDelete={onOpenDelete}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ProfileBookList
      books={sortedBooks}
      viewMode={viewMode}
      onOpenDetail={onOpenDetail}
      onOpenEdit={onOpenEdit}
      onOpenDelete={onOpenDelete}
    />
  );
}
