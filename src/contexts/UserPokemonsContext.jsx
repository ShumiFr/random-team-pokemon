import React, { useState, useEffect } from "react";
import { db } from "../configs/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserPokemonsContext = React.createContext();
console.log("db", db);

export const UserPokemonsProvider = ({ children }) => {
  const [userPokemons, setUserPokemons] = useState([]);
  const auth = getAuth();

  const migrateLocalStorageToFirestore = async (user, pokemonsToMigrate) => {
    if (!pokemonsToMigrate) return;

    try {
      const docRef = await addDoc(collection(db, "userPokemons"), {
        pokemons: pokemonsToMigrate,
        userId: user.uid,
      });
      console.log("Document écrit avec l'ID: ", docRef.id);

      localStorage.removeItem("user_pokemons");
    } catch (e) {
      console.error("Erreur lors de l'ajout du document: ", e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userPokemonsQuery = query(
          collection(db, "userPokemons"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(userPokemonsQuery);
        if (querySnapshot.empty) {
          let pokemonsToMigrate = localStorage.getItem(`user_pokemons`);
          if (pokemonsToMigrate) {
            pokemonsToMigrate = JSON.parse(pokemonsToMigrate);
            if (Array.isArray(pokemonsToMigrate) && pokemonsToMigrate.length > 0) {
              pokemonsToMigrate = pokemonsToMigrate.map((pokemon) =>
                typeof pokemon === "string" ? pokemon : pokemon.dex
              );

              try {
                await migrateLocalStorageToFirestore(user, pokemonsToMigrate);
              } catch (error) {
                console.error("Erreur lors de la migration des données :", error);
              }
            }
          }
        } else {
          console.log("Des données existent déjà pour cet utilisateur en BDD.");
        }
      } else {
        console.log("Aucun utilisateur connecté");
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (userPokemons.length) {
      db.setItem(`user_pokemons`, JSON.stringify(userPokemons));
    }
  }, [userPokemons]);

  const addPokemon = (dex) => {
    setUserPokemons((dexs) => [...dexs, dex]);
  };

  function removePokemon(pokemon) {
    if (pokemon.permanent) return;
    setUserPokemons((dexs) => dexs.filter((dex) => dex !== pokemon.dex));
  }

  return (
    <UserPokemonsContext.Provider
      value={{ userPokemons, setUserPokemons, addPokemon, removePokemon }}
    >
      {children}
    </UserPokemonsContext.Provider>
  );
};
