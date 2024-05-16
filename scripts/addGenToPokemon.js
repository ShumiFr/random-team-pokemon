const fs = require('fs');

function readJson(src) {
	const json = fs.readFileSync(src);
	if (!json) return null;
	const data = JSON.parse(json);
	return data;
}

function writeJson(filePath, body) {
	fs.writeFile(filePath, JSON.stringify(body, null, 4), 'utf8', function (err) {
		if (err) {
			console.error('An error occured while writing in ' + filePath);
			console.error(err);
		} else {
			console.log('Succesfully write in ' + filePath);
		}
	});
}

const genLimits = [151, 251, 386, 493, 649, 721, 809, 905];

const generation = pokemonData => {
	// en Javascript, si on modifie pokemon.generation, ce sera le cas aussi dans data
	// donc pas besoin de retourner une nouvelle liste
	// Attention, quand on est en React, les objets sont immuables donc il faut éviter de faire ça mais plutot faire
	// const newPokemon = {...pokemon, genLimits.length + 1}
	Object.values(pokemonData).forEach(pokemon => {
		const dexNumber = parseInt(pokemon.dex.split('-')[0]);
		const dexNumberRegional = pokemon.dex;

		if (dexNumberRegional.includes('-regional-a')) {
			pokemon.generation = 7;
		} else if (
			dexNumberRegional.includes('-regional-g') ||
			dexNumberRegional.includes('-regional-h')
		) {
			pokemon.generation = 8;
		} else if (
			dexNumberRegional.includes('-bloodmoon') ||
			dexNumberRegional.includes('-regional-p')
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
	});
};

const data = readJson('src/data/pokemons.json');

generation(data);

writeJson('src/data/pokemons.json', data);