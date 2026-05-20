import { useState, useRef } from "react";
import { Book } from "@/src/types/book";
import { PAGE_SIZE } from "@/src/constants/book";

export function useBookSearch() {
  const [query, setQuery] = useState("");
  const [allResults, setAllResults] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searching, setSearching] = useState(false);

  const searchCache = useRef<Record<string, Book[]>>({});

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery || searching) return;

    if (searchCache.current[cleanQuery]) {
      setAllResults(searchCache.current[cleanQuery]);
      setCurrentPage(0);
      return;
    }

    setSearching(true);
    setAllResults([]);
    setCurrentPage(0);

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query.trim(),
        )}&maxResults=40&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_KEY}`,
      );

      if (res.status === 429) {
        alert(
          "Google bloqueó temporalmente la petición (Error 429). Esperá 1 o 2 minutos.",
        );
        return;
      }

      const data = await res.json();

      if (data.items) {
        const books: Book[] = data.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          coverUrl:
            item.volumeInfo.imageLinks?.thumbnail?.replace(
              "http://",
              "https://",
            ) || "https://placehold.co/300x450/f4f4f5/a1a1aa?text=Sin+Portada",
          authors: item.volumeInfo.authors || ["Autor Desconocido"],
        }));
        searchCache.current[cleanQuery] = books;
        setAllResults(books);
      } else {
        setAllResults([]);
      }
    } catch (err) {
      console.error("Error buscando libros:", err);
    } finally {
      setSearching(false);
    }
  };

  const totalPages = Math.ceil(allResults.length / PAGE_SIZE);
  const searchResults = allResults.slice(
    currentPage * PAGE_SIZE,
    currentPage * PAGE_SIZE + PAGE_SIZE,
  );

  return {
    query,
    setQuery,
    searching,
    searchResults,
    allResultsCount: allResults.length,
    currentPage,
    setCurrentPage,
    totalPages,
    handleSearch,
  };
}
