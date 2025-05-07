import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, type DocumentData, QueryDocumentSnapshot, query, orderBy, startAfter, limit } from "firebase/firestore";
import appFirebase from "../../lib/credentialFirebase";
import Search from "../search/Search";

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

    return (
        <>
        <div>
            <Search value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar herramienta..." />
                
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
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Ver mas
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
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