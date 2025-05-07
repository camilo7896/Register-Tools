import type { Auth } from "firebase/auth";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
    auth: Auth;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth, children }) => {
    if (!auth.currentUser) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
}
export default ProtectedRoute;
