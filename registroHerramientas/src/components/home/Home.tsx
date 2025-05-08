import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import appFirebase from "../../lib/credentialFirebase";

const db = getFirestore(appFirebase);

type User = {
  id: string;
  email: string;
  role: string;
};

const Home: React.FC = () => {
  const [usersLogged, setUsersLogged] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  // Espera a que el usuario esté autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Carga los usuarios de Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersQuery = await getDocs(collection(db, "users"));
        const usersData: User[] = usersQuery.docs.map(doc => ({
          id: doc.id,
          email: doc.data().email ?? "",
          role: doc.data().role ?? "",
        }));
        setUsersLogged(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !currentUser) return <div>Cargando datos...</div>;

  // Busca el usuario logueado en la colección
  const userData = usersLogged.find(user => user.email === currentUser.email);

  return (
    <div className='m-4'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-960 md:text-5xl lg:text-6xl">¡Bienvenido!</h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Bienvenido al sistema de registro y control de herramientas de la empresa. Aquí podrás gestionar la salida, devolución y autorización de herramientas y equipos, asegurando un seguimiento eficiente y seguro de los recursos.
          <br />
          Utiliza las opciones del menú para registrar movimientos, consultar historial y administrar permisos según tu rol.
        </p>
      </div>
      <div>
        {/* Mensaje si el usuario no tiene rol */}
        {userData && (!userData.role || userData.role === "" || userData.role === null) && (
          <div className="text-center text-red-600 font-semibold mt-6">
            Tu cuenta aún no tiene un rol asignado.<br />
            Por favor, espera a que el administrador te asigne un rol para acceder a las demás opciones.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;