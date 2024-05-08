import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import '../styles/Pokedex.css';
import '../styles/Home.css';
import pokemonsByGens from '../data/pokemonsByGens.json';
import Header from '../components/layout/Header';
import ScrollTopButton from '../components/button/ScrollTopButton';
import GenerationNav from '../components/navigation/GenerationNav';
import GenerationSection from '../components/section/GenerationSection';

const Pokedex = () => {
	const auth = getAuth();
	const [username, setUsername] = useState('');

	useEffect(() => {
		if (auth.currentUser) {
			setUsername(auth.currentUser.displayName);
		}
	}, [auth.currentUser]);

	return (
		<div className="pokedex-page">
			<Header username={username} />
			<div className="pokedex-description">
				<p>
					Bienvenue {username} dans le pokédex ! Vous pouvez naviguer entre les
					générations avec les différents bouton ci-dessous. Vous pouvez
					également changer le coût de vos pokémons si vous êtes connecté !
				</p>
				<p>
					Cliquez sur les cartes pour les ajouter ou les retirer de votre
					collection !
				</p>
			</div>
			<GenerationNav />
			<ScrollTopButton />
			{Object.entries(pokemonsByGens).map(([gen, pokemons]) => (
				<GenerationSection key={gen} gen={gen} pokemons={pokemons} />
			))}
		</div>
	);
};

export default Pokedex;
