import React, { useState, useEffect } from "react";

export const UserPokemonsContext = React.createContext();

export const UserPokemonsProvider = ({ children }) => {
  const [userPokemons, setState] = useState([]);

  useEffect(() => {
    const savedUserPokemons = localStorage.getItem(`user_pokemons`);
    if (savedUserPokemons) {
      setUserPokemons(JSON.parse(savedUserPokemons));
    }
  }, [setUserPokemons]);

  const setUserPokemons = (userPokemons) => {
    localStorage.setItem(`user_pokemons`, JSON.stringify(userPokemons));
    setState(userPokemons);
  };

  const addPokemon = (pokemon) => {
    setUserPokemons((prevPokemons) => [...prevPokemons, pokemon]);
  };

  function removePokemon(dex) {
    const newUserPokemons = userPokemons.filter((pokemon) => pokemon.dex !== dex);
    setUserPokemons(newUserPokemons);
  }

  return (
    <UserPokemonsContext.Provider
      value={{ userPokemons, setUserPokemons, addPokemon, removePokemon }}
    >
      {children}
    </UserPokemonsContext.Provider>
  );
};
