// Generation.jsx
const generation = (pokemonData) => {
  const genLimits = [151, 251, 386, 493, 649, 721, 809, 905];
  const updatedPokemonData = pokemonData.map((pokemon) => {
    const dexNumber = parseInt(pokemon.dex.split("-")[0]);
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
    } else {
      for (let i = 0; i < genLimits.length; i++) {
        if (dexNumber <= genLimits[i]) {
          pokemon.generation = i + 1;
          break;
        }
      }
      if (!pokemon.generation) {
        pokemon.generation = genLimits.length + 1;
      }
    }

    return pokemon;
  });

  return updatedPokemonData;
};

export default generation;
