import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="#">Nouveautés</a>
        </li>
        <li>
          <a href="#">Vêtements</a>
        </li>
        <li>
          <a href="#">Chaussures</a>
        </li>
        <li>
          <a href="#">Accessoires</a>
        </li>
        <li>
          <a href="#">Voiles</a>
        </li>
        <li>
          <a href="#">Promotions</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
