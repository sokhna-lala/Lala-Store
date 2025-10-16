import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Cart from "./pages/Cart";
import AdminApp from "./admin/AdminApp";
import Dashboard from "./admin/components/Dashboard"; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes >
    </Router>
  );
}
export default App;
