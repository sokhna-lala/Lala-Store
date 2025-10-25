import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 10;

type Order = {
  id?: string;
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

export default function AdminOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    // Load from localStorage
    const ordersRaw = localStorage.getItem("orders");
    if (ordersRaw) {
      setOrders(JSON.parse(ordersRaw));
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

  const handleStatusChange = (id: string | undefined, newStatus: string) => {
    if (!id) return;
    const updatedOrders = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
    // Also update local storage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    Swal.fire("Succès", "Statut de la commande mis à jour", "success");
  };

  // Filtrage et recherche
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.id && order.id.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      selectedStatus === "" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

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

        {/* Recherche et filtres */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher par utilisateur ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border p-2 rounded"
            aria-label="Filtrer par statut"
          >
            <option value="">Tous les statuts</option>
            <option value="pending">En attente</option>
            <option value="processing">En cours</option>
            <option value="shipped">Expédié</option>
            <option value="delivered">Livré</option>
            <option value="cancelled">Annulé</option>
          </select>
        </div>

        <div className="space-y-6">
          {paginatedOrders.map((order) => (
            <div
              key={order.id || Math.random()}
              className="bg-white shadow rounded-lg p-6"
            >
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
                      handleStatusChange(order.id!, e.target.value)
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
                      {item.titre} (x{item.qty}) -{" "}
                      {typeof item.prix === "number"
                        ? `${item.prix} €`
                        : item.prix}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"
              >
                Précédent
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium border ${
                      page === currentPage
                        ? "text-blue-600 bg-blue-50 border-blue-500"
                        : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50"
              >
                Suivant
              </button>
            </nav>
          </div>
        )}
      </div>
    </Layout>
  );
}
