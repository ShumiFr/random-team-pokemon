import React, { useContext } from "react";
import Header from "../components/layout/Header";
import PokemonTeam from "../components/team/PokemonTeam";
import { UserPokemonsContext } from "../contexts/UserPokemonsContext";
import CostFilter from "../components/button/CostFilter";
import GenerateTeamButton from "../components/button/GenerateTeamButton";
import useAuth from "../hooks/useAuth";
import useTeamGeneration from "../hooks/useTeamGeneration";

const Home = () => {
  const username = useAuth();
  const { userPokemons } = useContext(UserPokemonsContext);
  const { team, maxCost, handleGenerateTeam, handleMaxCostChange } =
    useTeamGeneration(userPokemons);

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
      <CostFilter maxCost={maxCost} onChange={handleMaxCostChange} />
      <GenerateTeamButton onClick={handleGenerateTeam} />
      <PokemonTeam team={team} />
    </div>
  );
};

export default Home;
