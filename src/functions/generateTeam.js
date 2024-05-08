import pokemons from "../data/pokemons";

export const generateTeam = (maxCost, pokemonsGiven) => {
  let newTeam = [];
  let totalCost = 0;
  const source = pokemonsGiven.length > 1 ? pokemonsGiven : Object.keys(pokemons);

  let securityIndex = 0;
  while (
    totalCost < maxCost &&
    newTeam.length < (source.length > 6 ? 6 : source.length) &&
    securityIndex < 100
  ) {
    const randomIndex = Math.floor(Math.random() * source.length);
    const dex = source[randomIndex];
    const pokemon = pokemons[dex];
    console.log("pokemon", pokemon.cost);

    if (totalCost + pokemon.cost <= maxCost && !newTeam.includes(dex)) {
      newTeam.push(dex);
      totalCost += pokemon.cost;
    }

    securityIndex++;
  }

  return newTeam;
};
