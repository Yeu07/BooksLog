"use client";

import { useState } from "react";
import { Spinner } from "@heroui/react";

import { SavedBook, BookDetailData } from "@/src/types/book";
import { useLibrary } from "@/src/hooks/useLibrary";
import { useProfileSort } from "@/src/hooks/useProfileSort";

import { BookDetailModal } from "@/src/components/BookDetail/BookDetailModal";
import { AddBookModal } from "@/src/components/Library/AddBookModal";
import { StatsSection } from "@/src/components/Profile/StatsSection";
import { DeleteConfirmModal } from "@/src/components/Profile/DeleteConfirmModal";
import { ProfileHeader } from "@/src/components/Profile/ProfileHeader";
import { ProfileToolbar } from "@/src/components/Profile/ProfileToolbar";
import { ProfileContentManager } from "@/src/components/Profile/ProfileContentManager";

export default function ProfilePage() {
  const { userEmail, books, loadingCollection, updateBook, deleteBook } =
    useLibrary();

  const {
    sortMode,
    setSortMode,
    viewMode,
    setViewMode,
    sortedBooks,
    groupData,
  } = useProfileSort(books);

  const [detailBook, setDetailBook] = useState<BookDetailData | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [editingBook, setEditingBook] = useState<SavedBook | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [deletingBook, setDeletingBook] = useState<SavedBook | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSaveEdit = async (config: any) => {
    if (!editingBook) return;
    setSaving(true);
    const result = await updateBook(editingBook.dbId, config);
    setSaving(false);
    if (result.success) setEditModalOpen(false);
    else alert(result.errorMsg);
  };

  const handleDelete = async () => {
    if (!deletingBook) return;
    setDeleting(true);
    const result = await deleteBook(deletingBook.dbId);
    setDeleting(false);
    if (result.success) setDeleteModalOpen(false);
    else alert(result.errorMsg);
  };

  const openDetail = (b: SavedBook) => {
    setDetailBook(b);
    setDetailOpen(true);
  };
  const openEdit = (b: SavedBook) => {
    setEditingBook(b);
    setEditModalOpen(true);
  };
  const openDelete = (b: SavedBook) => {
    setDeletingBook(b);
    setDeleteModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ProfileHeader userEmail={userEmail} />

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8">
        {loadingCollection ? (
          <div className="flex justify-center py-24">
            <Spinner />
          </div>
        ) : (
          <>
            <StatsSection books={books} />

            <ProfileToolbar
              sortMode={sortMode}
              setSortMode={setSortMode}
              viewMode={viewMode}
              setViewMode={setViewMode}
            />

            <ProfileContentManager
              books={books}
              sortedBooks={sortedBooks}
              groupData={groupData}
              viewMode={viewMode}
              onOpenDetail={openDetail}
              onOpenEdit={openEdit}
              onOpenDelete={openDelete}
            />
          </>
        )}
      </div>

      {/* ── Modales ── */}
      <AddBookModal
        book={editingBook}
        existingData={editingBook}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
        isSaving={saving}
      />
      <DeleteConfirmModal
        book={deletingBook}
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        isDeleting={deleting}
      />
      <BookDetailModal
        book={detailBook}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </main>
  );
}
