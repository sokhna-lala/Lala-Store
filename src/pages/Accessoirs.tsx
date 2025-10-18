// src/pages/Accessoires.jsx
import Layout from "../components/Layout";
import Produit from "../components/Produit";
import { products } from "../data/products";

export default function Accessoires() {
  const accessoires = products.filter((p) => p.category === "accessoires");

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Section produits avec titre élégant */}
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-purple-600"></div>
                <span className="text-sm font-bold text-purple-700 uppercase tracking-widest">
                  Notre Sélection
                </span>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-purple-600"></div>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 bg-gradient-to-r from-[#8B5E3C] via-purple-700 to-fuchsia-600 bg-clip-text text-transparent">
              Accessoires Tendance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {accessoires.length} pièces soigneusement sélectionnées pour
              compléter votre style
            </p>
          </div>

          {/* Grille de produits */}
          {accessoires.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {accessoires.map((p) => (
                <Produit
                  key={p.id}
                  id={p.id}
                  img={p.img}
                  titre={p.titre}
                  prix={p.prix}
                  description={p.description}
                  sizes={p.sizes}
                  colors={p.colors}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">🎁</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Nouveaux accessoires bientôt disponibles
              </h3>
              <p className="text-gray-600 mb-6">
                Nous préparons de magnifiques pièces pour vous. Revenez très
                bientôt !
              </p>
              <button className="bg-gradient-to-r from-[#8B5E3C] to-purple-700 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Me Prévenir
              </button>
            </div>
          )}
        </div>

        {/* Section avantages premium */}
        <div className="relative bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-600 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-8">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-3">
                Pourquoi choisir nos accessoires ?
              </h3>
              <p className="text-gray-600">
                Des avantages qui font toute la différence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-purple-200">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  <span className="text-4xl">✨</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Design Unique
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  Des pièces exclusives pour un style incomparable
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-purple-200">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  <span className="text-4xl">🚚</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Livraison Soignée
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  Emballage élégant et livraison rapide
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-purple-200">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  <span className="text-4xl">💎</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Qualité Premium
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  Matériaux nobles et finitions impeccables
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-purple-200">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  <span className="text-4xl">🎁</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Idée Cadeau
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  Le cadeau parfait pour faire plaisir
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
