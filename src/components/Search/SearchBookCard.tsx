"use client";

import { useState } from "react";
import { FiInfo, FiCheck, FiPlus } from "react-icons/fi";
import { Book } from "@/src/types/book";
import { Button } from "@heroui/react";

interface SearchBookCardProps {
  book: Book;
  isAdded: boolean;
  onOpenDetail: (b: Book) => void;
  onOpenConfigModal: (b: Book) => void;
}

export function SearchBookCard({
  book,
  isAdded,
  onOpenDetail,
  onOpenConfigModal,
}: SearchBookCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="group flex flex-col gap-1.5">
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-divider shadow-sm cursor-pointer bg-default-100">
        {isImageLoading && (
          <div className="absolute inset-0 w-full h-full bg-default-300/50 animate-pulse rounded-xl" />
        )}

        <img
          src={book.coverUrl}
          alt={book.title}
          onLoad={() => setIsImageLoading(false)}
          className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
        />

        {!isImageLoading && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 gap-1.5">
            <p className="font-semibold text-[11px] text-white line-clamp-2 leading-tight">
              {book.title}
            </p>
            <p className="text-[10px] text-white/50 truncate">
              {book.authors[0]}
            </p>
            <div className="flex gap-1">
              <Button
                onClick={() => onOpenDetail(book)}
                className="flex-none flex items-center justify-center p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all active:scale-95"
                aria-label="Ver detalles"
              >
                <FiInfo className="w-3 h-3" />
              </Button>
              <Button
                onClick={() => !isAdded && onOpenConfigModal(book)}
                isDisabled={isAdded}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 ${
                  isAdded
                    ? "bg-emerald-500/30 text-emerald-300 cursor-default"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {isAdded ? (
                  <>
                    <FiCheck className="w-3 h-3" /> Agregado
                  </>
                ) : (
                  <>
                    <FiPlus className="w-3 h-3" /> Agregar
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {isAdded && (
          <div className="absolute top-1.5 right-1.5 bg-emerald-500 rounded-full p-0.5 shadow">
            <FiCheck className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>
      <p className="text-[11px] font-medium text-default-700 line-clamp-2 leading-tight">
        {book.title}
      </p>
    </div>
  );
}
