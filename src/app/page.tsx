"use client";

import { useState } from "react";

import { Book, BookDetailData } from "@/src/types/book";
import { useBookSearch } from "@/src/hooks/useBookSearch";
import { useLibrary } from "@/src/hooks/useLibrary";

import { Navbar } from "@/src/components/layout/Navbar";
import { Toast } from "@/src/components/ui/Toast";
import { AddBookModal } from "@/src/components/Library/AddBookModal";
import { BookDetailModal } from "@/src/components/BookDetail/BookDetailModal";

import { SearchHeader } from "@/src/components/Search/SearchHeader";
import { SearchResultsSection } from "@/src/components/Search/SearchResultsSection";
import { LibrarySection } from "@/src/components/Library/LibrarySection";

export default function Home() {
  const {
    query,
    setQuery,
    searching,
    searchResults,
    allResultsCount,
    currentPage,
    setCurrentPage,
    totalPages,
    handleSearch,
  } = useBookSearch();

  const {
    userEmail,
    recentBooks,
    loadingCollection,
    savingBook,
    saveToCollection,
    isBookInLibrary,
    signOut,
  } = useLibrary();

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailBook, setDetailBook] = useState<BookDetailData | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleSave = async (config: any) => {
    if (!selectedBook) return;
    const result = await saveToCollection(selectedBook, config);

    if (result.success) {
      setModalOpen(false);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } else {
      alert(result.errorMsg);
      if (result.errorMsg?.includes("registrado")) setModalOpen(false);
    }
  };

  const openDetail = (b: Book | BookDetailData) => {
    setDetailBook(b);
    setDetailOpen(true);
  };

  const openConfigModal = (b: Book) => {
    setSelectedBook(b);
    setModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar userEmail={userEmail} onSignOut={signOut} />

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-12">
        <SearchHeader
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          isSearching={searching}
        />

        <SearchResultsSection
          searching={searching}
          allResultsCount={allResultsCount}
          searchResults={searchResults}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          isBookInLibrary={isBookInLibrary}
          onOpenDetail={openDetail}
          onOpenConfigModal={openConfigModal}
        />

        <LibrarySection
          loadingCollection={loadingCollection}
          recentBooks={recentBooks}
          onOpenDetail={openDetail}
        />
      </div>

      {/* ── Modales y Notificaciones ── */}
      <AddBookModal
        book={selectedBook}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        isSaving={savingBook}
      />
      <BookDetailModal
        book={detailBook}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        onPrimaryAction={
          detailBook && !isBookInLibrary(detailBook.id)
            ? () => {
                setSelectedBook(detailBook);
                setModalOpen(true);
              }
            : undefined
        }
        primaryActionLabel="Agregar a biblioteca"
        primaryActionDisabled={
          detailBook ? isBookInLibrary(detailBook.id) : false
        }
      />
      <Toast
        message="¡Libro agregado a tu biblioteca!"
        isVisible={showSuccessToast}
      />
    </main>
  );
}
