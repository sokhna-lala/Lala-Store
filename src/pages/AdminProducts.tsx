import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { type Product, products, saveProducts } from "../data/products";

const ITEMS_PER_PAGE = 10;

export default function AdminProducts() {
  const { user } = useAuth();
  const [productList, setProductList] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({});
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/products`);
      const data = await response.json();
      setProductList(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback to local products if API fails
      setProductList(products);
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

  const handleAdd = () => {
    setEditing(null);
    setForm({});
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditing(product);
    setForm({ ...product });
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
        await fetch(`${apiUrl}/products/${id}`, {
          method: "DELETE",
        });
        setProductList(productList.filter((p) => p.id !== id));
        // Also update local storage
        const updatedProducts = products.filter((p) => p.id !== id);
        saveProducts(updatedProducts);
        Swal.fire("Supprimé !", "Le produit a été supprimé.", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Erreur lors de la suppression du produit",
        });
      }
    }
  };

  const handleSave = async () => {
    if (!form.titre || !form.prix || !form.category) {
      Swal.fire({
        icon: "warning",
        title: "Champs obligatoires",
        text: "Veuillez remplir tous les champs obligatoires.",
      });
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
      if (editing) {
        // Update existing product
        await fetch(`${apiUrl}/products/${editing.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });
        setProductList(
          productList.map((p) =>
            p.id === editing.id ? ({ ...form } as Product) : p
          )
        );
        // Also update local storage
        const updatedProducts = products.map((p) =>
          p.id === editing.id ? ({ ...form } as Product) : p
        );
        saveProducts(updatedProducts);
      } else {
        // Add new product
        const newProduct = { ...form, id: Date.now().toString() };
        await fetch(`${apiUrl}/products`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });
        setProductList([...productList, newProduct as Product]);
        // Also add to local storage
        const updatedProducts = [...products, newProduct as Product];
        saveProducts(updatedProducts);
      }
      setEditing(null);
      setForm({});
      setShowForm(false);
    } catch (error) {
      console.error("Error saving product:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la sauvegarde du produit",
      });
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({});
    setShowForm(false);
  };

  // Filtrage et recherche
  const filteredProducts = productList.filter((product) => {
    const matchesSearch = product.titre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Obtenir les catégories uniques
  const categories = Array.from(new Set(productList.map((p) => p.category)));

  return (
    <Layout header={true} navbar={false}>
      <div className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gérer les Produits</h1>
          <Link
            to="/admin"
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Retour au Dashboard
          </Link>
        </div>

        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          Ajouter un Produit
        </button>

        {/* Filtres et recherche */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher par titre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded"
            aria-label="Filtrer par catégorie"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {(editing || showForm) && (
          <div className="bg-gray-100 p-4 rounded mb-4">
            <h2 className="text-xl font-semibold mb-2">
              {editing ? "Modifier" : "Ajouter"} Produit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Titre"
                value={form.titre || ""}
                onChange={(e) => setForm({ ...form, titre: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Prix (e.g., 25 000 FCFA)"
                value={form.prix || ""}
                onChange={(e) => setForm({ ...form, prix: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Catégorie"
                value={form.category || ""}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={form.img || ""}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
                className="border p-2 rounded"
              />
              <textarea
                placeholder="Description"
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="border p-2 rounded col-span-2"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded mr-2"
              >
                Sauvegarder
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Tableau des produits */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={`/${product.img}`}
                      alt={product.titre}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.titre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.prix}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
