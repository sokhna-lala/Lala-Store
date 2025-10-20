import { useEffect, useState } from "react";
import { Search, Bell, User, TrendingUp, Package, Users } from 'lucide-react';
import Swal from 'sweetalert2';

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
    image: string;
}

interface Client {
    id: string | number;
    name: string;
    email: string;
    phone: string;
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
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchClients, setSearchClients] = useState("");
    const [searchOrders, setSearchOrders] = useState("");
    const [activeTab, setActiveTab] = useState<'products' | 'clients' | 'orders'>('products');
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: 0, stock: 0, image: '' });
    const [globalSearchTerm, setGlobalSearchTerm] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [editingProductId, setEditingProductId] = useState<string | number | null>(null);
    const [editProduct, setEditProduct] = useState({ name: '', price: 0, stock: 0, image: '' });
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const itemsPerPage = 10;
    // Fetch data from local db.json
    const fetchDataFromDb = async () => {
        const response = await fetch('/db.json');
        if (!response.ok) {
            throw new Error('Failed to fetch db.json');
        }
        return response.json();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDataFromDb();
                setStats(data.stats);
                setProducts(data.products);
                setClients(data.clients);
                setOrders(data.orders);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = products.filter(product =>
        (globalSearchTerm ? product.name.toLowerCase().includes(globalSearchTerm.toLowerCase()) : true) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredClients = clients.filter(client =>
        (globalSearchTerm ? (client.name.toLowerCase().includes(globalSearchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(globalSearchTerm.toLowerCase())) : true) &&
        (client.name.toLowerCase().includes(searchClients.toLowerCase()) ||
        client.email.toLowerCase().includes(searchClients.toLowerCase()))
    );

    const filteredOrders = orders.filter(order =>
        (globalSearchTerm ? (order.id.toString().includes(globalSearchTerm) ||
        order.clientId.toString().includes(globalSearchTerm) ||
        order.productId.toString().includes(globalSearchTerm)) : true) &&
        (order.id.toString().includes(searchOrders) ||
        order.clientId.toString().includes(searchOrders) ||
        order.productId.toString().includes(searchOrders))
    );

    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = async (productId: string | number) => {
        const result = await Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Annuler'
        });

        if (result.isConfirmed) {
            setProducts(products.filter(p => p.id !== productId));
            Swal.fire(
                'Supprimé!',
                'Le produit a été supprimé.',
                'success'
            );
        }
    };

    const handleAddProduct = async () => {
        if (!newProduct.name || newProduct.price <= 0 || newProduct.stock < 0) {
            Swal.fire('Erreur!', 'Veuillez remplir tous les champs correctement.', 'error');
            return;
        }
        const newId = Date.now().toString(); // Simple ID generation
        const createdProduct = { ...newProduct, id: newId };
        setProducts([...products, createdProduct]);
        setNewProduct({ name: '', price: 0, stock: 0, image: '' });
        setShowAddProductForm(false);
        Swal.fire('Succès!', 'Le produit a été ajouté.', 'success');
    };

    const handleEditProduct = async () => {
        if (!editProduct.name || editProduct.price <= 0 || editProduct.stock < 0) {
            Swal.fire('Erreur!', 'Veuillez remplir tous les champs correctement.', 'error');
            return;
        }
        setProducts(products.map(p => p.id === editingProductId ? { ...p, ...editProduct } : p));
        setEditingProductId(null);
        setEditProduct({ name: '', price: 0, stock: 0, image: '' });
        Swal.fire('Succès!', 'Le produit a été modifié.', 'success');
    };

    const startEditing = (product: Product) => {
        setEditingProductId(product.id);
        setEditProduct({ name: product.name, price: product.price, stock: product.stock, image: product.image });
    };

    const cancelEditing = () => {
        setEditingProductId(null);
        setEditProduct({ name: '', price: 0, stock: 0, image: '' });
    };



    return (
        <div className="min-h-screen bg-white p-8">
            {/* En-tête avec navigation */}
            <header className="flex justify-between items-center mb-8 bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-2xl max-w-6xl mx-auto border border-gray-200">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                    💎 Tableau de bord Administrateur
                </h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={globalSearchTerm}
                            onChange={(e) => setGlobalSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none bg-white/90 text-gray-900 placeholder-gray-400"
                        />
                    </div>
                    <button className="p-2 bg-pink-500/20 rounded-full hover:bg-pink-500/30 transition backdrop-blur-sm">
                        <Bell className="h-5 w-5 text-pink-600" />
                    </button>
                    <button
                        onClick={() => {
                            if (isLoggedIn) {
                                Swal.fire('Déconnexion', 'Vous êtes déconnecté.', 'info');
                                setIsLoggedIn(false);
                            } else {
                                Swal.fire('Connexion', 'Vous êtes connecté.', 'success');
                                setIsLoggedIn(true);
                            }
                        }}
                        className="p-2 bg-green-500/20 rounded-full hover:bg-green-500/30 transition backdrop-blur-sm text-green-700 font-semibold"
                    >
                        {isLoggedIn ? 'Déconnexion' : 'Connexion'}
                    </button>
                    <button className="p-2 bg-purple-500/20 rounded-full hover:bg-purple-500/30 transition backdrop-blur-sm">
                        <User className="h-5 w-5 text-purple-600" />
                    </button>
                </div>
            </header>



            {/* Cartes statistiques */}
            {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-6xl mx-auto">
                    <div className="bg-white text-black rounded-3xl shadow-2xl p-6 flex items-center gap-4 border border-gray-300 hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                        <div className="p-4 rounded-full bg-gray-100 backdrop-blur-sm">
                            <TrendingUp className="h-10 w-10 text-gray-800" />
                        </div>
                        <div>
                            <div className="text-sm uppercase tracking-wider text-gray-800">Total des Ventes</div>
                            <div className="text-4xl font-bold">{stats.totalSales}</div>
                            <div className="text-xs text-gray-600">En FCF</div>
                        </div>
                    </div>

                    <div className="bg-white text-black rounded-3xl shadow-2xl p-6 flex items-center gap-4 border border-gray-300 hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                        <div className="p-4 rounded-full bg-gray-100 backdrop-blur-sm">
                            <Package className="h-10 w-10 text-gray-800" />
                        </div>
                        <div>
                            <div className="text-sm uppercase tracking-wider text-gray-800">Produits Vendus</div>
                            <div className="text-4xl font-bold">{stats.totalProductsSold}</div>
                            <div className="text-xs text-gray-600">Total des produits</div>
                        </div>
                    </div>

                    <div className="bg-white text-black rounded-3xl shadow-2xl p-6 flex items-center gap-4 border border-gray-300 hover:shadow-gray-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                        <div className="p-4 rounded-full bg-gray-100 backdrop-blur-sm">
                            <Users className="h-10 w-10 text-gray-800" />
                        </div>
                        <div>
                            <div className="text-sm uppercase tracking-wider text-gray-800">Clients Uniques</div>
                            <div className="text-4xl font-bold">{stats.uniqueClients}</div>
                            <div className="text-xs text-gray-600">Nombre de clients</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex justify-center mb-8">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`px-6 py-3 rounded-l-lg font-semibold transition-all backdrop-blur-sm ${
                        activeTab === 'products'
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl border border-pink-400/50'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                    }`}
                >
                    📦 Produits
                </button>
                <button
                    onClick={() => setActiveTab('clients')}
                    className={`px-6 py-3 font-semibold transition-all backdrop-blur-sm ${
                        activeTab === 'clients'
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl border border-pink-400/50'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                    }`}
                >
                    👥 Clients
                </button>
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-6 py-3 rounded-r-lg font-semibold transition-all backdrop-blur-sm ${
                        activeTab === 'orders'
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl border border-pink-400/50'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                    }`}
                >
                    📋 Commandes
                </button>
            </div>

            {/* Products Tab */}
            {activeTab === 'products' && (
                <>
                    {/* Filtres et actions */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow max-w-6xl mx-auto border border-orange-200">
                <div className="flex gap-3 flex-wrap">
                    <button onClick={() => window.location.reload()} className="bg-brown-200 text-brown-800 px-4 py-2 rounded-lg shadow hover:bg-brown-300 transition-all">
                        🔄 Rafraîchir
                    </button>
                    <button onClick={() => setShowAddProductForm(!showAddProductForm)} className="bg-brown-200 text-brown-800 px-4 py-2 rounded-lg shadow hover:bg-brown-300 transition-all">
                        ➕ Ajouter Produit
                    </button>
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

            {/* Add Product Form */}
            {showAddProductForm && (
                <div className="mb-8 bg-white/90 backdrop-blur-lg p-6 rounded-2xl shadow-md max-w-6xl mx-auto border border-orange-200">
                    <h3 className="text-xl font-semibold mb-4 text-orange-800">Ajouter un Nouveau Produit</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Nom du produit"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="border border-orange-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none bg-white/90"
                        />
                        <input
                            type="number"
                            placeholder="Prix"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                            className="border border-orange-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none bg-white/90"
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
                            className="border border-orange-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none bg-white/90"
                        />
                        <input
                            type="text"
                            placeholder="URL de l'image (ex: /Bijoux/BOUCL D5.jpeg)"
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            className="border border-orange-300 p-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none bg-white/90"
                        />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={handleAddProduct}
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition-all"
                        >
                            Ajouter Produit
                        </button>
                        <button
                            onClick={() => setShowAddProductForm(false)}
                            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-lg shadow hover:from-gray-600 hover:to-gray-700 transition-all"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            )}

            {/* Tableau */}
            <div className="overflow-x-auto bg-white/90 rounded-2xl shadow-md backdrop-blur-sm max-w-6xl mx-auto border border-orange-200">
                <table className="w-full">
                            <thead className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800">
                                <tr>
                                    {["Image", "ID", "Nom", "Prix", "Stock", "Actions"].map((h) => (
                                        <th key={h} className="p-3 text-left font-semibold border-b border-gray-200">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={6} className="text-center p-6 text-gray-400">Chargement...</td></tr>
                                ) : pageProducts.length === 0 ? (
                                    <tr><td colSpan={6} className="text-center p-6 text-gray-400">Aucun produit trouvé.</td></tr>
                                ) : (
                                    pageProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-orange-50 transition">
                                            <td className="p-3 border-b">
                                                {editingProductId === product.id ? (
                                                    <input
                                                        type="text"
                                                        value={editProduct.image}
                                                        onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value })}
                                                        className="w-full border border-orange-300 p-1 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                                                    />
                                                ) : (
                                                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                                                )}
                                            </td>
                                            <td className="p-3 border-b">{product.id}</td>
                                            <td className="p-3 border-b">
                                                {editingProductId === product.id ? (
                                                    <input
                                                        type="text"
                                                        value={editProduct.name}
                                                        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                                        className="w-full border border-orange-300 p-1 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                                                    />
                                                ) : (
                                                    product.name
                                                )}
                                            </td>
                                            <td className="p-3 border-b">
                                                {editingProductId === product.id ? (
                                                    <input
                                                        type="number"
                                                        value={editProduct.price}
                                                        onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) || 0 })}
                                                        className="w-full border border-orange-300 p-1 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                                                    />
                                                ) : (
                                                    `${product.price} fcf`
                                                )}
                                            </td>
                                            <td className="p-3 border-b">
                                                {editingProductId === product.id ? (
                                                    <input
                                                        type="number"
                                                        value={editProduct.stock}
                                                        onChange={(e) => setEditProduct({ ...editProduct, stock: parseInt(e.target.value) || 0 })}
                                                        className="w-full border border-orange-300 p-1 rounded focus:ring-2 focus:ring-orange-400 outline-none"
                                                    />
                                                ) : (
                                                    product.stock
                                                )}
                                            </td>
                                            <td className="p-3 text-center border-b">
                                                <div className="flex justify-center gap-2">
                                                    {editingProductId === product.id ? (
                                                        <>
                                                            <button
                                                                onClick={handleEditProduct}
                                                                className="bg-green-500 text-white font-bold px-2 py-1 rounded-full hover:bg-green-600 transition-all"
                                                            >
                                                                SAUVEGARDER💾
                                                            </button>
                                                            <button
                                                                onClick={cancelEditing}
                                                                className="bg-gray-500 text-white font-bold px-2 py-1 rounded-full hover:bg-gray-600 transition-all"
                                                            >
                                                                ANNULER❌
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedProduct(product);
                                                                    setShowDetailsModal(true);
                                                                }}
                                                                className="bg-brown-500 text-black font-bold px-2 py-1 rounded-full hover:bg-brown-900 transition-all"
                                                            >
                                                                DÉTAILS👁️
                                                            </button>
                                                            <button
                                                                onClick={() => startEditing(product)}
                                                                className="bg-brown-800 text-black font-bold px-2 py-1 rounded-full hover:bg-brown-900 transition-all"
                                                            >
                                                                MODIFIER✏️
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(product.id)}
                                                                className="bg-brown-800 text-black font-bold px-2 py-1 rounded-full hover:bg-brown-900 transition-all"
                                                            >
                                                                SUPPRIMER🗑️
                                                            </button>
                                                        </>
                                                    )}
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

                </>
            )}

            {/* Product Details Modal */}
            {showDetailsModal && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-black">Détails du Produit</h2>
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                <img
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-black">ID</label>
                                <p className="text-lg font-bold text-black">{selectedProduct.id}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-black">Nom</label>
                                <p className="text-lg font-bold text-black">{selectedProduct.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-black">Prix</label>
                                <p className="text-lg font-bold text-black">{selectedProduct.price} fcf</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-black">Stock</label>
                                <p className="text-lg font-bold text-black">{selectedProduct.stock}</p>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => setShowDetailsModal(false)}
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Clients Tab */}
            {activeTab === 'clients' && (
                <>
                    {/* Filtres et actions */}
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow max-w-6xl mx-auto border border-orange-200">
                        <div className="flex gap-3 flex-wrap">
                            <button onClick={() => window.location.reload()} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
                                🔄 Rafraîchir
                            </button>
                        </div>
                        <div className="flex gap-3 flex-wrap items-center">
                            <input
                                value={searchClients}
                                onChange={(e) => setSearchClients(e.target.value)}
                                placeholder="Rechercher clients..."
                                className="border border-orange-300 p-2 rounded-lg w-60 focus:ring-2 focus:ring-orange-400 outline-none bg-white/90"
                            />
                        </div>
                    </div>

                    {/* Liste des clients */}
                    <div className="overflow-x-auto bg-white/90 rounded-2xl shadow-md backdrop-blur-sm max-w-6xl mx-auto border border-orange-200">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800">
                                <tr>
                                    {["ID", "Nom", "Email", "Téléphone"].map((h) => (
                                        <th key={h} className="p-3 text-left font-semibold border-b border-gray-200">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={4} className="text-center p-6 text-gray-400">Chargement...</td></tr>
                                ) : filteredClients.length === 0 ? (
                                    <tr><td colSpan={4} className="text-center p-6 text-gray-400">Aucun client trouvé.</td></tr>
                                ) : (
                                    filteredClients.map((client) => (
                                        <tr key={client.id} className="hover:bg-orange-50 transition">
                                            <td className="p-3 border-b">{client.id}</td>
                                            <td className="p-3 border-b">{client.name}</td>
                                            <td className="p-3 border-b">{client.email}</td>
                                            <td className="p-3 border-b">{client.phone}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
                <>
                    {/* Filtres et actions */}
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-8 bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow max-w-6xl mx-auto border border-orange-200">
                        <div className="flex gap-3 flex-wrap">
                            <button onClick={() => window.location.reload()} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow hover:from-orange-600 hover:to-orange-700 transition-all">
                                🔄 Rafraîchir
                            </button>
                        </div>
                        <div className="flex gap-3 flex-wrap items-center">
                            <input
                                value={searchOrders}
                                onChange={(e) => setSearchOrders(e.target.value)}
                                placeholder="Rechercher commandes..."
                                className="border border-orange-300 p-2 rounded-lg w-60 focus:ring-2 focus:ring-orange-400 outline-none bg-white/90"
                            />
                        </div>
                    </div>

                    {/* Liste des commandes */}
                    <div className="overflow-x-auto bg-white/90 rounded-2xl shadow-md backdrop-blur-sm max-w-6xl mx-auto border border-orange-200">
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
                                ) : filteredOrders.length === 0 ? (
                                    <tr><td colSpan={5} className="text-center p-6 text-gray-400">Aucune commande trouvée.</td></tr>
                                ) : (
                                    filteredOrders.map((order) => (
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
                </>
            )}
        </div>
    );
}
