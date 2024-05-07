import { useState } from "react";
import { generateTeam } from "../functions/generateTeam";

const useTeamGeneration = (userPokemons) => {
  const [team, setTeam] = useState([]);
  const [maxCost, setMaxCost] = useState(10);

  const handleGenerateTeam = () => {
    generateTeam(maxCost, userPokemons, setTeam);
  };

  const handleMaxCostChange = (event) => {
    setMaxCost(parseInt(event.target.value));
  };

  return { team, maxCost, handleGenerateTeam, handleMaxCostChange };
};

export default useTeamGeneration;
