import ToolForm from "../../components/forms/ToolForm";
import Navbar from "../../components/Navbar";

const FormRegisterTools: React.FC = () => {
    return (
        <>
        <Navbar />
        <div className="m-10">
            <h1 className="text-2xl font-bold text-center mb-4">Registro de Herramientas</h1>
            <p className="text-center mb-4">Por favor, completa el siguiente formulario para registrar la herramienta.</p>
        </div>
        <div className="mb-14">
        <ToolForm/>
        </div>
        </>

    )
}

export default FormRegisterTools;