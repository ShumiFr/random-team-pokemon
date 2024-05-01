import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/Header.css";

const Header = () => {
  return (
    <header>
      <h1>Equipe Pokérogue aléatoire</h1>
      <nav>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink to="/pokedex" activeClassName="active">
              Pokédex
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
