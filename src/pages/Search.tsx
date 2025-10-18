import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Produit from "../components/Produit";
import type { Product } from "../data/products";

export default function Search() {
  const location = useLocation();
  const { query, results }: { query: string; results: Product[] } =
    location.state || { query: "", results: [] };

  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-[#8B5E3C] mb-6">
          Résultats de recherche pour "{query}"
        </h2>

        {results.length === 0 ? (
          <p className="text-gray-600">Aucun produit trouvé pour "{query}".</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {results.map((product: Product) => (
              <Produit
                key={product.id}
                id={product.id}
                img={product.img}
                titre={product.titre}
                prix={product.prix}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
