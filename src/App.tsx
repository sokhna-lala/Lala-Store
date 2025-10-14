import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Accueil from "./pages/Accueil";
import Vetements from "./pages/Vetement";
import Chaussures from "./pages/Chaussures";
import Accessoires from "./pages/Accessoirs";
import Voiles from "./pages/Voiles";
import Promotions from "./pages/Promotions";

export default function App() {
  return (
    <Router>
      <Layout header={true} navbar={true} footer={true}>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/vetements" element={<Vetements />} />
          <Route path="/chaussures" element={<Chaussures />} />
          <Route path="/accessoires" element={<Accessoires />} />
          <Route path="/voiles" element={<Voiles />} />
          <Route path="/promotions" element={<Promotions />} />
        </Routes>
      </Layout>
    </Router>
  );
}
