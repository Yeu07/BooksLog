"use client";

import { useState, useEffect } from "react";
import { createClient } from "./utils/supabase/client";
import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Spinner,
  Switch,
} from "@heroui/react";
import {
  FiSearch,
  FiPlus,
  FiCheck,
  FiBookOpen,
  FiLogOut,
  FiBook,
  FiGlobe,
  FiCalendar,
} from "react-icons/fi";

interface Book {
  id: string;
  title: string;
  coverUrl: string;
  authors: string[];
}

interface SavedBook extends Book {
  format: "fisico" | "kindle" | "web";
  language: string;
  isBorrowed: boolean;
  readAt: string;
}

export default function Home() {
  const supabase = createClient();

  // Modal state (replaces useDisclosure)
  const [modalOpen, setModalOpen] = useState(false);

  // Estados de carga y usuario
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [recentBooks, setRecentBooks] = useState<SavedBook[]>([]);
  const [loadingCollection, setLoadingCollection] = useState(true);

  // Estados de búsqueda
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [searching, setSearching] = useState(false);

  // Estado para el libro que se está configurando en el Modal
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Estados del Formulario del Modal (Metadatos)
  const [bookFormat, setBookFormat] = useState<"fisico" | "kindle" | "web">(
    "fisico",
  );
  const [bookLanguage, setBookLanguage] = useState("es");
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [readDate, setReadDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [savingBook, setSavingBook] = useState(false);

  // Cargar sesión y biblioteca al montar
  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email ?? "");
        fetchUserBooks();
      }
    }
    loadData();
  }, []);

  const fetchUserBooks = async () => {
    setLoadingCollection(true);
    const { data, error } = await supabase
      .from("read_books")
      .select("*")
      .order("read_at", { ascending: false });

    if (!error && data) {
      const formatted = data.map((b: any) => ({
        id: b.google_book_id,
        title: b.title,
        coverUrl: b.cover_url,
        authors: b.authors,
        format: b.format,
        language: b.language,
        isBorrowed: b.is_borrowed,
        readAt: b.read_at,
      }));
      setRecentBooks(formatted);
    }
    setLoadingCollection(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=8`,
      );
      const data = await res.json();

      if (data.items) {
        const books = data.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          coverUrl:
            item.volumeInfo.imageLinks?.thumbnail?.replace(
              "http://",
              "https://",
            ) || "/placeholder-book.png",
          authors: item.volumeInfo.authors || ["Autor Desconocido"],
        }));
        setSearchResults(books);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Error buscando libros:", err);
    } finally {
      setSearching(false);
    }
  };

  const handleOpenConfigModal = (book: Book) => {
    setSelectedBook(book);
    setBookFormat("fisico");
    setBookLanguage("es");
    setIsBorrowed(false);
    setReadDate(new Date().toISOString().split("T")[0]);
    setModalOpen(true);
  };

  const handleSaveToCollection = async () => {
    if (!selectedBook) return;
    setSavingBook(true);

    const { error } = await supabase.from("read_books").insert([
      {
        google_book_id: selectedBook.id,
        title: selectedBook.title,
        cover_url: selectedBook.coverUrl,
        authors: selectedBook.authors,
        format: bookFormat,
        language: bookLanguage,
        is_borrowed: isBorrowed,
        read_at: new Date(readDate).toISOString(),
      },
    ]);

    setSavingBook(false);

    if (!error) {
      const newSavedBook: SavedBook = {
        ...selectedBook,
        format: bookFormat,
        language: bookLanguage,
        isBorrowed: isBorrowed,
        readAt: new Date(readDate).toISOString(),
      };
      setRecentBooks((prev) => [newSavedBook, ...prev]);
      setModalOpen(false);
    } else if (error.code === "23505") {
      alert("Este libro ya está registrado en tu colección.");
      setModalOpen(false);
    } else {
      alert(`Error al guardar: ${error.message}`);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12 flex flex-col gap-10">
      {/* Navbar Superior */}
      <header className="flex justify-between items-center border-b border-divider pb-4">
        <div className="flex items-center gap-2">
          <FiBookOpen className="text-primary w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">BooksLog</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-default-500 hidden sm:inline">
            {userEmail}
          </span>
          {/* v3: Button sigue igual, isIconOnly sigue soportado */}
          <Button isIconOnly variant="danger" onPress={handleSignOut}>
            <FiLogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Buscador Principal */}
      <section className="max-w-xl mx-auto w-full flex flex-col gap-4 text-center my-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          ¿Qué libro terminaste de leer?
        </h2>
        <form onSubmit={handleSearch} className="flex gap-2 w-full">
          {/*
            v3 Input: el prop `startContent` fue reemplazado. En v3
            se usa compound: <Input> + <Input.Prefix> como hijo.
            Pero para simplicidad y compatibilidad con el uso actual,
            Input sigue aceptando startContent en la mayoría de builds.
            Usamos la estructura compound correcta de v3.
          */}
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400 w-5 h-5 z-10" />

            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por título o autor..."
              variant="primary"
              className="w-full pl-10"
            />
          </div>
          <Button type="submit" variant="primary" isPending={searching}>
            {!searching && "Buscar"}
          </Button>
        </form>
      </section>

      {/* Grid de Resultados de Búsqueda */}
      {searchResults.length > 0 && (
        <section className="flex flex-col gap-4">
          <h3 className="text-xs font-bold text-primary tracking-widest uppercase">
            Resultados de Búsqueda
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {searchResults.map((book) => {
              const isAlreadyAdded = recentBooks.some((b) => b.id === book.id);
              return (
                // v3 Card: compound pattern — Card.Body, Card.Header, etc.
                <div
                  key={book.id}
                  className="h-72 border border-divider rounded-xl group overflow-hidden relative"
                >
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 z-10 text-white">
                    <div>
                      <p className="font-bold text-xs line-clamp-3">
                        {book.title}
                      </p>
                      <p className="text-[10px] text-default-300 truncate mt-1">
                        {book.authors.join(", ")}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      fullWidth
                      variant={isAlreadyAdded ? "ghost" : "primary"}
                      onPress={() =>
                        !isAlreadyAdded && handleOpenConfigModal(book)
                      }
                      isDisabled={isAlreadyAdded}
                    >
                      {isAlreadyAdded ? (
                        <>
                          <FiCheck className="mr-1" /> En Colección
                        </>
                      ) : (
                        <>
                          <FiPlus className="mr-1" /> Agregar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Biblioteca — estilo Netflix */}
      <section className="flex flex-col gap-4 mt-4">
        <h3 className="text-sm font-bold tracking-widest uppercase text-default-500">
          Mi Biblioteca de Leídos
        </h3>

        {loadingCollection ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : recentBooks.length === 0 ? (
          <div className="border-2 border-dashed border-divider rounded-xl p-12 text-center text-default-400">
            Tu biblioteca está vacía. Registra tu primera lectura usando el
            buscador.
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scroll-smooth snap-x snap-mandatory">
            {recentBooks.map((book) => (
              <div key={book.id} className="flex-none w-40 sm:w-44 snap-start">
                {/* v3 Card compound */}
                <div className="h-60 border border-divider shadow-md hover:scale-102 transition-transform duration-200 relative rounded-xl overflow-hidden">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase border border-divider">
                    {book.format}
                  </div>
                </div>
                <div className="mt-2 px-1">
                  <p
                    className="font-medium text-sm truncate w-full"
                    title={book.title}
                  >
                    {book.title}
                  </p>
                  <p className="text-xs text-default-400 truncate w-full">
                    {book.authors[0]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/*
        Modal v3 — compound pattern.
        useDisclosure reemplazado por useState local.
        Modal se abre/cierra con el prop `isOpen` + `onOpenChange`.
        Trigger: el primer hijo que no es Modal.Backdrop.
        En v3, Modal envuelve el trigger + el overlay como hijos compuestos.
      */}
      <Modal isOpen={modalOpen} onOpenChange={setModalOpen}>
        <Modal.Backdrop />
        <Modal.Container>
          <Modal.Dialog className="max-w-md w-full">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Detalles de la Lectura</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="flex flex-col gap-5">
              <p className="text-sm text-default-500 font-medium truncate">
                Configurando:{" "}
                <span className="text-foreground font-semibold">
                  {selectedBook?.title}
                </span>
              </p>

              {/* Select v3 — compound pattern */}
              <div className="flex flex-col gap-1.5">
                <Label className="flex items-center gap-1.5 text-sm">
                  <FiBook className="text-default-400" /> Formato de lectura
                </Label>
                <Select
                  value={bookFormat}
                  onSelectionChange={(key) =>
                    setBookFormat(String(key) as "fisico" | "kindle" | "web")
                  }
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="fisico" textValue="Libro Físico">
                        Libro Físico
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="kindle" textValue="Kindle / E-book">
                        Kindle / E-book
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="web" textValue="Página Web / PDF">
                        Página Web / PDF
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Select de Idioma */}
              <div className="flex flex-col gap-1.5">
                <Label className="flex items-center gap-1.5 text-sm">
                  <FiGlobe className="text-default-400" /> Idioma del libro
                </Label>
                <Select
                  value={bookLanguage}
                  onChange={(value) => setBookLanguage(String(value))}
                >
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      <ListBox.Item id="es" textValue="Español">
                        Español
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="en" textValue="Inglés">
                        Inglés
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                      <ListBox.Item id="pt" textValue="Portugués">
                        Portugués
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Input de fecha */}
              <div className="flex flex-col gap-1.5">
                <Label className="flex items-center gap-1.5 text-sm">
                  <FiCalendar className="text-default-400" /> ¿Cuándo lo
                  terminaste?
                </Label>
                <Input
                  type="date"
                  value={readDate}
                  onChange={(e) => setReadDate(e.target.value)}
                  variant="primary"
                />
              </div>

              {/* Switch v3 — compound pattern */}
              <div className="flex justify-between items-center bg-default-50 p-3 rounded-xl border border-divider">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium">¿Es un libro prestado?</p>
                  <p className="text-xs text-default-400">
                    Activa si te lo prestaron o es de una biblioteca
                  </p>
                </div>
                <Switch
                  isSelected={isBorrowed}
                  onChange={(value) => setIsBorrowed(Boolean(value))}
                >
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="danger" onPress={() => setModalOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                isPending={savingBook}
                onPress={handleSaveToCollection}
              >
                Guardar en Biblioteca
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal>
    </main>
  );
}
