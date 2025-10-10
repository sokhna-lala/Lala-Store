import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3>À Propos de la boutique</h3>
          <img src="/logo.png" alt="Logo Lala'store" className="footer-logo" />
        </div>

        <div className="footer-column">
          <h3>Services Clients</h3>
          <ul>
            <li>
              <a href="#">Suivi Commande</a>
            </li>
            <li>
              <a href="#">Livraison et retour</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Restons connectés</h3>
          <input type="email" placeholder="Entrez votre mail..." />
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Lala'store 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
