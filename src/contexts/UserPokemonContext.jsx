// UserPokemonContext.js
import React, { useState } from "react";

export const UserPokemonContext = React.createContext();

export const UserPokemonProvider = ({ children }) => {
  const [userPokemons, setUserPokemons] = useState([]);

  const addPokemon = (pokemon) => {
    setUserPokemons((prevPokemons) => [...prevPokemons, pokemon]);
  };

  return (
    <UserPokemonContext.Provider value={{ userPokemons, setUserPokemons, addPokemon }}>
      {children}
    </UserPokemonContext.Provider>
  );
};
