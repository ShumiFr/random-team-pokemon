// PokemonTeam.jsx
import React from "react";

const PokemonTeam = ({ team }) => {
  const getColorByType = (type) => {
    switch (type) {
      case "Fire":
        return "#F08030";
      case "Grass":
        return "#78C850";
      case "Water":
        return "#6890F0";
      case "Bug":
        return "#A8B820";
      case "Normal":
        return "#A8A878";
      case "Poison":
        return "#A040A0";
      case "Electric":
        return "#F8D030";
      case "Ground":
        return "#E0C068";
      case "Fairy":
        return "#EE99AC";
      case "Fighting":
        return "#C03028";
      case "Psychic":
        return "#F85888";
      case "Rock":
        return "#B8A038";
      case "Ghost":
        return "#705898";
      case "Ice":
        return "#98D8D8";
      case "Dragon":
        return "#7038F8";
      case "Dark":
        return "#705848";
      case "Steel":
        return "#B8B8D0";
      case "Flying":
        return "#A890F0";
      default:
        return "#A8A878"; // Couleur par défaut pour les types non spécifiés
    }
  };

  return (
    <div className="container">
      <div className="gallery-card">
        {team.map((pokemon, index) => {
          const color = getColorByType(pokemon.type);
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
