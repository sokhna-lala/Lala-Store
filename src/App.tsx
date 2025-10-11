import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Vetement from "./pages/Vetement";
import Chaussures from "./pages/Chaussures";
import Accessoirs from "./pages/Accessoirs";
import Voiles from "./pages/Voiles";
import Promotions from "./pages/Promotions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/vetements" element={<Vetement />} />
      <Route path="/chaussures" element={<Chaussures />} />
      <Route path="/accessoires" element={<Accessoirs />} />
      <Route path="/voiles" element={<Voiles />} />
      <Route path="/promotions" element={<Promotions />} />
    </Routes>
  );
}

export default App;
