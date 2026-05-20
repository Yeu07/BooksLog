export interface BookDetailData {
  id: string;
  title: string;
  coverUrl: string;
  authors: string[];
  description?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
  language?: string;
  previewLink?: string;
  isbn?: string;
}

export interface BookDetailModalProps {
  book: BookDetailData | null;
  isOpen: boolean;
  onClose: () => void;
  onPrimaryAction?: () => void;
  primaryActionLabel?: string;
  primaryActionDisabled?: boolean;
}

export interface Book {
  id: string;
  title: string;
  coverUrl: string;
  authors: string[];
}

export interface SavedBook extends Book {
  dbId: string;
  format: "fisico" | "kindle" | "web";
  language: string;
  isBorrowed: boolean;
  readAt: string;
}

export type SortMode =
  | "recent"
  | "oldest"
  | "year-month"
  | "format"
  | "language";
export type ViewMode = "grid" | "list";
