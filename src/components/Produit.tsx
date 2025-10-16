import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

type ProduitProps = {
  id?: string | number;
  img?: string;
  titre: string;
  prix?: string | number;
  to?: string; // url to details
  onAdd?: (product: {
    id?: string | number;
    titre: string;
    prix?: string | number;
  }) => void;
};

export default function Produit({
  img,
  titre,
  prix,
  to,
  onAdd,
  id,
}: ProduitProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  function handleAdd() {
    if (onAdd) {
      onAdd({ id, titre, prix });
      return;
    }

    // Use Zustand store
    addToCart({
      id: id as number,
      img: img || "",
      titre,
      prix: prix as string,
    });
  }

  return (
    <div className="border rounded-md p-3 bg-white flex flex-col">
      {img ? (
        <img
          src={img}
          alt={titre}
          className="w-full h-48 object-cover mb-2 rounded-md"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 mb-2 rounded-md flex items-center justify-center text-gray-400">
          Image
        </div>
      )}

      <h3 className="text-sm font-medium mb-1">{titre}</h3>
      <div className="text-sm text-gray-600 mb-3">
        {prix ? `${prix} €` : "Voir le produit"}
      </div>

      <div className="mt-auto flex gap-2">
        <button
          onClick={handleAdd}
          className="flex-1 bg-[#8B5E3C] text-white text-sm px-3 py-2 rounded hover:bg-[#7a5135]"
          aria-label={`Ajouter ${titre} au panier`}
        >
          Ajouter au panier
        </button>

        {to ? (
          <Link
            to={to}
            className="flex-1 text-center border border-gray-200 text-sm px-3 py-2 rounded hover:bg-gray-50"
          >
            Voir détails
          </Link>
        ) : (
          <button
            onClick={() =>
              window.location.assign(
                `/produit/${id ?? encodeURIComponent(titre)}`
              )
            }
            className="flex-1 text-sm border border-gray-200 px-3 py-2 rounded hover:bg-gray-50"
            aria-label={`Voir détails de ${titre}`}
          >
            Voir détails
          </button>
        )}
      </div>
    </div>
  );
}
