import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import appFirebase from "../../lib/credentialFirebase";

const db = getFirestore(appFirebase);

type Tool = {
  id: string;
  tool: string;
  date: string;
};

const Dashboard: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "tools"));
      const data: Tool[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Tool[];
      setTools(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div>Cargando datos...</div>;

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {tools.map(tool => (
          <li key={tool.id}>{tool.tool} - {tool.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;