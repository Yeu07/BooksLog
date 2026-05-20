import { useState, useEffect } from "react";
import { BookDetailData } from "../types/book";

export function useBookDetails(book: BookDetailData | null, isOpen: boolean) {
  const [enriched, setEnriched] = useState<BookDetailData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!book || !isOpen) return;

    setEnriched(null);
    setLoading(true);

    fetch(
      `https://www.googleapis.com/books/v1/volumes/${book.id}?key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_KEY}`,
    )
      .then((r) => r.json())
      .then((data) => {
        const info = data.volumeInfo ?? {};
        const isbn =
          info.industryIdentifiers?.find(
            (i: any) => i.type === "ISBN_13" || i.type === "ISBN_10",
          )?.identifier ?? undefined;

        setEnriched({
          id: book.id,
          title: info.title ?? book.title,
          coverUrl:
            info.imageLinks?.large?.replace("http://", "https://") ??
            info.imageLinks?.thumbnail?.replace("http://", "https://") ??
            book.coverUrl,
          authors: info.authors ?? book.authors,
          description: info.description,
          publisher: info.publisher,
          publishedDate: info.publishedDate,
          pageCount: info.pageCount,
          categories: info.categories,
          averageRating: info.averageRating,
          ratingsCount: info.ratingsCount,
          language: info.language,
          previewLink: info.previewLink ?? data.accessInfo?.webReaderLink,
          isbn,
        });
      })
      .catch(() => {
        setEnriched(book);
      })
      .finally(() => setLoading(false));
  }, [book?.id, isOpen]);

  return { enriched: enriched ?? book, loading };
}
