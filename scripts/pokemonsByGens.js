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

const data = readJson('src/data/pokemons.json');

const pokemonByGeneration = Object.values(data).reduce((acc, pokemon) => {
	const generation = pokemon.generation;
	if (!acc[generation]) {
		acc[generation] = [];
	}
	acc[generation].push(pokemon);
	return acc;
}, {});

writeJson('src/data/pokemonsByGens.json', pokemonByGeneration);
