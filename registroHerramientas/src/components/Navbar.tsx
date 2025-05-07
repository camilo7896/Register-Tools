import LogoCaballo from "../assets/logo-grapas-y-puntillas-el-caballo.png";
import { useState, useRef, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import appFirebase from "../lib/credentialFirebase";
import { Link } from "react-router";

const auth = getAuth(appFirebase);

type userProps = {
    Userloged?: string | null;
};

const Navbar: React.FC<userProps> = ({ Userloged }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Cierra el menú si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    //funcion logouot
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Usuario deslogueado");
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
    };



    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 p-5">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">El Caballo S.A</span>
                    </Link>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 md:w-16 md:h-16 rounded-full"
                                src={LogoCaballo} alt="user photo" />
                        </button>
                        <div
                            ref={menuRef}
                            className={`absolute right-0 mt-70 w-56 z-50 ${menuOpen ? "" : "hidden"} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`}
                            id="user-dropdown"
                        >
                            <div className="px-4 py-3 bg-gray-100">
                                <span className="block text-sm text-gray-900 dark:text-white">Usuario</span>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{Userloged}</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <Link to="/" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Inicio</Link>
                                </li>
                                <li>
                                    <Link to="/formtool" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Formulario</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Registro</Link>
                                </li>
                                <li>
                                    <Link to="/autorizar" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Autorizar</Link>
                                </li>
                            </ul>
                            <button onClick={handleLogout} className="bg-gray-600 text-white text-center block w-full font-semibold px-4 py-2 text-sm hover:bg-gray-500 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="  flex flex-col font-medium p-4 md:p-0 mt-24 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/formtool" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Formulario</Link>
                            </li>
                            <li>
                                <Link to="/register" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Registro</Link>
                            </li>
                            <li>
                                <Link to="/autorizar" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Autorizar</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;