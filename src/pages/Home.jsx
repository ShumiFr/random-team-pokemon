// Home.js
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import PokemonTeam from "../components/PokemonTeam"; // Assurez-vous que le chemin est correct
import "../assets/Home.css";
import Header from "../components/Header";
import pokemonData from "../data/pokemon.json"; // Ajoutez l'importation des données de Pokémon ici

const Home = () => {
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const [team, setTeam] = useState([]);
  const [maxCost, setMaxCost] = useState(10); // Nouvel état pour le coût maximum

  // Fonction pour générer une équipe de Pokémon dont le coût total est égal à maxCost et sans doublons
  // Fonction pour générer une équipe de Pokémon dont le coût total est égal à maxCost et sans doublons
  const generateTeam = () => {
    let newTeam = [];
    let totalCost = 0;

    while (totalCost < maxCost && newTeam.length < 6) {
      // Ajoutez une condition pour vérifier que l'équipe ne contient pas plus de 6 Pokémon
      const randomIndex = Math.floor(Math.random() * pokemonData.length);
      const pokemon = pokemonData[randomIndex];

      if (totalCost + pokemon.cost <= maxCost && !newTeam.includes(pokemon)) {
        newTeam.push(pokemon);
        totalCost += pokemon.cost;
      }
    }

    setTeam(newTeam);
  };

  // Fonction pour gérer le changement de coût maximum
  const handleMaxCostChange = (event) => {
    setMaxCost(parseInt(event.target.value));
  };

  const handleClick = () => {
    generateTeam(); // Génère une nouvelle équipe lorsque le bouton est cliqué
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
      <PokemonTeam team={team} /> {/* Passez l'équipe en tant que prop */}
    </div>
  );
};

export default Home;
