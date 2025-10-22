import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { type Product, products, saveProducts } from "../data/products";

export default function AdminProducts() {
  const { user } = useAuth();
  const [productList, setProductList] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>({});
  const [showForm, setShowForm] = useState(false);
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
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
        await fetch(`${apiUrl}/products/${id}`, {
          method: "DELETE",
        });
        setProductList(productList.filter((p) => p.id !== id));
        // Also update local storage
        const updatedProducts = products.filter((p) => p.id !== id);
        saveProducts(updatedProducts);
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Erreur lors de la suppression du produit");
      }
    }
  };

  const handleSave = async () => {
    if (!form.titre || !form.prix || !form.category) {
      alert("Veuillez remplir tous les champs obligatoires.");
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
      alert("Erreur lors de la sauvegarde du produit");
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({});
    setShowForm(false);
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productList.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow">
              <img
                src={`/${product.img}`}
                alt={product.titre}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="font-semibold">{product.titre}</h3>
              <p className="text-gray-600">{product.prix}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
              <div className="mt-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
