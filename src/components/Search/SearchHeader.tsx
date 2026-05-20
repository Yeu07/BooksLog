import { Button } from "@heroui/react";
import { FiSearch } from "react-icons/fi";

interface SearchHeaderProps {
  query: string;
  onQueryChange: (val: string) => void;
  onSearch: (e: React.FormEvent) => void;
  isSearching: boolean;
}

export function SearchHeader({
  query,
  onQueryChange,
  onSearch,
  isSearching,
}: SearchHeaderProps) {
  return (
    <section className="flex flex-col items-center gap-5 text-center pt-2">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          ¿Qué libro terminaste de leer?
        </h2>
        <p className="text-default-500 text-sm">
          Buscalo y agregalo a tu biblioteca personal.
        </p>
      </div>
      <form onSubmit={onSearch} className="flex gap-2 w-full max-w-lg">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-default-400 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Título, autor o ISBN..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-divider bg-default-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          isPending={isSearching}
          className="rounded-xl px-5 font-medium"
        >
          {!isSearching && "Buscar"}
        </Button>
      </form>
    </section>
  );
}
