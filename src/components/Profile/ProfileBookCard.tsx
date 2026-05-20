import { FiInfo, FiEdit2, FiTrash2 } from "react-icons/fi";
import { SavedBook } from "@/src/types/book";
import {
  FORMAT_COLORS,
  FORMAT_LABELS,
  LANG_LABELS,
} from "@/src/constants/book";
import { formatShortDate } from "@/src/utils/date";
import { Button } from "@heroui/react";

interface ProfileBookCardProps {
  book: SavedBook;
  compact?: boolean;
  onOpenDetail: (b: SavedBook) => void;
  onOpenEdit: (b: SavedBook) => void;
  onOpenDelete: (b: SavedBook) => void;
}

export function ProfileBookCard({
  book,
  compact = false,
  onOpenDetail,
  onOpenEdit,
  onOpenDelete,
}: ProfileBookCardProps) {
  if (compact) {
    return (
      <div className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-divider bg-default-50/50 hover:bg-default-100/70 transition-colors">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-9 h-[54px] object-cover rounded-lg border border-divider flex-none shadow-sm"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {book.title}
          </p>
          <p className="text-xs text-default-400 truncate">{book.authors[0]}</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 flex-none">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${FORMAT_COLORS[book.format]}`}
          >
            {FORMAT_LABELS[book.format]}
          </span>
          <span className="text-[10px] text-default-400">
            {LANG_LABELS[book.language]?.split(" ")[0]}
          </span>
          <span className="text-[10px] text-default-400 hidden md:inline">
            {formatShortDate(book.readAt)}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-none">
          <Button
            onClick={() => onOpenDetail(book)}
            className="p-1.5 rounded-lg text-default-400 hover:text-primary hover:bg-primary/10 transition-all"
          >
            <FiInfo className="w-3.5 h-3.5" />
          </Button>
          <Button
            onClick={() => onOpenEdit(book)}
            className="p-1.5 rounded-lg text-default-400 hover:text-primary hover:bg-primary/10 transition-all"
          >
            <FiEdit2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            onClick={() => onOpenDelete(book)}
            className="p-1.5 rounded-lg text-default-400 hover:text-danger hover:bg-danger/10 transition-all"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col gap-1.5">
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-divider shadow-sm">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className={`absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-md border backdrop-blur-sm ${FORMAT_COLORS[book.format]}`}
        >
          {FORMAT_LABELS[book.format]}
        </div>
        {book.isBorrowed && (
          <div
            className="absolute top-1.5 right-1.5 bg-amber-500/80 backdrop-blur-sm rounded-full p-0.5"
            title="Prestado"
          >
            <span className="text-[8px] font-bold text-white px-0.5">P</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 gap-1.5">
          <p className="text-[10px] text-white/60">
            {formatShortDate(book.readAt)}
          </p>
          <div className="flex gap-1.5 w-full">
            <Button
              onClick={() => onOpenDetail(book)}
              className="flex-1 flex items-center justify-center p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all active:scale-95"
            >
              <FiInfo className="w-3.5 h-3.5" />
            </Button>
            <Button
              onClick={() => onOpenEdit(book)}
              className="flex-1 flex items-center justify-center p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all active:scale-95"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
            </Button>
            <Button
              onClick={() => onOpenDelete(book)}
              className="flex-1 flex items-center justify-center p-1.5 rounded-lg bg-red-500/60 hover:bg-red-500/80 text-white transition-all active:scale-95"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
      <p className="text-[11px] font-medium text-default-700 line-clamp-2 leading-tight">
        {book.title}
      </p>
      <p className="text-[10px] text-default-400 truncate">{book.authors[0]}</p>
    </div>
  );
}
