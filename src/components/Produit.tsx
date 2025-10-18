import { Link } from "react-router-dom";

type ProduitProps = {
  id?: string | number;
  img?: string;
  description?: string;
  titre: string;
  prix?: string | number;
  to?: string; // url to details
  sizes?: string[];
  colors?: string[];
  onAdd?: (product: {
    id?: string | number;
    titre: string;
    prix?: string | number;
  }) => void;
};

export default function Produit({
  img,
  description,
  titre,
  prix,
  to,
  onAdd,
  id,
  sizes,
  colors,
}: ProduitProps) {
  type CartEntry = {
    id?: string | number;
    titre?: string;
    prix?: string | number;
    qty?: number;
    img?: string;
  };
  // normalize image path: if a relative path is provided (e.g. "Robe/1.jpg")
  // prefix with '/' so it resolves from the public folder: '/Robe/1.jpg'
  const imgSrc = img
    ? img.startsWith("/") || img.startsWith("http")
      ? img
      : `/${img}`
    : undefined;
  function handleAdd() {
    if (onAdd) {
      onAdd({ id, titre, prix });
      // notify other parts of the app (header badge) that the cart changed
      try {
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      } catch {
        // ignore
      }
      return;
    }
    // default: store in localStorage under key 'cart' as an array
    try {
      const raw = localStorage.getItem("cart");
      const cart: Array<CartEntry> = raw ? JSON.parse(raw) : [];
      // if already in cart, increment qty
      const idx = cart.findIndex(
        (p: CartEntry) => String(p.id) === String(id) && p.titre === titre
      );
      if (idx >= 0) {
        cart[idx].qty = (cart[idx].qty || 1) + 1;
      } else {
        cart.push({ id, titre, prix, qty: 1, img: imgSrc });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      // dispatch without try/catch; browsers support CustomEvent in modern apps
      window.dispatchEvent(new CustomEvent("cartUpdated"));
      // small visual feedback could be added later
    } catch {
      // ignore localStorage errors
    }
  }

  return (
    <div className="border rounded-md p-3 bg-white flex flex-col">
      {imgSrc ? (
        <img
          src={imgSrc}
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
        {prix
          ? typeof prix === "number"
            ? `${prix} €`
            : String(prix)
          : "Voir le produit"}
      </div>

      <div className="mt-auto flex gap-2">
        <button
          onClick={handleAdd}
          className="flex-1 bg-[#8B5E3C] text-white text-sm px-3 py-2 rounded hover:bg-[#7a5135]"
          aria-label={`Ajouter ${titre} au panier`}
        >
          Ajouter au panier
        </button>

        {/* Always use Link to keep SPA routing; pass product data in state for the details page */}
        <Link
          to={to ?? `/produit/${id ?? encodeURIComponent(titre)}`}
          state={{ id, titre, prix, img: imgSrc, description, sizes, colors }}
          className="flex-1 text-center border border-gray-200 text-sm px-3 py-2 rounded hover:bg-gray-50"
        >
          Voir détails
        </Link>
      </div>
    </div>
  );
}
