import React, { useState, useEffect, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("Aucun utilisateur connecté");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
