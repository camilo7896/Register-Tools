import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  type DocumentData,
  QueryDocumentSnapshot,
  query,
  orderBy,
  startAfter,
  limit,
  updateDoc,
  doc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import appFirebase from "../../lib/credentialFirebase";
import Search from "../search/Search";
import "../../styles/style.scss";
import PhotoModal from "../modals/PhotoModal";

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

type ToolProps = {
  id: string;
  date: string;
  responsible: string;
  tool: string;
  reason: string;
  receivedAt?: Timestamp;
  destination: string;
  receivedBy?: string;
  authorized?: string;
  status: string;
  returnDate: string;
  photos: string[];
};

const Register: React.FC = () => {
  const [tools, setTools] = useState<ToolProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);

  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (url: string) => {
    setSelectedPhoto(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 6;

  const fetchTools = async (nextPage = false) => {
    setLoading(true);
    let q;
    if (nextPage && lastDoc) {
      q = query(
        collection(db, "tools"),
        orderBy("date", "desc"),
        startAfter(lastDoc),
        limit(PAGE_SIZE)
      );
    } else {
      q = query(
        collection(db, "tools"),
        orderBy("date", "desc"),
        limit(PAGE_SIZE)
      );
    }

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ToolProps[];

    if (nextPage) {
      setTools((prev) => [...prev, ...data]);
    } else {
      setTools(data);
    }

    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
    setHasMore(querySnapshot.docs.length === PAGE_SIZE);
    setLoading(false);
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDocs(query(collection(db, "users")));
        const userData = userDoc.docs.find(
          (docu) => docu.data().email === user.email
        );
        if (userData) {
          setUserRole(userData.data().role || null);
        }
      }
    };
    fetchUserRole();
    fetchTools();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl py-10">
        Por favor espere, se están cargando registros...
      </div>
    );
  }

  const filteredTools = tools.filter((tool) =>
    tool.tool?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSetOk = async (id: string) => {
    const user = auth.currentUser;
    await updateDoc(doc(db, "tools", id), {
      status: "ok",
      receivedBy: user?.email || "desconocido",
      receivedAt: serverTimestamp(),
    });

    setTools((prev) =>
      prev.map((tool) =>
        tool.id === id
          ? {
              ...tool,
              status: "ok",
              receivedBy: user?.email || "desconocido",
              receivedAt: Timestamp.now(),
            }
          : tool
      )
    );
  };

  const handleAuthorized = async (id: string) => {
    const user = auth.currentUser;
    await updateDoc(doc(db, "tools", id), {
      authorized: user?.email || "desconocido",
    });

    setTools((prev) =>
      prev.map((tool) =>
        tool.id === id
          ? { ...tool, authorized: user?.email || "desconocido" }
          : tool
      )
    );
  };

  return (
    <>
      <div>
        <div className="mb-3">
          <Search
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar herramienta..."
          />
        </div>

        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between h-[400px]"
            >
              {tool.receivedAt && (
                <div className="text-sm text-blue-700 px-3 pt-2">
                  Recibido el:{" "}
                  {tool.receivedAt.toDate
                    ? tool.receivedAt.toDate().toLocaleString()
                    : new Date(tool.receivedAt.seconds * 1000).toLocaleString()}
                </div>
              )}
              {tool.authorized && (
                <div className="tracking-tight text-gray-900 dark:text-white my-2 ml-2">
                  Autorizado por {tool.authorized}
                </div>
              )}
              <div className="p-5">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {tool.tool}
                </h5>
                <small className="block mb-2 text-gray-600">
                  Fecha de registro: {tool.date}
                </small>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <strong>{tool.responsible}</strong> indica que solicita la
                  salida de <strong>{tool.tool}</strong> por motivo de{" "}
                  <strong>{tool.reason}</strong> y que será devuelto el{" "}
                  <strong>{tool.returnDate}</strong>
                </p>
              </div>

              <div className="flex justify-evenly items-center mb-2">
                {tool.status !== "ok" && (
                  <span className="px-2 py-1 rounded text-xs font-bold bg-red-500 text-white">
                    FUERA
                  </span>
                )}
                <div>
                  <button
                    className="ml-2 px-2 py-1 bg-green-600 text-white rounded text-xs"
                    disabled={tool.status === "ok"}
                    onClick={() => handleSetOk(tool.id)}
                  >
                    {tool.status === "ok"
                      ? `Recibido por ${tool.receivedBy}`
                      : "Recibir"}
                  </button>
                  {userRole === "admin" && (
                    <button
                      className="ml-2 px-2 py-1 bg-indigo-600 text-white rounded text-xs"
                      onClick={() => handleAuthorized(tool.id)}
                    >
                      Autorizar
                    </button>
                  )}
                </div>
              </div>

              {tool.photos?.length > 0 && (
                <div className="flex items-center justify-center pb-3">
                  <div className="overflow-x-auto flex gap-2 p-2">
                    {tool.photos.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Foto ${index + 1}`}
                        className="h-20 w-20 object-cover rounded cursor-pointer"
                        onClick={() => openModal(url)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center my-4">
            <button
              onClick={() => fetchTools(true)}
              className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Cargar más"}
            </button>
          </div>
        )}
      </div>

      <PhotoModal
        isOpen={isModalOpen}
        photoUrl={selectedPhoto}
        onClose={closeModal}
      />
    </>
  );
};

export default Register;
