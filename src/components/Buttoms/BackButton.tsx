import { useNavigate } from "react-router";

const BackButton = () => {
        const navigate = useNavigate(); // <-- Inicializa el hook

  return (
    <div>
             {/* Botón ir atrás */}
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="ml-2 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
            >
                Ir atrás
            </button>
    </div>
  )
}
export default BackButton
