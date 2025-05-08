import { useState, useRef, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import appFirebase from "../lib/credentialFirebase";
import { Link, useNavigate } from "react-router";
import '../styles/navbar/styleNavbar.scss';

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
    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Usuario deslogueado");
                navigate('/')
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
    };



    return (
        <>
            <nav className="border-gray-200 dark:bg-gray-900 p-5 navbar-bg">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Registros</span>
                    </Link>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
                        <button
                            type="button"
                            className="flex text-sm  rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <div className="flex flex-col items-center">

                            <div className=" relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                            </div>
                                    <small className="text-white mt-2">Abrir menu</small>
                            </div>

                        </button>
                        <div
                            ref={menuRef}
                            className={`absolute right-0 mt-70 w-56 z-50 ${menuOpen ? "" : "hidden"} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600`}
                            id="user-dropdown"
                        >
                            <div className="px-4 py-3 bg-gray-100">
                                <strong className="block text-sm dark:text-blue-970 || text-black">Usuario</strong>
                                <span className="block text-sm  text-gray-500 truncate dark:text-gray-600">{Userloged}</span>
                            </div>
                            <ul className="py-2 p-2" aria-labelledby="user-menu-button">
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
                                    <Link to="/admin" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Administrador</Link>
                                </li>
                            </ul>
                            <button onClick={handleLogout} className="bg-gray-600 text-white text-center block w-full font-semibold px-4 py-2 text-sm hover:bg-gray-500 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className=" menu flex flex-col font-medium p-4 md:p-0 mt-24 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/formtool" className="items block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Formulario</Link>
                            </li>
                            <li>
                                <Link to="/register" className="items block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Registro</Link>
                            </li>
                            <li>
                                <Link to="/admin" className="items block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Autorizar</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;