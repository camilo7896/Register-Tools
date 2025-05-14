import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Register from "../../components/register/Register";
import appFirebase from "../../lib/credentialFirebase";
import {
  collection,
  getDocs,
  getFirestore,
  Timestamp,
} from "firebase/firestore";

const db = getFirestore(appFirebase);

type Tool = {
  id: string;
  date: string;
  responsible: string;
  tool: string;
  reason: string;
  destination: string;
  returnDate: string;
  // Agrega más campos si tienes
};

const HistoryRegister = () => {
  const toolProps = {
    id: "1",
    date: "2022-01-01",
    responsible: "John Doe",
    tool: "Hammer",
    reason: "Construction",
    receivedAt: Timestamp.now(),
    destination: "Site A",
    receivedBy: "John Doe",
    autorized: "Admin",
    status: "Pending",
    returnDate: "2022-01-15",
    photos: ["url1", "url2"],
  };

  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "tools"));
      const data: Tool[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Tool[];
      setTools(data);
    };
    fetchData();
    console.log("Estos son los datos" + tools);
  }, []);

  return (
    <div>
      <Navbar />
      <Register {...toolProps} />
    </div>
  );
};

export default HistoryRegister;
