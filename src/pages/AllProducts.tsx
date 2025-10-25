import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { products } from "../data/products";

// Définition du type d'un produit
type Product = {
  id: string | number;
  titre: string;
  prix: string | number;
  img: string;
  category: string;
};

// ✅ Fonction composant
export default function AllProducts() {
  // ✅ On groupe les produits par catégorie avec typage explicite
  const groupedProducts = products.reduce<Record<string, Product[]>>(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Tous les Produits
        </h1>

        {/* Boucle sur chaque catégorie */}
        {Object.entries(groupedProducts).map(([category, prods]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 capitalize text-amber-700">
              {category}
            </h2>

            {/*  Grille de produits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {prods.map((product) => (
                <div
                  key={product.id}
                  className="border rounded-2xl p-4 shadow hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <img
                    src={`/${product.img}`}
                    alt={product.titre}
                    className="w-full h-56 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-lg font-semibold">{product.titre}</h3>
                  <p className="text-gray-700 mb-2">{product.prix} FCFA</p>
                  <Link
                    to={`/produit/${product.id}`}
                    state={product}
                    className="inline-block bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
                  >
                    Voir Détails
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
