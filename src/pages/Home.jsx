import React, { useState, useEffect, useContext } from "react";
import { getAuth } from "firebase/auth";
import pokemonData from "../data/pokemon.json";
import Header from "../components/layout/Header";
import PokemonTeam from "../components/PokemonTeam";
import { UserPokemonsContext } from "../contexts/UserPokemonsContext";

const Home = () => {
  const [username, setUsername] = useState("");
  const auth = getAuth();
  const [team, setTeam] = useState([]);
  const [maxCost, setMaxCost] = useState(10);
  const { userPokemons } = useContext(UserPokemonsContext);

  useEffect(() => {
    if (auth.currentUser) {
      setUsername(auth.currentUser.displayName);
      console.log("User is logged in");
    } else {
      console.log("User is not logged in");
    }
  }, [auth.currentUser]);

  console.log(userPokemons);

  const generateTeam = () => {
    let newTeam = [];
    let totalCost = 0;
    const source = auth.currentUser && userPokemons.length > 1 ? userPokemons : pokemonData;

    let securityIndex = 0;
    while (
      totalCost < maxCost &&
      newTeam.length < (source.length > 6 ? 6 : source.length) &&
      securityIndex < 100
    ) {
      const randomIndex = Math.floor(Math.random() * source.length);
      const pokemon = source[randomIndex];

      if (totalCost + pokemon.cost <= maxCost && !newTeam.includes(pokemon)) {
        newTeam.push(pokemon);
        totalCost += pokemon.cost;
      }

      securityIndex++;
    }

    setTeam(newTeam);
  };

  const handleClick = () => {
    generateTeam();
  };

  // Fonction pour gérer le changement de coût maximum
  const handleMaxCostChange = (event) => {
    setMaxCost(parseInt(event.target.value));
  };

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
      <PokemonTeam team={team} />
    </div>
  );
};

export default Home;
