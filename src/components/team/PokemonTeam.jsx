import React from 'react';
import colors from '../../constants/colors';
import pokemons from '../../data/pokemons.json';

const PokemonTeam = ({ team }) => {
	return (
		<div className="container">
			<div className="gallery-card">
				{team.map(dex => {
					const pokemon = pokemons[dex];
					const color = colors[pokemon.type];
					return (
						<a
							href={`https://www.smogon.com/dex/sv/pokemon/${pokemon.image}`}
							target="_blank"
							rel="noreferrer"
							key={dex}
						>
							<div className="card" style={{ '--color': color }}>
								<img
									src={`https://assets.pokeos.com/pokemon/home/${pokemon.dex}.png`}
									alt={pokemon.name}
								/>
								<h2>{pokemon.name}</h2>
								<p className="cost">{pokemon.cost}</p>
							</div>
						</a>
					);
				})}
			</div>
		</div>
	);
};

export default PokemonTeam;
