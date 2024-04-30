import React from "react";
import "../assets/Header.css";

const Header = () => {
  return (
    <header>
      <h1>Equipe Pokérogue aléatoire</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/pokedex">Pokédex</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
