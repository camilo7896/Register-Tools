import { Routes, Route } from "react-router-dom";
import App from "../App";
import FormRegisterTools from "../pages/forms/FormTools";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import appFirebase from "../lib/credentialFirebase";
import { getAuth, type Auth } from "firebase/auth";
import { Suspense } from "react";
import HistoryRegister from "../pages/registers/HistoryRegister";

const auth: Auth = getAuth(appFirebase);

const IndexRouters: React.FC = () => (
  <Routes>
    <>
      <Route path="/" element={<App />} />
      <Route path="/formtool" element={
        <ProtectedRoute auth={auth}>
          <FormRegisterTools />
        </ProtectedRoute>
      } />
      <Route path="/register" element={
        <ProtectedRoute auth={auth}>
          <Suspense fallback={<div>"Cargando..."</div>}>
          <HistoryRegister />
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