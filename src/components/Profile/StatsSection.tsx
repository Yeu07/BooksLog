import { useMemo } from "react";
import { SavedBook } from "@/src/types/book";

export function StatsSection({ books }: { books: SavedBook[] }) {
  const stats = useMemo(() => {
    const byFormat = books.reduce<Record<string, number>>((acc, b) => {
      acc[b.format] = (acc[b.format] ?? 0) + 1;
      return acc;
    }, {});
    const thisYear = new Date().getFullYear();
    const readThisYear = books.filter(
      (b) => new Date(b.readAt).getFullYear() === thisYear,
    ).length;
    return { byFormat, readThisYear, total: books.length };
  }, [books]);

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-default-50 border border-divider rounded-2xl p-4 flex flex-col gap-1">
        <p className="text-3xl font-bold tabular-nums">{stats.total}</p>
        <p className="text-xs text-default-400 font-medium">Libros totales</p>
      </div>
      <div className="bg-default-50 border border-divider rounded-2xl p-4 flex flex-col gap-1">
        <p className="text-3xl font-bold tabular-nums">{stats.readThisYear}</p>
        <p className="text-xs text-default-400 font-medium">Leídos este año</p>
      </div>
      <div className="bg-default-50 border border-divider rounded-2xl p-4 flex flex-col gap-1">
        <p className="text-3xl font-bold tabular-nums">
          {stats.byFormat["fisico"] ?? 0}
        </p>
        <p className="text-xs text-default-400 font-medium">Físicos</p>
      </div>
      <div className="bg-default-50 border border-divider rounded-2xl p-4 flex flex-col gap-1">
        <p className="text-3xl font-bold tabular-nums">
          {(stats.byFormat["kindle"] ?? 0) + (stats.byFormat["web"] ?? 0)}
        </p>
        <p className="text-xs text-default-400 font-medium">Digitales</p>
      </div>
    </section>
  );
}
