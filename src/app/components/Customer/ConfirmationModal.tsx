import React from "react";
import { Button } from "@/components/ui/button";
import Modal from "../Common/Modal";

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal isOpen={true} onClose={onCancel}>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="outline" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
