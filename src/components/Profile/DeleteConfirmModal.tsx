import { Modal, Button } from "@heroui/react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { SavedBook } from "@/src/types/book";

interface DeleteConfirmModalProps {
  book: SavedBook | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export function DeleteConfirmModal({
  book,
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}: DeleteConfirmModalProps) {
  return (
    <Modal>
      <span aria-hidden style={{ display: "none" }} />
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onClose}>
        <Modal.Container>
          <Modal.Dialog className="w-full max-w-sm">
            {({ close }) => (
              <>
                <Button
                  aria-label="Cerrar"
                  className="absolute top-4 right-4 p-2 text-default-400 hover:bg-default-100 rounded-full transition-all z-50"
                >
                  <FiX className="w-4 h-4" />
                </Button>
                <Modal.Header>
                  <div className="flex items-center gap-3">
                    <div className="bg-danger/10 p-2 rounded-xl flex-none">
                      <FiAlertTriangle className="w-5 h-5 text-danger" />
                    </div>
                    <Modal.Heading className="text-base font-bold">
                      Eliminar libro
                    </Modal.Heading>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <p className="text-sm text-default-500 leading-relaxed">
                    ¿Seguro que querés eliminar{" "}
                    <span className="font-semibold text-foreground">
                      "{book?.title}"
                    </span>{" "}
                    de tu biblioteca? Esta acción no se puede deshacer.
                  </p>
                </Modal.Body>
                <Modal.Footer className="flex gap-2">
                  <Button variant="primary" onPress={close} className="flex-1">
                    Cancelar
                  </Button>
                  <Button
                    variant="danger"
                    isPending={isDeleting}
                    onPress={() => {
                      onConfirm();
                      close();
                    }}
                    className="flex-1 font-semibold"
                  >
                    Sí, eliminar
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
