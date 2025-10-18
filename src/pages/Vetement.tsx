// src/pages/Vetements.jsx
import Layout from "../components/Layout";
import Produit from "../components/Produit";

export default function Vetements() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Section produits avec titre élégant */}
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
                <span className="text-sm font-bold text-amber-700 uppercase tracking-widest">
                  Notre Sélection
                </span>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 bg-gradient-to-r from-[#8B5E3C] via-amber-700 to-orange-600 bg-clip-text text-transparent">
              Découvrez nos Créations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              12 pièces soigneusement sélectionnées pour sublimer votre
              garde-robe
            </p>
          </div>

          {/* Grille de produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <Produit
              img="Robe/5.jpeg"
              titre="Robe élégante"
              prix="25 000 FCFA"
            />
            <Produit img="Robe/bourka.jpeg" titre="Bourka" prix="15 000 FCFA" />
            <Produit
              img="Robe/robe 6.jpeg"
              titre="Robe Laila"
              prix="18 000 FCFA"
            />
            <Produit
              img="Robe/robe2.jpeg"
              titre="Abaya Nour"
              prix="35 000 FCFA"
            />
            <Produit
              img="Robe/robe 8.jpg"
              titre="Jupe d'été"
              prix="35 000 FCFA"
            />
            <Produit
              img="Robe/robe 9.jpg"
              titre="Ensemble Salope"
              prix="35 000 FCFA"
            />
            <Produit
              img="Robe/robe2.jpeg"
              titre="Ensemble Sarah"
              prix="35 000 FCFA"
            />
            <Produit
              img="Robe/robe 10.jpg"
              titre="Ensemble Jupe plissée + Chemise"
              prix="35 000 FCFA"
            />
            <Produit
              img="Robe/robe 15.jpg"
              titre="Ensemble Pantalon Cumeno"
              prix="35 000 FCFA"
            />
            <Produit
              img="Robe/robe 16.jpg"
              titre="Ensemble Jupe Cumeno Marron"
              prix="15 000 FCFA"
            />
            <Produit
              img="Robe/robe 17.jpg"
              titre="Robe Large Jaune Moutarde"
              prix="15 000 FCFA"
            />
            <Produit
              img="Robe/robe 18.jpg"
              titre="Charry Vert"
              prix="15 000 FCFA"
            />
          </div>
        </div>

        {/* Section avantages premium */}
        <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-72 h-72 bg-amber-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-8">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-3">
                Pourquoi nous choisir ?
              </h3>
              <p className="text-gray-600">
                Des avantages qui font la différence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-amber-200">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  <span className="text-4xl">✨</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Qualité Premium
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  Tissus nobles et finitions impeccables pour chaque pièce
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-amber-200">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  <span className="text-4xl">🚚</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Livraison Express
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  Chez vous en 48h maximum, partout à Dakar
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-amber-200">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  <span className="text-4xl">💎</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Pièces Exclusives
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  Collections limitées et designs uniques
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-amber-200">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  <span className="text-4xl">🎁</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Emballage Soigné
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  Packaging élégant offert avec chaque commande
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
