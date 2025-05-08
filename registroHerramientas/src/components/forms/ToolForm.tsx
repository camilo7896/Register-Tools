//importacion de firestore
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(appFirebase)

import { useState, type ChangeEvent, type FormEvent } from "react";
import appFirebase from "../../lib/credentialFirebase";
interface FormData {
    date: string;
    responsible: string;
    typeTool: string;
    tool: string;
    reason: string;
    destination: string;
    returnDate: string;
    photo: File[];
    subPiece?: string;
}

const ToolForm: React.FC = () => {

    const [photoError, setPhotoError] = useState<string | null>(null);
    // Estado para almacenar datos del formulario en un objeto
    const [formData, setFormData] = useState<FormData>({
        date: "",
        responsible: "",
        typeTool: "",
        tool: "",
        reason: "",
        destination: "",
        returnDate: "",
        photo: [],
        subPiece: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value,
        }));
    };
    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 4) {
            setPhotoError("Solo puedes subir hasta 4 fotos.");
            e.target.value = "";
        } else {
            setPhotoError(null);
            setFormData({
                ...formData,
                photo: e.target.files ? Array.from(e.target.files) : [],
            });
        }
    };

    // Capturar datos del formulario
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Guarda los datos en la colección "tools"
            await addDoc(collection(db, "tools"), {
                date: formData.date,
                responsible: formData.responsible.toUpperCase(),
                typeTool: formData.typeTool.toUpperCase(),
                tool: formData.tool.toUpperCase(),
                reason: formData.reason.toUpperCase(),
                destination: formData.destination,
                returnDate: formData.returnDate,
                subPiece: formData.subPiece,
                // Las fotos se manejan aparte (ver nota abajo)
            });
            alert("¡Registro exitoso!");
            // Limpia el formulario si quieres
            setFormData({
                date: "",
                responsible: "",
                typeTool: "",
                tool: "",
                reason: "",
                destination: "",
                returnDate: "",
                photo: [],
                subPiece: "",
            });
        } catch (error) {
            alert("Error al guardar: " + (error as Error).message);
        }
    };



    return (
        <>

            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                <div className="mb-5">
                    {/* //date */}
                    <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
                    <input type="date" value={formData.date} onChange={handleChange} id="date" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="responsible" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Responsable de la salida</label>
                    <select id="responsible" value={formData.responsible} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="">Selecciona tu nombre</option>
                        <option value="Cristian">Cristian</option>
                        <option value="Jorge">Jorge</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                    </select>
                    {/* tipo de herramienta */}
                    <label htmlFor="responsible" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de herramienta</label>
                    <select id="typeTool" value={formData.typeTool} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="Herramienta">Herramienta</option>
                        <option value="Pieza">Pieza de maquina</option>
                        <option value="Maquina">Maquina</option>
                        <option value="Equipo de tecnologia">Equipo de tecnología</option>
                    </select>
                    {/* condicional de tipo de herramienta */}
                    {formData.typeTool === "Pieza" && (
                        <>
                            <label htmlFor="subPiece" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Selecciona la seccion de la pieza
                            </label>
                            <select
                                id="subPiece"
                                value={formData.subPiece}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            >
                                <option value="">Selecciona la seccion</option>
                                <option value="Empaque">Empaque</option>
                                <option value="puas">puas</option>
                                <option value="picado">picado</option>
                                <option value="gal1">gal1</option>
                                <option value="gal2">gal2</option>
                                <option value="gal3">gal3</option>
                                <option value="horno">horno</option>
                                <option value="bascula">bascula</option>
                            </select>
                        </>
                    )}
                    {/* Herramienta */}
                    <label htmlFor="tool" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Herramienta</label>
                    <input
                        type="text"
                        id="tool"
                        value={formData.tool}
                        onChange={handleChange}
                        placeholder="Escribe nombre del objeto"
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                        required
                    />
                    {/* Motivo */}
                    <label htmlFor="reason" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Motivo de la salida</label>
                    <select
                        id="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="">Selecciona el motivo</option>
                        <option value="Calibración de instrumentos de medición">Calibración de instrumentos de medición.</option>
                        <option value="Cambio de empaquetadura botellas hidraulicas.">Cambio de empaquetadura botellas hidraulicas.</option>
                        <option value="Capacitación en manejo de herramientas">Capacitación en manejo de herramientas.</option>
                        <option value="Cocida de mangas con anillos.">Cocida de mangas con anillos.</option>
                    </select>

                    {/* Destino */}
                    <label htmlFor="destination" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Destino de la herramienta</label>
                    <input
                        type="text"
                        id="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Escribe destino de la herramienta"
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                        required
                    />

                    {/* Fecha de regreso */}
                    <label htmlFor="returnDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha estimada de regreso</label>
                    <input
                        type="date"
                        id="returnDate"
                        value={formData.returnDate}
                        onChange={handleChange}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                        required
                    />

                    {/* Subir foto del objeto. hasta 4 fotos */}
                    <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Sube hasta 4 fotos del objeto
                    </label>
                    <input
                        type="file"
                        id="photo"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                        required
                    />
                    {photoError && (
                        <p className="text-red-600 text-sm mt-2">{photoError}</p>
                    )}
                </div>

                <button type="submit" className="text-white bg-blue-950 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900">Register salida</button>
            </form>


        </>
    )
}

export default ToolForm
