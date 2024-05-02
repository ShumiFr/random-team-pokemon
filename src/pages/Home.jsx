import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import pokemonData from "../data/pokemon.json";
import Header from "../components/Header";
import PokemonTeam from "../components/PokemonTeam";

const Home = () => {
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const [team, setTeam] = useState([]);
  const [userTeam, setUserTeam] = useState([]);
  const [maxCost, setMaxCost] = useState(10);
  const [userPokemon, setUserPokemon] = useState([]);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserIsLoggedIn(true);
        const storedPokemon = localStorage.getItem("userPokemons");
        console.log(storedPokemon);
        if (storedPokemon) {
          const parsedPokemon = JSON.parse(storedPokemon);
          setUserPokemon(parsedPokemon);
        }
      } else {
        setUserIsLoggedIn(false);
      }
    });
  }, [auth]);

  const generateTeam = () => {
    let newTeam = [];
    let totalCost = 0;
    const source = pokemonData;

    while (totalCost < maxCost && newTeam.length < 6) {
      const randomIndex = Math.floor(Math.random() * source.length);
      const pokemon = source[randomIndex];

      if (totalCost + pokemon.cost <= maxCost && !newTeam.includes(pokemon)) {
        newTeam.push(pokemon);
        totalCost += pokemon.cost;
      }
    }

    setTeam(newTeam);
  };

  const generateUserTeam = () => {
    let newUserTeam = [];
    let totalCost = 0;
    const source = userPokemon;

    while (totalCost < maxCost && newUserTeam.length < 6) {
      const randomIndex = Math.floor(Math.random() * source.length);
      const pokemon = source[randomIndex];

      if (totalCost + pokemon.cost <= maxCost && !newUserTeam.includes(pokemon)) {
        newUserTeam.push(pokemon);
        totalCost += pokemon.cost;
      }
    }

    setUserTeam(newUserTeam);
  };

  const handleClick = () => {
    if (userIsLoggedIn) {
      generateUserTeam();
    } else {
      generateTeam();
    }
  };

  // Fonction pour gérer le changement de coût maximum
  const handleMaxCostChange = (event) => {
    setMaxCost(parseInt(event.target.value));
  };

  useEffect(() => {
    if (auth.currentUser) {
      setUsername(auth.currentUser.displayName);
    }
  }, [auth.currentUser]);

  return (
    <div className="main">
      <Header username={username} />
      <div className="description">
        <p>
          Bienvenue {username} ! Cliquez sur le bouton ci-dessous pour générer une équipe de Pokémon
          aléatoire.
        </p>
        <p>
          Vous avez le choix entre une équipe avec 10 ou 15 de coût maximum, en fonction de votre
          préférence. Une fois l'équipe générée, vous pouvez cliquer sur les cartes pour être
          redirigé vers leur page Smogon correspondante !
        </p>
      </div>
      <div className="cost-filter">
        <p>Coût maximum de l'équipe :</p>
        <label>
          <input type="radio" value="10" checked={maxCost === 10} onChange={handleMaxCostChange} />
          <span>10</span>
        </label>
        <label>
          <input type="radio" value="15" checked={maxCost === 15} onChange={handleMaxCostChange} />
          <span>15</span>
        </label>
      </div>
      <button onClick={handleClick}>Générer une nouvelle équipe</button>
      {userIsLoggedIn ? <PokemonTeam team={userTeam} /> : <PokemonTeam team={team} />}
    </div>
  );
};

export default Home;
