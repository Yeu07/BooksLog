import { FiFilter, FiGrid, FiList } from "react-icons/fi";
import { SortMode, ViewMode } from "@/src/types/book";

interface ProfileToolbarProps {
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export function ProfileToolbar({
  sortMode,
  setSortMode,
  viewMode,
  setViewMode,
}: ProfileToolbarProps) {
  const sortOptions: { key: SortMode; label: string }[] = [
    { key: "recent", label: "Más reciente" },
    { key: "oldest", label: "Más antiguo" },
    { key: "year-month", label: "Año / Mes" },
    { key: "format", label: "Formato" },
    { key: "language", label: "Idioma" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 justify-between">
      <div className="flex items-center gap-2">
        <FiFilter className="w-3.5 h-3.5 text-default-400" />
        <p className="text-sm font-semibold text-default-600">Ordenar por</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {sortOptions.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSortMode(key)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all cursor-pointer active:scale-95 ${
              sortMode === key
                ? "bg-foreground text-background border-foreground shadow-sm"
                : "bg-transparent text-default-500 border-default-300 hover:border-default-500 hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}

        <div className="flex items-center bg-default-100 border border-divider rounded-lg overflow-hidden ml-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 transition-all cursor-pointer active:scale-95 ${
              viewMode === "grid"
                ? "bg-foreground text-background"
                : "text-default-400 hover:text-foreground"
            }`}
          >
            <FiGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 transition-all cursor-pointer active:scale-95 ${
              viewMode === "list"
                ? "bg-foreground text-background"
                : "text-default-400 hover:text-foreground"
            }`}
          >
            <FiList className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
