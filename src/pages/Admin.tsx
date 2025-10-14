import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users, ShoppingCart, Package, DollarSign } from 'lucide-react';
import { products, type Product } from '../data/products';

interface OrderItem {
  name: string;
  quantity: number;
}

interface DeliveryInfo {
  firstName: string;
  lastName: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: string;
  deliveryInfo: DeliveryInfo;
  paymentMethod: string;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminProducts, setAdminProducts] = useState(products);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Mock data for demo
  const mockOrders: Order[] = [
    {
      id: 'LS12345',
      date: '15/01/2025',
      items: [{ name: 'Robe élégante', quantity: 1 }],
      total: 45000,
      status: 'En cours',
      deliveryInfo: { firstName: 'Fatou', lastName: 'Diop' },
      paymentMethod: 'Orange Money'
    },
    {
      id: 'LS12346',
      date: '14/01/2025',
      items: [{ name: 'Sac en cuir', quantity: 2 }],
      total: 300000,
      status: 'Livrée',
      deliveryInfo: { firstName: 'Amina', lastName: 'Sow' },
      paymentMethod: 'Wave'
    }
  ];

  const stats = {
    totalProducts: adminProducts.length,
    totalOrders: mockOrders.length,
    totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: mockOrders.filter(order => order.status === 'En cours').length
  };

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: Math.max(...adminProducts.map(p => p.id)) + 1
    };
    setAdminProducts([...adminProducts, product]);
    setShowAddProduct(false);
  };

  const updateProduct = (updatedProduct: Product) => {
    setAdminProducts(adminProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    setEditingProduct(null);
  };

  const deleteProduct = (productId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setAdminProducts(adminProducts.filter(p => p.id !== productId));
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would update the backend
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-amber-900">Administration Lala'store</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Tableau de bord
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'products' ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Produits
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'orders' ? 'bg-amber-700 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Commandes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Package className="text-amber-700 w-8 h-8" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Produits</p>
                    <p className="text-2xl font-bold">{stats.totalProducts}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <ShoppingCart className="text-blue-700 w-8 h-8" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Total Commandes</p>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <DollarSign className="text-green-700 w-8 h-8" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Revenus Totaux</p>
                    <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} FCF</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <Users className="text-purple-700 w-8 h-8" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Commandes en cours</p>
                    <p className="text-2xl font-bold">{stats.pendingOrders}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Commandes récentes</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">ID Commande</th>
                      <th className="text-left py-2">Client</th>
                      <th className="text-left py-2">Total</th>
                      <th className="text-left py-2">Statut</th>
                      <th className="text-left py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-2">{order.id}</td>
                        <td className="py-2">{order.deliveryInfo.firstName} {order.deliveryInfo.lastName}</td>
                        <td className="py-2">{order.total.toLocaleString()} FCF</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'Livrée' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-2">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Gestion des Produits</h2>
              <button
                onClick={() => setShowAddProduct(true)}
                className="bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un produit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-amber-800 font-bold mb-2">{product.price.toLocaleString()} FCF</p>
                    <p className="text-sm text-gray-600 mb-4">{product.category}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Modifier
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Gestion des Commandes</h2>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Commande</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paiement</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.deliveryInfo.firstName} {order.deliveryInfo.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total.toLocaleString()} FCF</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.paymentMethod}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className="text-sm border rounded px-2 py-1"
                          >
                            <option value="En cours">En cours</option>
                            <option value="En préparation">En préparation</option>
                            <option value="Expédiée">Expédiée</option>
                            <option value="En livraison">En livraison</option>
                            <option value="Livrée">Livrée</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-amber-600 hover:text-amber-900">Voir détails</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        {showAddProduct && (
          <ProductForm
            onSubmit={addProduct}
            onCancel={() => setShowAddProduct(false)}
            title="Ajouter un produit"
          />
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <ProductForm
            product={editingProduct}
            onSubmit={updateProduct}
            onCancel={() => setEditingProduct(null)}
            title="Modifier le produit"
          />
        )}
      </div>
    </div>
  );
}

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
  title: string;
}

function ProductForm({ product, onSubmit, onCancel, title }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    image: product?.image || '',
    category: product?.category || 'Vêtements'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      onSubmit({ ...product, ...formData });
    } else {
      onSubmit(formData as Product);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nom du produit</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Prix (FCF)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">URL de l'image</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Catégorie</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700"
            >
              <option value="Vêtements">Vêtements</option>
              <option value="Chaussures">Chaussures</option>
              <option value="Accessoires">Accessoires</option>
              <option value="Voiles">Voiles</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800"
            >
              {product ? 'Modifier' : 'Ajouter'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border-2 border-gray-300 py-2 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
