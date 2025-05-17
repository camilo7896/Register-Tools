import React from "react";

const DisenioCard = () => {
  return (
    <>
      <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-1">Estibas de madera</h2>
        <p className="text-sm text-gray-400 mb-4">
          Fecha de registro:{" "}
          <span className="font-medium text-white">5/03/2024</span>
        </p>

        <p className="mb-4 text-gray-300">
          <span className="font-semibold text-white">Faustino Diaz</span>{" "}
          solicita la salida de
          <span className="font-semibold text-white">
            {" "}
            estibas de madera
          </span>{" "}
          por el motivo de
          <span className="font-semibold text-white">
            {" "}
            10 estibas de madera para cargar ladrillos
          </span>
          , y que serán devueltas posteriormente.
        </p>

        <div className="flex justify-center gap-4 mb-4">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Fuera
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Autorizar
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-xs">No Image</span>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default DisenioCard;
