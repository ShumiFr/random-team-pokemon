import React, { useState, useEffect } from 'react';

export const UserPokemonsContext = React.createContext();

export const UserPokemonsProvider = ({ children }) => {
	const [userPokemons, setUserPokemons] = useState([]);

	useEffect(() => {
		const savedUserPokemons = localStorage.getItem(`user_pokemons`);
		if (savedUserPokemons) {
			setUserPokemons(JSON.parse(savedUserPokemons));
		}
	}, []);

	useEffect(() => {
		if (userPokemons.length) {
			localStorage.setItem(`user_pokemons`, JSON.stringify(userPokemons));
		}
	}, [userPokemons]);

	const addPokemon = pokemon => {
		setUserPokemons(dexs => [...dexs, pokemon]);
	};

	function removePokemon(pokemon) {
		if (pokemon.permanent) return;
		setUserPokemons(dexs => dexs.filter(dex => dex !== pokemon.dex));
	}

	return (
		<UserPokemonsContext.Provider
			value={{ userPokemons, setUserPokemons, addPokemon, removePokemon }}
		>
			{children}
		</UserPokemonsContext.Provider>
	);
};
