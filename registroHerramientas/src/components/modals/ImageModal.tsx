import React from "react";

interface ImageModalProps {
  isOpen: boolean;
  images: string[];
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, images, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Fotos de la herramienta</h2>
          <button onClick={onClose} className="text-red-500 font-bold">
            Cerrar
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`foto-${index}`}
              className="w-full h-48 object-cover rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
