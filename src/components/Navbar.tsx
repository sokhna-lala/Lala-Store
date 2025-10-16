import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <nav className="flex flex-wrap justify-between items-center">
          <div className="flex flex-wrap gap-8">
            <Link
              to="/"
              className="text-base text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Accueil
            </Link>
            <Link
              to="/vetements"
              className="text-base text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Vêtements
            </Link>
            <Link
              to="/chaussures"
              className="text-base text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Chaussures
            </Link>
            <Link
              to="/accessoires"
              className="text-base text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Accessoires
            </Link>
            <Link
              to="/voiles"
              className="text-base text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Voiles
            </Link>
            <Link
              to="/promotions"
              className="text-base text-gray-700 hover:text-orange-600 font-medium transition-colors"
            >
              Promotions
            </Link>
          </div>
          <Link
            to="/cart"
            className="text-base text-gray-700 hover:text-orange-600 font-medium transition-colors flex items-center gap-2"
          >
            🛒 Panier ({cart.length})
          </Link>
        </nav>
      </div>
    </div>
  );
}
