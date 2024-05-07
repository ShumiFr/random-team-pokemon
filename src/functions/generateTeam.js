import pokemonData from "../data/pokemon.json";

export const generateTeam = (maxCost, userPokemons, setTeam) => {
  let newTeam = [];
  let totalCost = 0;
  const source = userPokemons.length > 1 ? userPokemons : pokemonData;

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
