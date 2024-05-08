import React, { useContext } from 'react';
import { UserPokemonsContext } from '../../contexts/UserPokemonsContext';
import colors from '../../constants/colors';

const PokemonCard = ({ pokemon }) => {
	const { addPokemon, removePokemon, userPokemons } = useContext(UserPokemonsContext);
	const color = colors[pokemon.type];
	const isInCollection = userPokemons.includes(pokemon.dex);

	const togglePokemon = () => {
		if (!isInCollection) {
			addPokemon(pokemon.dex);
		} else if (!pokemon.permanent) {
			removePokemon(pokemon);
		}
	};
  
	return (
		<div
			// TODO if pokemon.permanent => cursor: default and not cursor: pointer
			className={`card ${!isInCollection ? 'not-in-collection' : ''}`}
			style={{ '--color': color }}
			key={pokemon.dex}
			onClick={togglePokemon}
		>
			{isInCollection && (
				<div className="remove-from-collection">X</div>
			)}
			<img
				src={`https://assets.pokeos.com/pokemon/home/${pokemon.dex}.png`}
				alt={pokemon.name}
			/>
			<h3>{pokemon.name}</h3>
			<p className="cost">{pokemon.cost}</p>
		</div>
	);
};

export default PokemonCard;
