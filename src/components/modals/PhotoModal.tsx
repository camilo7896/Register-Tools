// src/components/PhotoModal.tsx
import React from "react";

type PhotoModalProps = {
  isOpen: boolean;
  photoUrl: string | null;
  onClose: () => void;
};

const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  photoUrl,
  onClose,
}) => {
  if (!isOpen || !photoUrl) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded shadow-lg relative max-w-[90%] max-h-[90%]"
        onClick={(e) => e.stopPropagation()} // Evita que se cierre si clickeas dentro
      >
        <button
          className="absolute top-2 right-2 text-black font-bold text-lg"
          onClick={onClose}
        >
          ✕
        </button>
        <img
          src={photoUrl}
          alt="Ampliada"
          className="max-w-full max-h-[80vh] object-contain"
        />
      </div>
    </div>
  );
};

export default PhotoModal;
