import { useState, useEffect, useCallback } from "react";
import { createClient } from "../utils/supabase/client";
import { Book, SavedBook } from "@/src/types/book";

export function useLibrary() {
  const supabase = createClient();

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [books, setBooks] = useState<SavedBook[]>([]);
  const [loadingCollection, setLoadingCollection] = useState(true);
  const [savingBook, setSavingBook] = useState(false);

  const fetchUserBooks = useCallback(async () => {
    setLoadingCollection(true);
    const { data, error } = await supabase
      .from("read_books")
      .select("*")
      .order("read_at", { ascending: false });

    if (!error && data) {
      setBooks(
        data.map((b: any) => ({
          dbId: b.id,
          id: b.google_book_id,
          title: b.title,
          coverUrl: b.cover_url,
          authors: b.authors,
          format: b.format,
          language: b.language,
          isBorrowed: b.is_borrowed,
          readAt: b.read_at,
        })),
      );
    }
    setLoadingCollection(false);
  }, [supabase]);

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? "");
        fetchUserBooks();
      } else {
        setLoadingCollection(false);
      }
    }
    loadData();
  }, [fetchUserBooks, supabase]);

  const saveToCollection = async (selectedBook: Book, config: any) => {
    setSavingBook(true);

    const { error } = await supabase.from("read_books").insert([
      {
        google_book_id: selectedBook.id,
        title: selectedBook.title,
        cover_url: selectedBook.coverUrl,
        authors: selectedBook.authors,
        format: config.format,
        language: config.language,
        is_borrowed: config.isBorrowed,
        read_at: new Date(config.readDate).toISOString(),
      },
    ]);

    if (!error) {
      await fetchUserBooks();
      setSavingBook(false);
      return { success: true };
    }

    setSavingBook(false);
    if (error.code === "23505") {
      return {
        success: false,
        errorMsg: "Este libro ya está registrado en tu colección.",
      };
    }
    return { success: false, errorMsg: `Error al guardar: ${error.message}` };
  };

  const updateBook = async (dbId: string, config: any) => {
    const { error } = await supabase
      .from("read_books")
      .update({
        format: config.format,
        language: config.language,
        is_borrowed: config.isBorrowed,
        read_at: new Date(config.readDate).toISOString(),
      })
      .eq("id", dbId);

    if (!error) {
      await fetchUserBooks();
      return { success: true };
    }
    return {
      success: false,
      errorMsg: `Error al actualizar: ${error.message}`,
    };
  };

  const deleteBook = async (dbId: string) => {
    const { error } = await supabase.from("read_books").delete().eq("id", dbId);
    if (!error) {
      await fetchUserBooks();
      return { success: true };
    }
    return { success: false, errorMsg: `Error al eliminar: ${error.message}` };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const isBookInLibrary = (bookId: string) => {
    return books.some((b) => b.id === bookId);
  };

  return {
    userEmail,
    books,
    recentBooks: books,
    loadingCollection,
    savingBook,
    saveToCollection,
    updateBook,
    deleteBook,
    isBookInLibrary,
    signOut,
  };
}
