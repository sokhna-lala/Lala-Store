import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  // 'children' représente le contenu spécifique de la page actuelle
  return (
    <div className="app-container">
      <Header />
      <Navbar />
      <main>{children} // Ici s'affiche la page (Accueil, Panier, etc.)</main>
      <Footer />
    </div>
  );
}

export default Layout;
