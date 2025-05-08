import { useState } from "react";
import LogoCaballo from "../../assets/logo-grapas-y-puntillas-el-caballo.png";
import appFirebase from "../../lib/credentialFirebase";
import type { Auth } from 'firebase/auth';

import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { OAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
const auth: Auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);


const Login: React.FC = () => {

    const [error, setError] = useState<string | null>(null);
    // Función para manejar el inicio de sesión
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        // Prevenir el comportamiento por defecto del formulario
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Usuario logueado con éxito");
        } catch (error) {
            setError("Error al iniciar sesión. Verifica tus credenciales.");
            console.error("Error al iniciar sesión:", error);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                // Si es la primera vez, crea el documento con rol null o "pendiente"
                await setDoc(userDocRef, {
                    id:user.uid,
                    email: user.email,
                    role: null // o "pendiente"
                });
            }
            // Redirige o muestra mensaje de éxito
            console.log('login con google');
        } catch (error) {
            console.error(error);
        }
    };

    const handleMicrosoftLogin = async () => {
        const provider = new OAuthProvider('microsoft.com');
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    id:user.uid,
                    email: user.email,
                    role: null // o "pendiente"
                });
            }
            // Redirige o muestra mensaje de éxito
            console.log('login con microsoft');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src={LogoCaballo}
                        className="mx-auto h-10% w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Registro de herramientas
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleLogin} method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {error && (
                                    <p className="mt-2 text-sm text-red-600">{error}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-neutral-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                    
                    <div className="flex mt-4 items-center justify-center flex-wrap">
                      
                        <button onClick={handleGoogleLogin} className="m-3 flex flex-col items-center justify-center cursor-pointer p-2 rounded-2xl hover:bg-amber-100">
                            <svg
                                width="3vh"
                                height="auto"
                                viewBox="0 0 256 262"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid"
                            >
                                <path
                                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                    fill="#34A853"
                                />
                                <path
                                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                    fill="#EB4335"
                                />
                            </svg>
                            Iniciar con Google
                            </button>

                        <button onClick={handleMicrosoftLogin} className="m-3 flex flex-col items-center justify-center cursor-pointer  p-2 rounded-2xl hover:bg-red-100">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="3vh" height="auto" viewBox="0 0 48 48">
                                <path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"></path><path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"></path><path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"></path><path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"></path>
                            </svg>
                            Iniciar con Microsoft
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;