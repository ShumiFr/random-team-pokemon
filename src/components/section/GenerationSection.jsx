import React from "react";
import PokemonCard from "../card/PokemonCard";

const GenerationSection = ({ generation, pokemonData }) => (
  <section key={generation}>
    <h2 id={generation}>Génération {generation}</h2>
    <div className="pokedex">
      {pokemonData.map((pokemon) => (
        <PokemonCard key={pokemon.dex} pokemon={pokemon} />
      ))}
    </div>
  </section>
);

export default GenerationSection;
