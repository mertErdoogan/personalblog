import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-50 w-screen bg-black/15 min-h-screen flex items-center justify-center top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <div className="mb-4">{children}</div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
