import './App.css'
import Login from './components/auth/Login';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import appFirebase from './lib/credentialFirebase'
import type { Auth, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import Home from './pages/Home';

const auth: Auth = getAuth(appFirebase);




function App() {

  const [user, setUser] = useState<User | null>(null);

  //
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUser(userFirebase as User);
        console.log(" Usuario logueado");
      } else {
        setUser(null);
        console.log("No hay usuario logueado");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {user ? <Home emailUser={user.email} /> : <Login />}

    </>
  )
}

export default App
