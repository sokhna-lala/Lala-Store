import type { ReactNode } from "react";

import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { products } from "../data/products";
import Swal from "sweetalert2";

type LayoutProps = {
  children?: ReactNode;
  header?: boolean;
  navbar?: boolean;
  footer?: boolean;
};

export default function Layout({
  children,
  header = true,
  navbar = true,
  footer = true,
}: LayoutProps) {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    function readCount() {
      try {
        const raw = localStorage.getItem("cart");
        type CartEntry = { qty?: number };
        const cart: Array<CartEntry> = raw ? JSON.parse(raw) : [];
        const total = cart.reduce((s, p) => s + (p.qty || 0), 0);
        setCount(total);
      } catch {
        setCount(0);
      }
    }

    readCount();
    const handler = () => readCount();
    window.addEventListener("cartUpdated", handler as EventListener);
    return () =>
      window.removeEventListener("cartUpdated", handler as EventListener);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const filteredProducts = products.filter(
        (product) =>
          product.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      // Navigate to search results page with filtered products
      navigate("/search", {
        state: { query: searchQuery, results: filteredProducts },
      });
    }
  };
  return (
    <>
      {header && (
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            {user?.role !== "admin" && (
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="LalaStore" className="w-8 h-8" />
                <span className="font-semibold text-[#8B5E3C]">LalaStore</span>
              </div>
            )}
            {user?.role === "admin" && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-red-600">
                  Administration LalaStore
                </span>
              </div>
            )}

            <AuthButtons count={count} />
          </div>
        </header>
      )}

      {navbar && user?.role !== "admin" && (
        <nav className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex gap-4">
              <Link
                to="/"
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Accueil
              </Link>
              <Link
                to="/vetements"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Vêtements
              </Link>
              <Link
                to="/chaussures"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Chaussures
              </Link>
              <Link
                to="/accessoires"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Accessoires
              </Link>
              <Link
                to="/voiles"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Voiles
              </Link>
              <Link
                to="/promotions"
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Promotions
              </Link>
            </div>
            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un article..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </form>
          </div>
        </nav>
      )}

      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>

      {footer && <Footer />}
    </>
  );
}

function AuthButtons({ count }: { count: number }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    Swal.fire({
      icon: "success",
      title: "Déconnexion réussie",
      text: "Vous vous êtes déconnecté avec succès.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <span className="text-sm text-gray-700">Bonjour, {user.name}</span>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-800"
          >
            Déconnexion
          </button>
          {user.role === "admin" && (
            <Link
              to="/admin"
              className="text-sm text-red-600 hover:text-red-800 font-semibold"
            >
              Admin
            </Link>
          )}
        </>
      ) : (
        <>
          <Link to="/login" className="text-gray-600 hover:text-gray-800">
            Connexion
          </Link>
          <Link to="/signup" className="text-gray-600 hover:text-gray-800">
            Créer un compte
          </Link>
        </>
      )}

      {user?.role !== "admin" && (
        <>
          <Link
            to="/mes-commandes"
            className="text-gray-600 hover:text-gray-800"
          >
            Mes Commandes
          </Link>
          <Link to="/panier" className="relative">
            <button className="text-gray-600 hover:text-gray-800">
              Panier
            </button>
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Link>
        </>
      )}
    </div>
  );
}
