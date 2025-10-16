import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Stats {
    totalSales: number;
    totalProductsSold: number;
    uniqueClients: number;
}

interface Product {
    id: string | number;
    name: string;
    price: number;
    stock: number;
}

interface Client {
    id: string | number;
    name: string;
    email: string;
}

interface Order {
    id: string | number;
    clientId: number;
    productId: number;
    quantity: number;
    date: string;
}

export default function Dashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [clients, setClients] = useState<Client[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsResponse, productsResponse, clientsResponse, ordersResponse] = await Promise.all([
                    fetch('http://localhost:3000/stats'),
                    fetch('http://localhost:3000/products'),
                    fetch('http://localhost:3000/clients'),
                    fetch('http://localhost:3000/orders')
                ]);
                const statsData = await statsResponse.json();
                const productsData = await productsResponse.json();
                const clientsData = await clientsResponse.json();
                const ordersData = await ordersResponse.json();
                setStats(statsData);
                setProducts(productsData);
                setClients(clientsData);
                setOrders(ordersData);
                setLoading(false);
            } catch (err) {
                setError((err as Error).message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = async (productId: string | number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`http://localhost:3000/products/${productId}`, { method: 'DELETE' });
                if (response.ok) {
                    setProducts(products.filter(p => p.id !== productId));
                } else {
                    setError('Failed to delete product');
                }
            } catch (err) {
                setError((err as Error).message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-red-900 p-8">
            <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                💎 Tableau de bord Administrateur
            </h1>

            {/* Cartes statistiques */}
            {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-3xl shadow-2xl p-6 flex items-center gap-4 border border-orange-300 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
                        <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V5a4 4 0 00-8 0v6M5 20h14a2 2 0 002-2v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm uppercase tracking-wider text-orange-200">Total des Ventes</div>
                            <div className="text-4xl font-bold">{stats.totalSales}</div>
                            <div className="text-xs text-orange-300">En fcf</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-3xl shadow-2xl p-6 flex items-center gap-4 border border-orange-300 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
                        <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a4 4 0 118 0v6m-5 3h2" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm uppercase tracking-wider text-orange-200">Produits Vendus</div>
                            <div className="text-4xl font-bold">{stats.totalProductsSold}</div>
                            <div className="text-xs text-orange-300">Total des produits</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-3xl shadow-2xl p-6 flex items-center gap-4 border border-orange-300 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
                        <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17a4 4 0 01-4-4V7a4 4 0 118 0v6a4 4 0 01-4 4z" />
                            </svg>
                        </div>
                        <div>
                            <div className="text-sm uppercase tracking-wider text-orange-200">Clients Uniques</div>
                            <div className="text-4xl font-bold">{stats.uniqueClients}</div>
                            <div className="text-xs text-orange-300">Nombre de clients</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Filtres et actions */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow max-w-6xl mx-auto border border-orange-200">
                <div className="flex gap-3 flex-wrap">
                    <button onClick={() => window.location.reload()} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
                        🔄 Rafraîchir
                    </button>
                    <Link to="/admin/products/new" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
                        ➕ Ajouter Produit
                    </Link>
                </div>
                <div className="flex gap-3 flex-wrap items-center">
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher produits..."
                        className="border border-orange-300 p-2 rounded-lg w-60 focus:ring-2 focus:ring-orange-400 outline-none bg-white/90"
                    />
                </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto bg-white/90 rounded-2xl shadow-md backdrop-blur-sm max-w-6xl mx-auto border border-orange-200">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800">
                        <tr>
                            {["ID", "Nom", "Prix", "Stock", "Actions"].map((h) => (
                                <th key={h} className="p-3 text-left font-semibold border-b border-gray-200">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center p-6 text-gray-400">Chargement...</td></tr>
                        ) : error ? (
                            <tr><td colSpan={5} className="text-center p-6 text-red-500">Erreur: {error}</td></tr>
                        ) : pageProducts.length === 0 ? (
                            <tr><td colSpan={5} className="text-center p-6 text-gray-400">Aucun produit trouvé.</td></tr>
                        ) : (
                            pageProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-orange-50 transition">
                                    <td className="p-3 border-b">{product.id}</td>
                                    <td className="p-3 border-b">{product.name}</td>
                                    <td className="p-3 border-b">{product.price} fcf</td>
                                    <td className="p-3 border-b">{product.stock}</td>
                                    <td className="p-3 text-center border-b">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                                                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 py-1 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2 py-1 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center max-w-6xl mx-auto mt-6 text-gray-700">
                <div className="text-sm">
                    {totalItems === 0
                        ? "0 résultat"
                        : `Affichage ${startIndex + 1} - ${Math.min(startIndex + pageProducts.length, totalItems)} sur ${totalItems}`}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-lg bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 disabled:opacity-50 transition-all"
                    >
                        «
                    </button>
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-lg bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 disabled:opacity-50 transition-all"
                    >
                        ‹
                    </button>
                    <span className="px-3 py-1 bg-white border rounded-lg shadow-sm border-orange-200">
                        Page <b>{currentPage}</b> / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-lg bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 disabled:opacity-50 transition-all"
                    >
                        ›
                    </button>
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-lg bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 disabled:opacity-50 transition-all"
                    >
                        »
                    </button>
                </div>
            </div>

            {/* Liste des clients */}
            <div className="mt-10 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                    👥 Liste des Clients
                </h2>
                <div className="overflow-x-auto bg-white/90 rounded-2xl shadow-md backdrop-blur-sm border border-orange-200">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800">
                            <tr>
                                {["ID", "Nom", "Email"].map((h) => (
                                    <th key={h} className="p-3 text-left font-semibold border-b border-gray-200">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={3} className="text-center p-6 text-gray-400">Chargement...</td></tr>
                            ) : error ? (
                                <tr><td colSpan={3} className="text-center p-6 text-red-500">Erreur: {error}</td></tr>
                            ) : clients.length === 0 ? (
                                <tr><td colSpan={3} className="text-center p-6 text-gray-400">Aucun client trouvé.</td></tr>
                            ) : (
                                clients.map((client) => (
                                    <tr key={client.id} className="hover:bg-orange-50 transition">
                                        <td className="p-3 border-b">{client.id}</td>
                                        <td className="p-3 border-b">{client.name}</td>
                                        <td className="p-3 border-b">{client.email}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Liste des commandes */}
            <div className="mt-10 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                    📦 Liste des Commandes
                </h2>
                <div className="overflow-x-auto bg-white/90 rounded-2xl shadow-md backdrop-blur-sm border border-orange-200">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800">
                            <tr>
                                {["ID", "Client ID", "Produit ID", "Quantité", "Date"].map((h) => (
                                    <th key={h} className="p-3 text-left font-semibold border-b border-gray-200">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={5} className="text-center p-6 text-gray-400">Chargement...</td></tr>
                            ) : error ? (
                                <tr><td colSpan={5} className="text-center p-6 text-red-500">Erreur: {error}</td></tr>
                            ) : orders.length === 0 ? (
                                <tr><td colSpan={5} className="text-center p-6 text-gray-400">Aucune commande trouvée.</td></tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-orange-50 transition">
                                        <td className="p-3 border-b">{order.id}</td>
                                        <td className="p-3 border-b">{order.clientId}</td>
                                        <td className="p-3 border-b">{order.productId}</td>
                                        <td className="p-3 border-b">{order.quantity}</td>
                                        <td className="p-3 border-b">{order.date}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
