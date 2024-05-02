import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import "../assets/Header.css";

const Header = ({ username }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Déconnexion réussie");
        window.location.reload();
      })
      .catch((error) => {
        // An error happened.
        console.error("Une erreur est survenue lors de la déconnexion", error);
      });
  };

  return (
    <header>
      <h1>Equipe Pokérogue aléatoire</h1>
      {username && <h2>{username}</h2>}
      <nav>
        <ul>
          <li>
            <Link to="/" className={isActive("/") ? "active" : ""}>
              Accueil
            </Link>
          </li>
          {username && (
            <li>
              <Link to="/pokedex" className={isActive("/pokedex") ? "active" : ""}>
                Pokédex
              </Link>
            </li>
          )}
          {!username && (
            <li>
              <Link to="/login" className={isActive("/login") ? "active" : ""}>
                Connexion
              </Link>
            </li>
          )}
          {!username && (
            <li>
              <Link to="/signup" className={isActive("/signup") ? "active" : ""}>
                Inscription
              </Link>
            </li>
          )}
          {username && (
            <li>
              <button className="header_deconnect" onClick={handleLogout}>
                Déconnexion
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
