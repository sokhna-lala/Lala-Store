import React from "react";
import "./Header.css"; // pour le style

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img src="/logo.png" alt="Logo" className="logo" />
        <span className="accueil">Accueil</span>
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Rechercher un article..."
          className="search-bar"
        />
      </div>

      <div className="header-right">
        <button className="icon-button">🛒</button>
        <button className="icon-button">👤</button>
        <button className="icon-button">❤</button>
      </div>
    </header>
  );
};

export default Header;
