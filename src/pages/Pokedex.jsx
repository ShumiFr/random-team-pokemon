// Pokedex.jsx
import React, { useState, useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import pokemonData from "../data/pokemon.json"; // Remplacez par le chemin vers votre fichier JSON
import Header from "../components/Header";
import "../assets/Pokedex.css";
import "../assets/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { UserPokemonsContext } from "../contexts/UserPokemonsContext";
import { Button, Modal, Form } from "react-bootstrap";

const Pokedex = () => {
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const [showScroll, setShowScroll] = useState(false);
  const { userPokemons, setUserPokemons } = useContext(UserPokemonsContext);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleListClose = () => setShowModal(false);

  const handlePokemonSelect = (pokemon) => {
    setUserPokemons([...userPokemons, pokemon]);
    console.log("Pokémon ajouté à la collection :", pokemon);
  };

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
      const dexNumberRegional = pokemon.dex;
      if (dexNumberRegional.includes("-regional-a")) {
        pokemon.generation = 7;
      } else if (
        dexNumberRegional.includes("-regional-g") ||
        dexNumberRegional.includes("-regional-h")
      ) {
        pokemon.generation = 8;
      } else if (
        dexNumberRegional.includes("-bloodmoon") ||
        dexNumberRegional.includes("-regional-p")
      ) {
        pokemon.generation = 9;
      } else if (dexNumber <= 151) {
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

  useEffect(() => {
    // Sauvegarder les pokémons de l'utilisateur dans le LocalStorage chaque fois qu'ils changent
    localStorage.setItem(`${username}_pokemons`, JSON.stringify(userPokemons));
  }, [username, userPokemons]);

  return (
    <div className="pokedex-page">
      <Header username={username} />
      <div className="pokedex-description">
        <p>
          Bienvenue {username} dans le pokédex ! Vous pouvez naviguer entre les générations avec les
          différents bouton ci-dessous. Vous pouvez également changer le coût de vos pokémons si
          vous êtes connecté !
        </p>
        <p>Cliquez sur les cartes pour être redirigé vers la page Smogon.</p>
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
      <Button variant="primary" onClick={handleShow}>
        Compléter son pokédex
      </Button>
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
              const color = getColorByType(pokemon.type);
              const isInCollection = userPokemons.some(
                (userPokemon) => userPokemon.dex === pokemon.dex
              );
              return (
                <a
                  key={pokemon.dex}
                  href={`https://www.smogon.com/dex/sv/pokemon/${pokemon.image}`}
                  target="blank"
                  className={`card-link ${isInCollection ? "" : "not-owned"}`}
                >
                  <div
                    className={`card ${!isInCollection ? "not-in-collection" : ""}`}
                    style={{ "--color": color }}
                    key={pokemon.dex}
                  >
                    {isInCollection && (
                      <div
                        className="remove-from-collection"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Rajouter le removePokemon ici
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
                </a>
              );
            })}
          </div>
        </section>
      ))}
      <Modal show={showModal} onHide={handleListClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sélectionnez un Pokémon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.entries(pokemonByGeneration).map(([generation, pokemonData]) => (
            <div className="modal-generation" key={generation}>
              <h4>Génération {generation}</h4>
              <div className="modal-gallery">
                {pokemonData
                  .filter(
                    (pokemon) =>
                      !userPokemons.some((userPokemon) => userPokemon.dex === pokemon.dex)
                  )
                  .map((pokemon) => (
                    <div key={pokemon.dex} className="form-check-wrapper">
                      <Form.Check
                        type="checkbox"
                        key={pokemon.dex}
                        id={`pokemon-${pokemon.dex}`}
                        label={
                          <img
                            src={`https://assets.pokeos.com/pokemon/home/${pokemon.dex}.png`}
                            alt={pokemon.name}
                          />
                        }
                        onChange={() => handlePokemonSelect(pokemon)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleListClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Pokedex;
