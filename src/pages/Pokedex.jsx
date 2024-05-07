import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import pokemonData from "../data/pokemon.json";
import Header from "../components/layout/Header";
import "../styles/Pokedex.css";
import "../styles/Home.css";
import generation from "../constants/generation";
import ScrollTopButton from "../components/button/ScrollTopButton";
import GenerationNav from "../components/navigation/GenerationNav";
import GenerationSection from "../components/section/GenerationSection";

const Pokedex = () => {
  const auth = getAuth();
  const [username, setUsername] = useState("");

  const updatedPokemonData = generation(pokemonData);

  const pokemonByGeneration = updatedPokemonData.reduce((acc, pokemon) => {
    const generation = pokemon.generation;
    if (!acc[generation]) {
      acc[generation] = [];
    }
    acc[generation].push(pokemon);
    return acc;
  }, {});

  useEffect(() => {
    if (auth.currentUser) {
      setUsername(auth.currentUser.displayName);
    }
  }, [auth.currentUser]);

  return (
    <div className="pokedex-page">
      <Header username={username} />
      <div className="pokedex-description">
        <p>
          Bienvenue {username} dans le pokédex ! Vous pouvez naviguer entre les générations avec les
          différents bouton ci-dessous. Vous pouvez également changer le coût de vos pokémons si
          vous êtes connecté !
        </p>
        <p>Cliquez sur les cartes pour les ajouter ou les retirer de votre collection !</p>
      </div>
      <GenerationNav />
      <ScrollTopButton />
      {Object.entries(pokemonByGeneration).map(([generation, pokemonData]) => (
        <GenerationSection key={generation} generation={generation} pokemonData={pokemonData} />
      ))}
    </div>
  );
};

export default Pokedex;
