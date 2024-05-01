// Pokedex.jsx
import React, { useState, useEffect } from "react";
import pokemonData from "../data/pokemon.json"; // Remplacez par le chemin vers votre fichier JSON
import Header from "../components/Header";
import "../assets/Pokedex.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const Pokedex = () => {
  const getColorByType = (type) => {
    switch (type) {
      case "Fire":
        return "#F08030";
      case "Grass":
        return "#78C850";
      case "Water":
        return "#6890F0";
      case "Bug":
        return "#A8B820";
      case "Normal":
        return "#A8A878";
      case "Poison":
        return "#A040A0";
      case "Electric":
        return "#F8D030";
      case "Ground":
        return "#E0C068";
      case "Fairy":
        return "#EE99AC";
      case "Fighting":
        return "#C03028";
      case "Psychic":
        return "#F85888";
      case "Rock":
        return "#B8A038";
      case "Ghost":
        return "#705898";
      case "Ice":
        return "#98D8D8";
      case "Dragon":
        return "#7038F8";
      case "Dark":
        return "#705848";
      case "Steel":
        return "#B8B8D0";
      case "Flying":
        return "#A890F0";
      default:
        return "#A8A878"; // Couleur par défaut pour les types non spécifiés
    }
  };

  const assignGenToPokemon = (pokemonData) => {
    const updatedPokemonData = [];
    for (let i = 0; i < pokemonData.length; i++) {
      const pokemon = pokemonData[i];
      const dexNumber = pokemon.dex.split("-")[0];
      if (dexNumber <= 151) {
        pokemon.generation = 1;
      } else if (dexNumber <= 251) {
        pokemon.generation = 2;
      } else if (dexNumber <= 386) {
        pokemon.generation = 3;
      } else if (dexNumber <= 493) {
        pokemon.generation = 4;
      } else if (dexNumber <= 649) {
        pokemon.generation = 5;
      } else if (dexNumber <= 721) {
        pokemon.generation = 6;
      } else if (dexNumber <= 809) {
        pokemon.generation = 7;
      } else if (dexNumber <= 905) {
        pokemon.generation = 8;
      } else {
        pokemon.generation = 9;
      }
      updatedPokemonData.push(pokemon);
    }
    return updatedPokemonData;
  };

  const updatedPokemonData = assignGenToPokemon(pokemonData); // Assign generation to each pokemon in pokemonData array

  // Regroupez les Pokémon par génération
  const pokemonByGeneration = updatedPokemonData.reduce((acc, pokemon) => {
    const generation = pokemon.generation;
    if (!acc[generation]) {
      acc[generation] = [];
    }
    acc[generation].push(pokemon);
    return acc;
  }, {});

  const [showScroll, setShowScroll] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  return (
    <div>
      <Header />
      <div className="nav-generation">
        <a href="#1">Génération 1</a>
        <a href="#2">Génération 2</a>
        <a href="#3">Génération 3</a>
        <a href="#4">Génération 4</a>
        <a href="#5">Génération 5</a>
        <a href="#6">Génération 6</a>
        <a href="#7">Génération 7</a>
        <a href="#8">Génération 8</a>
        <a href="#9">Génération 9</a>
      </div>
      <button
        className="scrollTop"
        onClick={scrollTop}
        style={{ display: showScroll ? "flex" : "none" }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
      {Object.entries(pokemonByGeneration).map(([generation, pokemons]) => (
        <section key={generation}>
          <h2 id={generation}>Génération {generation}</h2>
          <div className="pokedex">
            {pokemons.map((pokemon, index) => {
              const color = getColorByType(pokemon.type);
              return (
                <a
                  key={pokemon.dex}
                  href={`https://www.smogon.com/dex/ss/pokemon/${pokemon.image}`}
                  target="blank"
                >
                  <div className="card" style={{ "--color": color }}>
                    <img
                      src={`https://assets.pokeos.com/pokemon/home/${pokemon.dex}.png`}
                      alt={pokemon.name}
                    />
                    <h3>{pokemon.name}</h3>
                    <p className="cost">{pokemon.cost}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Pokedex;
