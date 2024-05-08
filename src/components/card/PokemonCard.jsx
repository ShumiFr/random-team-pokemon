import React, { useContext } from "react";
import { UserPokemonsContext } from "../../contexts/UserPokemonsContext";
import colors from "../../constants/colors";

const PokemonCard = ({ pokemon }) => {
  const { addPokemon, removePokemon, userPokemons } = useContext(UserPokemonsContext);
  const color = colors[pokemon.type];
  const isInCollection =
    userPokemons.some((userPokemon) => userPokemon.dex === pokemon.dex) || pokemon.permanent;

  return (
    <div
      className={`card ${!isInCollection ? "not-in-collection" : ""}`}
      style={{ "--color": color }}
      key={pokemon.dex}
      onClick={() => {
        if (!pokemon.permanent) {
          if (!isInCollection) {
            addPokemon(pokemon.dex);
          } else {
            removePokemon(pokemon.dex);
          }
        }
      }}
    >
      {isInCollection && !pokemon.permanent && (
        <div
          className="remove-from-collection"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            removePokemon(pokemon.dex);
          }}
        >
          X
        </div>
      )}
      <img src={`https://assets.pokeos.com/pokemon/home/${pokemon.dex}.png`} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p className="cost">{pokemon.cost}</p>
    </div>
  );
};

export default PokemonCard;
