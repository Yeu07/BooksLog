import {
  FiCalendar,
  FiBookOpen,
  FiBook,
  FiGlobe,
  FiHash,
} from "react-icons/fi";
import { BookDetailData } from "@/src/types/book";

const LANG_LABELS: Record<string, string> = {
  es: "🇦🇷 Español",
  en: "🇺🇸 Inglés",
  pt: "🇧🇷 Portugués",
};

export function BookMetadata({ book }: { book: BookDetailData }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {book.publishedDate && (
        <div className="flex items-start gap-2 bg-default-50 border border-divider rounded-xl p-3">
          <FiCalendar className="w-3.5 h-3.5 text-default-400 mt-0.5 flex-none" />
          <div>
            <p className="text-[10px] text-default-400 font-semibold uppercase tracking-wider">
              Publicación
            </p>
            <p className="text-xs font-medium text-foreground mt-0.5">
              {book.publishedDate}
            </p>
          </div>
        </div>
      )}

      {book.pageCount && (
        <div className="flex items-start gap-2 bg-default-50 border border-divider rounded-xl p-3">
          <FiBookOpen className="w-3.5 h-3.5 text-default-400 mt-0.5 flex-none" />
          <div>
            <p className="text-[10px] text-default-400 font-semibold uppercase tracking-wider">
              Páginas
            </p>
            <p className="text-xs font-medium text-foreground mt-0.5">
              {book.pageCount.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {book.publisher && (
        <div className="flex items-start gap-2 bg-default-50 border border-divider rounded-xl p-3">
          <FiBook className="w-3.5 h-3.5 text-default-400 mt-0.5 flex-none" />
          <div>
            <p className="text-[10px] text-default-400 font-semibold uppercase tracking-wider">
              Editorial
            </p>
            <p className="text-xs font-medium text-foreground mt-0.5 line-clamp-2">
              {book.publisher}
            </p>
          </div>
        </div>
      )}

      {book.language && (
        <div className="flex items-start gap-2 bg-default-50 border border-divider rounded-xl p-3">
          <FiGlobe className="w-3.5 h-3.5 text-default-400 mt-0.5 flex-none" />
          <div>
            <p className="text-[10px] text-default-400 font-semibold uppercase tracking-wider">
              Idioma
            </p>
            <p className="text-xs font-medium text-foreground mt-0.5">
              {LANG_LABELS[book.language] ?? book.language.toUpperCase()}
            </p>
          </div>
        </div>
      )}

      {book.isbn && (
        <div className="flex items-start gap-2 bg-default-50 border border-divider rounded-xl p-3 col-span-2">
          <FiHash className="w-3.5 h-3.5 text-default-400 mt-0.5 flex-none" />
          <div>
            <p className="text-[10px] text-default-400 font-semibold uppercase tracking-wider">
              ISBN
            </p>
            <p className="text-xs font-medium text-foreground mt-0.5 font-mono">
              {book.isbn}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
