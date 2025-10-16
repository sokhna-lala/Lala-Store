import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import OrdersPage from "./components/OrdersPage";
import StatsPage from "./components/StatsPage";
import ProductsPage from "./components/ProductsPage";
import ClientsPage from "./components/ClientsPage";
import ProductForm from "./components/ProductForm";
import StockPage from "./components/StockPage";

export default function AdminApp() {
  return (
    <Router>
        <div className="min-h-screen flex bg-slate-50">
            <Sidebar />
            <main className="flex-1 p-6">
                <Routes>
                    <Route path="/admin" element={<Dashboard />} />
                    <Route path="/admin/orders" element={<OrdersPage />} />
                    <Route path="/admin/stats" element={<StatsPage />} />
                    <Route path="/admin/products" element={<ProductsPage />} />
                    <Route path="/admin/products/new" element={<ProductForm />} />
                    <Route path="/admin/products/:id/edit" element={<ProductForm />} />
                    <Route path="/admin/clients" element={<ClientsPage />} />
                    <Route path="/admin/stock" element={<StockPage />} />
                </Routes>
            </main>
        </div>
    </Router>
  );
  
}
            