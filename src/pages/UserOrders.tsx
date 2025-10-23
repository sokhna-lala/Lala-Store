import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

type Order = {
  id: string;
  user: string;
  items: Array<{
    id?: string | number;
    titre?: string;
    prix?: string | number;
    qty?: number;
  }>;
  total: string;
  status: string;
  date: string;
  paymentMethod: string;
  phone: string;
  address: string;
};

export default function UserOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserOrders();
  }, [user]);

  async function fetchUserOrders() {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const response = await fetch(
        `${apiUrl}/orders?user=${encodeURIComponent(user.email)}`
      );
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "processing":
        return "text-blue-600 bg-blue-100";
      case "shipped":
        return "text-purple-600 bg-purple-100";
      case "delivered":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }

  function getStatusText(status: string) {
    switch (status.toLowerCase()) {
      case "pending":
        return "En attente";
      case "processing":
        return "En cours de traitement";
      case "shipped":
        return "Expédiée";
      case "delivered":
        return "Livrée";
      case "cancelled":
        return "Annulée";
      default:
        return status;
    }
  }

  if (!user) {
    return (
      <Layout>
        <div className="p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Mes Commandes</h1>
            <p className="text-gray-600">
              Veuillez vous connecter pour voir vos commandes.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Mes Commandes</h1>
          <div className="text-center">Chargement...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Mes Commandes</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Vous n'avez pas encore passé de commande.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Commande #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600">Date: {order.date}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                    <p className="text-lg font-bold mt-2">{order.total}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Articles commandés:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>
                          {item.titre} (x{item.qty})
                        </span>
                        <span>
                          {typeof item.prix === "number"
                            ? `${item.prix} €`
                            : item.prix}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-1">Méthode de paiement:</h4>
                    <p>
                      {order.paymentMethod === "wave" ? "Wave" : "Orange Money"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Téléphone:</h4>
                    <p>{order.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="font-semibold mb-1">
                      Adresse de livraison:
                    </h4>
                    <p>{order.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
