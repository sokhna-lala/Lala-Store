import type { ReactNode } from "react";

import Footer from "./Footer";

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
  return (
    <>
      {header && (
        <header className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="LalaStore" className="w-8 h-8" />
              <span className="font-semibold text-[#8B5E3C]">LalaStore</span>
            </div>
            <div className="hidden md:block text-sm text-gray-600">
              Livraison gratuite à partir de 200€
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-600 hover:text-gray-800">
                Connexion
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                Panier
              </button>
            </div>
          </div>
        </header>
      )}

      {navbar && (
        <nav className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-2 flex gap-4">
            <a
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Accueil
            </a>
            <a
              href="/vetements"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Vêtements
            </a>
            <a
              href="/chaussures"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Chaussures
            </a>
            <a
              href="/accessoires"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Accessoires
            </a>
            <a
              href="/voiles"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Voiles
            </a>
            <a
              href="/promotions"
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              Promotions
            </a>
          </div>
        </nav>
      )}

      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>

      {footer && <Footer />}
    </>
  );
}
