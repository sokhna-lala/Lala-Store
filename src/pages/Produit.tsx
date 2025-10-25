import { useLocation, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import { ShoppingCart, Heart } from "lucide-react";

type ProductState = {
  id?: string | number;
  titre?: string;
  prix?: string | number;
  img?: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  category?: string;
};

export default function ProduitPage() {
  const { id: paramId } = useParams();
  const { state } = useLocation();

  const product: ProductState = (state as ProductState) || {
    id: paramId,
    titre: `Produit ${paramId}`,
    description: "Description du produit — à compléter.",
  };

  // Fonction pour ajouter au panier
  function handleAddToCart() {
    try {
      const raw = localStorage.getItem("cart");
      const cart: Array<{
        id?: string | number;
        titre?: string;
        prix?: string | number;
        qty?: number;
        img?: string;
      }> = raw ? JSON.parse(raw) : [];

      // Vérifier si le produit est déjà dans le panier
      const existingIndex = cart.findIndex(
        (item) =>
          String(item.id) === String(product.id) && item.titre === product.titre
      );

      if (existingIndex >= 0) {
        // Incrémenter la quantité
        cart[existingIndex].qty = (cart[existingIndex].qty || 1) + 1;
      } else {
        // Ajouter un nouvel élément
        cart.push({
          id: product.id,
          titre: product.titre,
          prix: product.prix,
          qty: 1,
          img: product.img,
        });
      }

      // Sauvegarder dans localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Dispatcher l'événement pour mettre à jour le badge du panier
      window.dispatchEvent(new CustomEvent("cartUpdated"));

      // Feedback utilisateur
      Swal.fire({
        icon: "success",
        title: "Ajouté au panier !",
        text: `${product.titre} a été ajouté à votre panier.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Impossible d'ajouter le produit au panier. Veuillez réessayer.",
      });
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Image Section */}
              <div className="relative group">
                {product.img ? (
                  <img
                    src={product.img}
                    alt={product.titre}
                    className="w-full h-96 object-cover rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-inner">
                    <span className="text-gray-400 text-lg font-medium">
                      Image du produit
                    </span>
                  </div>
                )}
                <button
                  className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-red-50 transition-colors duration-200"
                  aria-label="Ajouter aux favoris"
                  title="Ajouter aux favoris"
                >
                  <Heart className="w-6 h-6 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              {/* Product Info Section */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    {product.category && (
                      <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-3">
                        {product.category}
                      </span>
                    )}
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      {product.titre}
                    </h1>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-blue-600">
                        {product.prix ?? "—"}
                      </span>
                      {product.prix && (
                        <span className="text-gray-500">FCFA</span>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Sizes */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Tailles disponibles
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            className="px-5 py-2.5 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Colors */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                        Couleurs disponibles
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            className="px-5 py-2.5 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium capitalize"
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <div className="pt-6">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-[#8B5E3C] to-amber-600 hover:from-[#7a5135] hover:to-amber-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    aria-label={`Ajouter ${product.titre} au panier`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Ajouter au panier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
