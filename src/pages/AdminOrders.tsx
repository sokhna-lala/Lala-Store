import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

type Order = {
  id: string;
  user: string;
  items: Array<{ id: string; titre: string; prix: string; qty: number }>;
  total: string;
  status: string;
  date: string;
};

export default function AdminOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Fallback to local storage if API fails
      const ordersRaw = localStorage.getItem("orders");
      if (ordersRaw) {
        setOrders(JSON.parse(ordersRaw));
      }
    }
  };

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

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
      await fetch(`${apiUrl}/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedOrders = orders.map((o) =>
        o.id === id ? { ...o, status: newStatus } : o
      );
      setOrders(updatedOrders);
      // Also update local storage
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Erreur lors de la mise à jour du statut de la commande");
    }
  };

  return (
    <Layout header={true} navbar={false}>
      <div className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gérer les Commandes</h1>
          <Link
            to="/admin"
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Retour au Dashboard
          </Link>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Commande #{order.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Utilisateur: {order.user}
                  </p>
                  <p className="text-sm text-gray-600">Date: {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{order.total}</p>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 mt-2"
                    aria-label="Changer le statut de la commande"
                  >
                    <option value="pending">En attente</option>
                    <option value="processing">En cours</option>
                    <option value="shipped">Expédié</option>
                    <option value="delivered">Livré</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </div>
              </div>
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2">Articles:</h4>
                <ul className="space-y-1">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600">
                      {item.titre} (x{item.qty}) - {item.prix}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
