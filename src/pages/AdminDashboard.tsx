import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { products } from "../data/products";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
  });

  useEffect(() => {
    // Calculate stats
    const productCount = products.length;
    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    const userCount = users.length;
    const ordersRaw = localStorage.getItem("orders");
    const orders = ordersRaw ? JSON.parse(ordersRaw) : [];
    const orderCount = orders.length;
    setStats({
      products: productCount,
      users: userCount,
      orders: orderCount,
    });
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-600">Accès refusé</h1>
          <p>Vous devez être administrateur pour accéder à cette page.</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout header={true} navbar={false}>
      <div className="py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Produits</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.products}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Utilisateurs</h2>
            <p className="text-3xl font-bold text-green-600">{stats.users}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">Commandes</h2>
            <p className="text-3xl font-bold text-orange-600">{stats.orders}</p>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/products"
            className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 text-center"
          >
            <h3 className="text-xl font-semibold">Gérer les Produits</h3>
            <p>Ajouter, modifier, supprimer des produits</p>
          </Link>
          <Link
            to="/admin/users"
            className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700 text-center"
          >
            <h3 className="text-xl font-semibold">Gérer les Utilisateurs</h3>
            <p>Voir et modifier les rôles des utilisateurs</p>
          </Link>
          <Link
            to="/admin/orders"
            className="bg-orange-600 text-white p-6 rounded-lg shadow hover:bg-orange-700 text-center"
          >
            <h3 className="text-xl font-semibold">Gérer les Commandes</h3>
            <p>Voir et mettre à jour le statut des commandes</p>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
