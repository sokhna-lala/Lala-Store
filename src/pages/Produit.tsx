import { useLocation, useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function ProduitPage() {
  const { id: paramId } = useParams();
  const { state } = useLocation();

  // state expected: { id, titre, prix, img, description, sizes, colors }
  type ProductState = {
    id?: string | number;
    titre?: string;
    prix?: string | number;
    img?: string;
    description?: string;
    sizes?: string[];
    colors?: string[];
  };
  const product: ProductState = (state as ProductState) || {
    id: paramId,
    titre: `Produit ${paramId}`,
    description: "Description du produit — à compléter.",
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">{product.titre}</h1>
        {product.img ? (
          <img
            src={product.img}
            alt={product.titre}
            className="w-full max-w-md object-cover rounded"
          />
        ) : (
          <div className="w-full max-w-md h-48 bg-gray-100 rounded flex items-center justify-center">
            Image
          </div>
        )}

        <div className="mt-4 text-lg">Prix: {product.prix ?? "—"}</div>
        <p className="mt-4 text-gray-600">{product.description}</p>

        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Tailles disponibles :</h3>
            <div className="flex gap-2 mt-2">
              {product.sizes.map((size) => (
                <span key={size} className="px-3 py-1 border rounded">
                  {size}
                </span>
              ))}
            </div>
          </div>
        )}

        {product.colors && product.colors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Couleurs disponibles :</h3>
            <div className="flex gap-2 mt-2">
              {product.colors.map((color) => (
                <span key={color} className="px-3 py-1 border rounded">
                  {color}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
