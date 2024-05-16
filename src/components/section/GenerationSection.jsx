import React from "react";
import PokemonCard from "../card/PokemonCard";

const GenerationSection = ({ gen, pokemons }) => (
  <section key={gen}>
    <h2 id={gen}>Génération {gen}</h2>
    <div className="pokedex">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.dex} pokemon={pokemon} />
      ))}
    </div>
  </section>
);

export default GenerationSection;
