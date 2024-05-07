import React, { useState, useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import pokemonData from "../data/pokemon.json";
import Header from "../components/layout/Header";
import "../assets/Pokedex.css";
import "../assets/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { UserPokemonsContext } from "../contexts/UserPokemonsContext";
import colors from "../constants/Colors";
import generation from "../constants/Generation";

const Pokedex = () => {
  const auth = getAuth();
  const [username, setUsername] = useState("");
  const [showScroll, setShowScroll] = useState(false);
  const { addPokemon, removePokemon, userPokemons } = useContext(UserPokemonsContext);

  const updatedPokemonData = generation(pokemonData);

  const pokemonByGeneration = updatedPokemonData.reduce((acc, pokemon) => {
    const generation = pokemon.generation;
    if (!acc[generation]) {
      acc[generation] = [];
    }
    acc[generation].push(pokemon);
    return acc;
  }, {});

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
      {Object.entries(pokemonByGeneration).map(([generation, pokemonData]) => (
        <section key={generation}>
          <h2 id={generation}>Génération {generation}</h2>
          <div className="pokedex">
            {pokemonData.map((pokemon) => {
              const color = colors[pokemon.type];
              const isInCollection = userPokemons.some(
                (userPokemon) => userPokemon.dex === pokemon.dex
              );
              return (
                <div
                  className={`card ${!isInCollection ? "not-in-collection" : ""}`}
                  style={{ "--color": color }}
                  key={pokemon.dex}
                  onClick={() => {
                    if (!isInCollection) {
                      addPokemon(pokemon);
                    } else {
                      removePokemon(pokemon.dex);
                    }
                  }}
                >
                  {isInCollection && (
                    <div
                      className="remove-from-collection"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removePokemon(pokemon.dex);
                      }}
                    >
                      X
                    </div>
                  )}
                  <img
                    src={`https://assets.pokeos.com/pokemon/home/${pokemon.dex}.png`}
                    alt={pokemon.name}
                  />
                  <h3>{pokemon.name}</h3>
                  <p className="cost">{pokemon.cost}</p>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Pokedex;
