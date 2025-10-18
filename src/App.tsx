import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Vetements from "./pages/Vetement";
import Chaussures from "./pages/Chaussures";
import Accessoires from "./pages/Accessoirs";
import Voiles from "./pages/Voiles";
import Promotions from "./pages/Promotions";
import ProduitPage from "./pages/Produit";
import Panier from "./pages/Panier";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/vetements" element={<Vetements />} />
        <Route path="/chaussures" element={<Chaussures />} />
        <Route path="/accessoires" element={<Accessoires />} />
        <Route path="/voiles" element={<Voiles />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/produit/:id" element={<ProduitPage />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}
export default App;
