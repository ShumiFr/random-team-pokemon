import React, { useState, useEffect } from "react";

export const UserPokemonsContext = React.createContext();

export const UserPokemonsProvider = ({ children }) => {
  const [userPokemons, setUserPokemons] = useState([]);

  useEffect(() => {
    let savedUserPokemons = localStorage.getItem(`user_pokemons`);
    if (savedUserPokemons) {
      savedUserPokemons = JSON.parse(savedUserPokemons);

      savedUserPokemons = savedUserPokemons.map((pokemon) =>
        typeof pokemon === "string" ? pokemon : pokemon.dex
      );

      setUserPokemons(savedUserPokemons);
    }
  }, []);

  useEffect(() => {
    if (userPokemons.length) {
      localStorage.setItem(`user_pokemons`, JSON.stringify(userPokemons));
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
