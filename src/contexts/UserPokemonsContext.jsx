import React, { useState, useEffect } from "react";
import { db } from "../configs/firebase";
import { collection, query, where, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import pokemonData from "../data/pokemons.json";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export const UserPokemonsContext = React.createContext();

export const UserPokemonsProvider = ({ children }) => {
  const [userPokemons, setUserPokemons] = useState([]);
  const { user } = useContext(UserContext);
  const [userPokemonsUid, setUserPokemonsUid] = useState("");
  const auth = getAuth();

  const getUserPokemonFromLocalStorage = () => {
    let pokemonsToMigrate = localStorage.getItem(`user_pokemons`);
    if (pokemonsToMigrate) {
      pokemonsToMigrate = JSON.parse(pokemonsToMigrate);
      if (Array.isArray(pokemonsToMigrate) && pokemonsToMigrate.length > 0) {
        pokemonsToMigrate = pokemonsToMigrate.map((pokemon) =>
          typeof pokemon === "string" ? pokemon : pokemon.dex
        );

        const permanentPokemons = Object.values(pokemonData).filter(
          (pokemon) => pokemon.permanent === true
        );

        const permaPokeNotInStorage = permanentPokemons.filter(
          (pp) => !pokemonsToMigrate.includes(pp.dex)
        );

        pokemonsToMigrate = [...pokemonsToMigrate, ...permaPokeNotInStorage];

        return pokemonsToMigrate;
      }
    }
    return [];
  };

  const getUserPokemonsSnapshot = async (user) => {
    const userPokemonsQuery = query(
      collection(db, "userPokemons"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(userPokemonsQuery);
    if (!querySnapshot.empty) {
      setUserPokemonsUid(querySnapshot.docs[0].id);
    }
    return querySnapshot;
  };

  const updateUserPokemonsInFirestore = async () => {
    if (userPokemons.length) {
      try {
        if (userPokemonsUid) {
          const docRef = doc(db, "userPokemons", userPokemonsUid);
          await updateDoc(docRef, {
            pokemons: userPokemons,
          });
        } else {
          const docRef = await addDoc(collection(db, "userPokemons"), {
            userId: auth.currentUser.uid,
            pokemons: userPokemons,
          });
          setUserPokemonsUid(docRef.id);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getUserPokemon = async (user) => {
    const querySnapshot = await getUserPokemonsSnapshot(user);
    if (querySnapshot.empty) {
      const userPokemons = getUserPokemonFromLocalStorage();
      setUserPokemons(userPokemons);
    } else {
      setUserPokemons(querySnapshot.docs[0].data().pokemons);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      getUserPokemon(user);
    }
  }, [user?.uid]);

  useEffect(() => {
    updateUserPokemonsInFirestore();
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
