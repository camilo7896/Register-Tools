import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import appFirebase from "../../lib/credentialFirebase";
import Navbar from "../Navbar";

const db = getFirestore(appFirebase);

const roles = ["admin", "quien_recibe", "autorizador"];

type User = {
  id: string;
  email: string;
  role?: string;
};

const UserRoleManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

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

  return (
    <>
    <Navbar/>
    <div className="w-full flex items-center flex-col p-3 bg-gray-300 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Usuarios registrados y asignación de roles</h2>
      {loading ? (
        <div>Cargando usuarios...</div>
      ) : (
        
        <table className="w-auto text-center border bg-gray-200">
          <thead>
            <tr>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Rol actual</th>
              <th className="border px-2 py-1">Asignar rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="border py-2 ">{user.email}</td>
                <td className="border py-2 ">{user.role || "Sin rol"}</td>
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
    </>
  );
};

export default UserRoleManager;