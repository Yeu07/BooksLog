"use client";

import { useState, useEffect } from "react";
import { Modal, Button, Select, ListBox, Switch } from "@heroui/react";
import { FiBook, FiGlobe, FiCalendar, FiX } from "react-icons/fi";
import { Book, SavedBook } from "@/src/types/book";

interface AddBookModalProps {
  book: Book | null;
  isOpen: boolean;
  existingData?: SavedBook | null;
  onClose: () => void;
  onSave: (config: {
    format: "fisico" | "kindle" | "web";
    language: string;
    isBorrowed: boolean;
    readDate: string;
  }) => void;
  isSaving: boolean;
}

export function AddBookModal({
  book,
  isOpen,
  existingData,
  onClose,
  onSave,
  isSaving,
}: AddBookModalProps) {
  const [format, setFormat] = useState<"fisico" | "kindle" | "web">("fisico");
  const [language, setLanguage] = useState("es");
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [readDate, setReadDate] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (existingData) {
        setFormat(existingData.format);
        setLanguage(existingData.language);
        setIsBorrowed(existingData.isBorrowed);
        setReadDate(existingData.readAt.split("T")[0]);
      } else {
        setFormat("fisico");
        setLanguage("es");
        setIsBorrowed(false);
        setReadDate(new Date().toISOString().split("T")[0]);
      }
    }
  }, [isOpen, existingData]);

  const handleSave = () => {
    onSave({ format, language, isBorrowed, readDate });
  };

  return (
    <Modal>
      <span aria-hidden style={{ display: "none" }} />
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onClose}>
        <Modal.Container>
          <Modal.Dialog className="w-full max-w-md">
            {({ close }) => (
              <>
                <Button
                  aria-label="Cerrar"
                  className="absolute top-4 right-4 p-2 text-default-400 hover:bg-default-100 rounded-full transition-all z-50"
                >
                  <FiX className="w-4 h-4" />
                </Button>
                <Modal.Header>
                  <div className="flex items-start gap-3 w-full pr-6">
                    {book?.coverUrl && (
                      <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-12 h-[72px] object-cover rounded-lg border border-divider shadow flex-none"
                      />
                    )}
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <Modal.Heading className="text-base font-bold line-clamp-2 leading-snug">
                        {book?.title}
                      </Modal.Heading>
                      <p className="text-xs text-default-400 truncate">
                        {book?.authors.join(", ")}
                      </p>
                    </div>
                  </div>
                </Modal.Header>

                <Modal.Body className="flex flex-col gap-4">
                  {/* Selector de Formato */}
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-default-500 uppercase tracking-wider">
                      <FiBook className="w-3.5 h-3.5" /> Formato
                    </label>
                    <Select
                      selectedKey={format}
                      aria-label="Formato del libro"
                      onSelectionChange={(key) => setFormat(String(key) as any)}
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="fisico" textValue="Libro Físico">
                            📖 Libro Físico
                          </ListBox.Item>
                          <ListBox.Item id="kindle" textValue="Kindle / E-book">
                            📱 Kindle / E-book
                          </ListBox.Item>
                          <ListBox.Item id="web" textValue="Web / PDF">
                            🌐 Web / PDF
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* Selector de Idioma */}
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-default-500 uppercase tracking-wider">
                      <FiGlobe className="w-3.5 h-3.5" /> Idioma
                    </label>
                    <Select
                      aria-label="Idioma del libro"
                      selectedKey={language}
                      onSelectionChange={(key) => setLanguage(String(key))}
                    >
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="es" textValue="Español">
                            🇦🇷 Español
                          </ListBox.Item>
                          <ListBox.Item id="en" textValue="Inglés">
                            🇺🇸 Inglés
                          </ListBox.Item>
                          <ListBox.Item id="pt" textValue="Portugués">
                            🇧🇷 Portugués
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  {/* Fecha */}
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-default-500 uppercase tracking-wider">
                      <FiCalendar className="w-3.5 h-3.5" /> Fecha de
                      finalización
                    </label>
                    <input
                      type="date"
                      value={readDate}
                      onChange={(e) => setReadDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-divider bg-default-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>

                  {/* Switch Prestado */}
                  <div className="flex justify-between items-center bg-default-50 px-4 py-3 rounded-xl border border-divider">
                    <div>
                      <p className="text-sm font-medium">¿Libro prestado?</p>
                      <p className="text-xs text-default-400 mt-0.5">
                        De biblioteca o amigo
                      </p>
                    </div>
                    <Switch
                      isSelected={isBorrowed}
                      onChange={() => setIsBorrowed((v) => !v)}
                    >
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch>
                  </div>
                </Modal.Body>

                <Modal.Footer className="flex gap-2">
                  <Button variant="primary" onPress={close} className="flex-1">
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    isPending={isSaving}
                    onPress={handleSave}
                    className="flex-1 font-semibold"
                  >
                    Guardar
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
