import { Routes, Route } from "react-router-dom";
import App from "../App";
import FormRegisterTools from "../pages/forms/FormTools";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Suspense } from "react";
import HistoryRegister from "../pages/registers/HistoryRegister";
import UserRoleManager from "../components/roles/UserRoleManager";


const IndexRouters: React.FC = () => (
  <Routes>
    <>
      <Route path="/" element={<App />} />
      <Route path="/formtool" element={
          <ProtectedRoute allowedRoles={["admin", "autorizador","quien_recibe","superadmin"]}>
          <FormRegisterTools />
        </ProtectedRoute>
      } />
      <Route path="/register" element={
          <ProtectedRoute allowedRoles={["admin","porteria","quien_recibe","superadmin"]}>
          <Suspense fallback={<div>"Cargando..."</div>}>
          <HistoryRegister />
          </Suspense>
        </ProtectedRoute>
      } />
       <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
          <Suspense fallback={<div>"Cargando..."</div>}>
          <UserRoleManager />
          </Suspense>
        </ProtectedRoute>
      } />
    </>
    <Route path="*" element={
      <h1>404 Not Found</h1>
    } />
  </Routes>
);

export default IndexRouters;