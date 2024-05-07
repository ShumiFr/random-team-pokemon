// PokemonTeam.jsx
import React from "react";
import colors from "../../constants/colors";

const PokemonTeam = ({ team }) => {
  return (
    <div className="container">
      <div className="gallery-card">
        {team.map((pokemon, index) => {
          const color = colors[pokemon.type];
          return (
            <a
              href={`https://www.smogon.com/dex/sv/pokemon/${pokemon.image}`}
              target="_blank"
              rel="noreferrer"
              key={index}
            >
              <div key={index} className="card" style={{ "--color": color }}>
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
