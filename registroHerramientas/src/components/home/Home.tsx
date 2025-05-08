import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import appFirebase from "../../lib/credentialFirebase";

const db = getFirestore(appFirebase);
  const auth = getAuth();
  const currentUser = auth.currentUser;
 

type Tool = {
  id: string;
  tool: string;
  date: string;
};

type User ={
  id:string;
  email:string;
  role:string;
}

const Home: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
    const [usersLogged, setUsersLogged] = useState<User[]>([]); // Nuevo estado para usuarios
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true); // Estado de carga para usuarios

 useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar herramientas
        const toolsQuery = await getDocs(collection(db, "tools"));
        const toolsData: Tool[] = toolsQuery.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Tool[];
        setTools(toolsData);
        setLoading(false);
        
        // Cargar usuarios
        const usersQuery = await getDocs(collection(db, "users")); // Asegúrate que es "users" o "user"
        const usersData: User[] = usersQuery.docs.map(doc => ({
          id: doc.id,
          email: doc.data().email ?? "",
          role: doc.data().role ?? "",
        }));
        setUsersLogged(usersData);
        setUsersLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setUsersLoading(false);
      }
    };
    
    fetchData();
  }, []); useEffect(() => {
    const fetchData = async () => {
      // Cargar herramientas
      const toolsQuery = await getDocs(collection(db, "tools"));
      const toolsData: Tool[] = toolsQuery.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Tool[];
      setTools(toolsData);
      setLoading(false);
      
      // Cargar usuarios
    const usersQuery = await getDocs(collection(db, "users"));
      const usersData: User[] = usersQuery.docs.map(doc => {
        return {
          id:doc.id,
          email: doc.data().email ?? "",
         role: doc.data().role ?? "",
        };
      });
      setUsersLogged(usersData);
      setUsersLoading(false);
    };
    
    fetchData();
  }, []);



 const userData = usersLogged.find(user => user.email === currentUser?.email);
  if (loading || usersLoading) return <div>Cargando datos...</div>;

  return (
    <div className='m-4'>
      <h2>Dashboard</h2>
      <ul>
        {tools.map(tool => (
          <li key={tool.id}>{tool.tool} - {tool.date}</li>
        ))}
      </ul>
        <div className='flex flex-col items-center justify-center'>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-960 md:text-5xl lg:text-6xl">¡Bienvenido!</h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Bienvenido al sistema de registro y control de herramientas de la empresa. Aquí podrás gestionar la salida, devolución y autorización de herramientas y equipos, asegurando un seguimiento eficiente y seguro de los recursos.

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