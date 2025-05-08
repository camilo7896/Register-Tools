import BackButton from "../components/Buttoms/BackButton";
import { useUserRole } from "../hooks/useUserRole";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ allowedRoles, children }) => {
  const { role, loading } = useUserRole();

  if (loading) return <div>Cargando...</div>;

  // Si no tiene rol, solo puede ir al home
  if (!role) {
    return (
      <div className="max-w-lg mx-auto mt-10 text-center text-red-600">
        No tienes permiso para acceder a esta opción.<br />
        Solicita autorización al administrador.
      </div>
    );
  }

  // Si el rol no está permitido, muestra mensaje
  if (!allowedRoles.includes(role)) {
    return (
      <div className="max-w-lg mx-auto mt-10 text-center text-red-600">
        No tienes permiso para acceder a esta opción.<br />
        Solicita autorización al administrador.
        <BackButton/>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;