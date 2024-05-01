import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/Header.css";

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header>
      <h1>Equipe Pokérogue aléatoire</h1>
      <nav>
        <ul>
          <li>
            <Link to="/" className={isActive("/") ? "active" : ""}>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/pokedex" className={isActive("/pokedex") ? "active" : ""}>
              Pokédex
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
