import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import appFirebase from "../../lib/credentialFirebase";
import Navbar from "../Navbar";

const db = getFirestore(appFirebase);

const roles = ["admin", "quien_recibe", "autorizador", "porteria", "superadmin"];

type User = {
  id: string;
  email: string;
  role?: string;
};

type Tool = {
  id: string;
  date: string;
  destination: string;
  reason:string;
  receivedBy:string;
  responsible: string;
  status: string;
  returnDate:string;
  subPiece:string
  tool: string;
  typeTool:string;
  receivedAt:Timestamp;
};

const UserRoleManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Cargar todos los usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "users"));
      const usersData: User[] = snapshot.docs.map(docu => ({
        id: docu.id,
        ...docu.data(),
      })) as User[];
      setUsers(usersData);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Cargar herramientas para el reporte
  useEffect(() => {
    const fetchTools = async () => {
      const snapshot = await getDocs(collection(db, "tools"));
      const toolsData: Tool[] = snapshot.docs.map(docu => ({
        id: docu.id,
        ...docu.data(),
      })) as Tool[];
      setTools(toolsData);
    };
    fetchTools();
  }, []);

  // Cambiar el rol de un usuario
  const handleRoleChange = async (userId: string, newRole: string) => {
    await updateDoc(doc(db, "users", userId), { role: newRole });
    setUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    setMessage("Rol actualizado correctamente.");
    setTimeout(() => setMessage(""), 2000);
  };

  // Descargar CSV filtrado por fecha
  const handleDownloadCSV = () => {
    // Filtra las herramientas por fecha
    const filtered = tools.filter(tool => {
      if (!tool.date) return false;
      const toolDate = new Date(tool.date);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      if (start && toolDate < start) return false;
      if (end && toolDate > end) return false;
      return true;
    });

    // Convierte a CSV
    const header = "Fecha,Objeto,Sección,Estado,Destino,Motivo,Recibe,Responsable,fecha recibida\n";
    const rows = filtered.map(tool =>
      [
        tool.date,
        tool.tool,
        tool.subPiece,
        tool.status,
        tool.destination,
        tool.reason,
        tool.receivedBy,
        tool.responsible,
        tool.returnDate,
        tool.receivedAt
      ].join(",")
    );
    const csvContent = header + rows.join("\n");

    // Descarga el archivo
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "herramientas_filtradas.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-row flex-wrap  justify-center m-5">
      <div className="w-full h-full flex items-center flex-col p-3 m-3 bg-gray-100 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Usuarios registrados y asignación de roles</h2>
        
        {loading ? (
          <div>Cargando usuarios...</div>
        ) : (
          <table className="w-auto text-center border bg-gray-200">
            <thead>
              <tr>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Asignar rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="border py-2 ">{user.email}</td>
                  <td className="border py-2 ">
                    <select
                      value={user.role || ""}
                      onChange={e => handleRoleChange(user.id, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="">Selecciona un rol</option>
                      {roles.map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {message && <div className="text-green-700 mt-2">{message}</div>}
      </div>

      {/* opcion de descargar registros */}
     <div className="flex flex-col justify-center items-center m-3 p-3 bg-gray-100 w-full">
      <div>
        <h2 className="text-xl font-bold mb-4">
          Descargar registros
          </h2>
      </div>
       <div className="flex gap-2 my-4 items-center ">
        <label>Desde:</label>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border rounded px-2 py-1" />
        <label>Hasta:</label>
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border rounded px-2 py-1" />
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={handleDownloadCSV}
        >
          Descargar CSV
        </button>
      </div>
     </div>
     </div>
    </>
  );
};

export default UserRoleManager;