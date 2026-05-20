"use client";

import { Modal, Button, Spinner } from "@heroui/react";
import { FiExternalLink, FiUser, FiAlignLeft, FiX } from "react-icons/fi";
import { BookDetailModalProps } from "@/src/types/book";
import { useBookDetails } from "@/src/hooks/useBookDetails";
import { StarRating } from "../ui/StarRating";
import { BookMetadata } from "./BookMetadata";

export function BookDetailModal({
  book,
  isOpen,
  onClose,
  onPrimaryAction,
  primaryActionLabel = "Agregar",
  primaryActionDisabled = false,
}: BookDetailModalProps) {
  const { enriched: displayed, loading } = useBookDetails(book, isOpen);

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal>
      <span aria-hidden style={{ display: "none" }} />
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={(open) => !open && onClose()}
      >
        <Modal.Container>
          <Modal.Dialog className="w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
            {({ close }) => (
              <>
                <Button
                  aria-label="Cerrar"
                  onClick={() => {
                    handleClose();
                    close();
                  }}
                  className="absolute top-4 right-4 p-2 text-default-400 hover:bg-default-100 rounded-full transition-all z-50"
                >
                  <FiX className="w-4 h-4" />
                </Button>

                {/* ── Header ── */}
                <Modal.Header className="p-0 overflow-hidden">
                  <div className="relative w-full h-36 bg-gradient-to-b from-default-200 to-default-100 overflow-hidden">
                    {displayed?.coverUrl && (
                      <img
                        src={displayed.coverUrl}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-40"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 flex items-end gap-4 px-5 pb-4 pr-10">
                      {displayed?.coverUrl && (
                        <img
                          src={displayed.coverUrl}
                          alt={displayed.title}
                          className="w-16 h-[96px] object-cover rounded-xl border border-divider shadow-lg flex-none -mb-6 relative z-10"
                        />
                      )}
                      <div className="pb-1 min-w-0">
                        {loading && !displayed?.description ? (
                          <div className="h-5 w-40 bg-default-300/50 rounded animate-pulse" />
                        ) : (
                          <Modal.Heading className="text-sm font-bold line-clamp-2 leading-snug">
                            {displayed?.title}
                          </Modal.Heading>
                        )}
                      </div>
                    </div>
                  </div>
                </Modal.Header>

                {/* ── Body ── */}
                <Modal.Body className="flex flex-col gap-5 overflow-y-auto pt-8 px-5 pb-4">
                  {loading && !displayed?.description ? (
                    <div className="flex justify-center py-8">
                      <Spinner />
                    </div>
                  ) : (
                    <>
                      {/* Autores */}
                      <div className="flex flex-wrap gap-1.5">
                        {displayed?.authors?.map((author) => (
                          <span
                            key={author}
                            className="flex items-center gap-1 text-xs text-default-500 bg-default-100 border border-divider px-2.5 py-1 rounded-full"
                          >
                            <FiUser className="w-3 h-3 flex-none" />
                            {author}
                          </span>
                        ))}
                      </div>

                      {/* Rating */}
                      {displayed?.averageRating && (
                        <StarRating
                          rating={displayed.averageRating}
                          count={displayed.ratingsCount}
                        />
                      )}

                      {/* Grilla de Metadatos extraída */}
                      {displayed && <BookMetadata book={displayed} />}

                      {/* Categorías */}
                      {displayed?.categories &&
                        displayed.categories.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {displayed.categories.map((cat) => (
                              <span
                                key={cat}
                                className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* Descripción */}
                      {displayed?.description ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-1.5">
                            <FiAlignLeft className="w-3.5 h-3.5 text-default-400" />
                            <p className="text-[10px] font-semibold text-default-400 uppercase tracking-wider">
                              Descripción
                            </p>
                          </div>
                          <p
                            className="text-xs text-default-600 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: displayed.description,
                            }}
                          />
                        </div>
                      ) : (
                        <p className="text-xs text-default-400 italic text-center py-2">
                          No hay descripción disponible para este libro.
                        </p>
                      )}
                    </>
                  )}
                </Modal.Body>

                {/* ── Footer ── */}
                <Modal.Footer className="flex gap-2 border-t border-divider pt-3">
                  {displayed?.previewLink && (
                    <a
                      href={displayed.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-default-500 hover:text-foreground border border-divider rounded-xl px-3 py-2 transition-all hover:bg-default-100"
                    >
                      <FiExternalLink className="w-3.5 h-3.5" />
                      Ver en Google Books
                    </a>
                  )}
                  <div className="flex gap-2 flex-1 justify-end">
                    <Button
                      variant="primary"
                      onPress={() => {
                        handleClose();
                        close();
                      }}
                      className="font-medium"
                    >
                      Cerrar
                    </Button>
                    {onPrimaryAction && (
                      <Button
                        variant="primary"
                        isDisabled={primaryActionDisabled}
                        onPress={() => {
                          onPrimaryAction();
                          handleClose();
                          close();
                        }}
                        className="font-semibold"
                      >
                        {primaryActionDisabled
                          ? "✓ Agregado"
                          : primaryActionLabel}
                      </Button>
                    )}
                  </div>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
