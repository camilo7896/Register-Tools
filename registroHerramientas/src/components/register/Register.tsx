import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, type DocumentData, QueryDocumentSnapshot, query, orderBy, startAfter, limit, updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import appFirebase from "../../lib/credentialFirebase";
import Search from "../search/Search";
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

type Tool = {
    id: string;
    date: string;
    responsible: string;
    tool: string;
    reason: string;
    destination: string;
    status: string;
    returnDate: string;
    // Agrega más campos si tienes
};

const Register: React.FC = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const PAGE_SIZE = 3; // Numero de cards que se va a mostrar

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
        const data: Tool[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Tool[];
        if (nextPage) {
            setTools(prev => [...prev, ...data]);
        } else {
            setTools(data);
        }
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        setHasMore(querySnapshot.docs.length === PAGE_SIZE);
        setLoading(false);
    };

    useEffect(() => {
        fetchTools();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <div className="text-center text-xl py-10">Por favor espere, se estan cargando registros...</div>;

    }

    const filteredTools = tools.filter(tool =>
        tool.tool.toLowerCase().includes(search.toLocaleLowerCase())
    );
    const handleSetOk = async (id: string) => {
    const user = auth.currentUser;
    await updateDoc(doc(db, "tools", id), {
        status: "ok",
        receivedBy: user ? user.email : "desconocido", // o user.uid si prefieres
        receivedAt: new Date() // opcional: guarda la fecha de recepción
    });
    setTools(prev =>
        prev.map(tool =>
            tool.id === id
                ? { ...tool, status: "ok", receivedBy: user ? user.email : "desconocido" }
                : tool
        )
    );
};
    return (
        <>
            <div>
                <div >
                    <Search value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar herramienta..." />
                </div>
                <div className="flex flex-row flex-wrap gap-4 justify-center">
                    {filteredTools.map(tool => (
                        <div key={tool.id} className="max-w-sm my-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{tool.tool}</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    <strong>{tool.responsible}</strong> indica que solicita la salida de <strong>{tool.tool}</strong> por motivo de <strong>{tool.reason}</strong> y que sera devuelto el <strong>{tool.returnDate}</strong>
                                </p>
                           
                            </div>
                            {/* Estado de la herramienta y opcion de cambio */}
                            <div className="flex justify-evenly px-5">
                               <div>

                                <span className={`px-2 py-1 rounded text-xs font-bold ${tool.status === "ok" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                                    {tool.status === "ok" ? "OK" : "FUERA"}
                                </span>
                               </div>
                                <div>
                                <button
                                    className="ml-2 px-2 py-1 bg-green-600 text-white rounded text-xs"
                                    disabled={tool.status === "ok"}
                                    onClick={() => handleSetOk(tool.id)}
                                    >
                                    Recibir
                                </button>
                                    </div>
                            </div>

                            <div className="bg-blue-950 text-white px-2 flex justify-end">
                                <small>{tool.date}</small>
                            </div>
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

        </>
    );
};

export default Register;