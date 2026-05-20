import { useState, useMemo } from "react";
import { SavedBook, SortMode, ViewMode } from "@/src/types/book";
import { formatMonthYear } from "@/src/utils/date";
import { FORMAT_LABELS, LANG_LABELS } from "@/src/constants/book";

export function useProfileSort(books: SavedBook[]) {
  const [sortMode, setSortMode] = useState<SortMode>("recent");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const sortedBooks = useMemo(() => {
    const copy = [...books];
    if (sortMode === "recent" || sortMode === "year-month")
      return copy.sort(
        (a, b) => new Date(b.readAt).getTime() - new Date(a.readAt).getTime(),
      );
    if (sortMode === "oldest")
      return copy.sort(
        (a, b) => new Date(a.readAt).getTime() - new Date(b.readAt).getTime(),
      );
    if (sortMode === "format")
      return copy.sort((a, b) => a.format.localeCompare(b.format));
    if (sortMode === "language")
      return copy.sort((a, b) => a.language.localeCompare(b.language));
    return copy;
  }, [books, sortMode]);

  const groupData = useMemo(() => {
    if (sortMode === "recent" || sortMode === "oldest") return null;
    const groups: Record<string, SavedBook[]> = {};
    for (const book of sortedBooks) {
      let key = "";
      if (sortMode === "year-month") key = formatMonthYear(book.readAt);
      if (sortMode === "format")
        key = FORMAT_LABELS[book.format] ?? book.format;
      if (sortMode === "language")
        key = LANG_LABELS[book.language] ?? book.language;

      if (!groups[key]) groups[key] = [];
      groups[key].push(book);
    }
    return groups;
  }, [sortedBooks, sortMode]);

  return {
    sortMode,
    setSortMode,
    viewMode,
    setViewMode,
    sortedBooks,
    groupData,
  };
}
