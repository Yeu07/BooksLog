import { FiInfo } from "react-icons/fi";
import { SavedBook } from "@/src/types/book";
import { FORMAT_COLORS, FORMAT_LABELS } from "@/src/constants/book";
import { Button } from "@heroui/react";

interface LibraryBookCardProps {
  book: SavedBook;
  onOpenDetail: (book: SavedBook) => void;
}

export function LibraryBookCard({ book, onOpenDetail }: LibraryBookCardProps) {
  return (
    <div className="group flex flex-col gap-1.5">
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-divider shadow-sm">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={`absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md border backdrop-blur-sm ${
            FORMAT_COLORS[book.format] ??
            "bg-default-500/20 text-default-300 border-default-500/30"
          }`}
        >
          {FORMAT_LABELS[book.format] ?? book.format}
        </div>
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 gap-1.5">
          <p className="text-[10px] text-white/70">
            {new Date(book.readAt).toLocaleDateString("es-AR", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <Button
            onClick={() => onOpenDetail(book)}
            className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[10px] font-semibold transition-all active:scale-95"
          >
            <FiInfo className="w-3 h-3" /> Ver detalles
          </Button>
        </div>
      </div>
      <div>
        <p className="text-[11px] font-medium text-default-700 line-clamp-2 leading-tight">
          {book.title}
        </p>
        <p className="text-[10px] text-default-400 truncate mt-0.5">
          {book.authors[0]}
        </p>
      </div>
    </div>
  );
}
