import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import appFirebase from "../../lib/credentialFirebase";
type Tool = {
  id: string;
  tool: string;
  date: string;
};

const db = getFirestore(appFirebase);


const Dashboard = () => {
      const [tools, setTools] = useState<Tool[]>([]);
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
      setUsersLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setUsersLoading(false);
    }
  };

  fetchData();
}, []);

  if (loading || usersLoading) return <div>Cargando datos...</div>;

  return (
    <div>
         <h2>Dashboard</h2>
      <ul>
        {tools.map(tool => (
          <li key={tool.id}>{tool.tool} - {tool.date}</li>
        ))}
      </ul>
    
    </div>
  )
}

export default Dashboard
