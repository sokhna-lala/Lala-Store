// src/pages/Chaussures.jsx
import Layout from "../components/Layout";
import Produit from "../components/Produit";

export default function Chaussures() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Section produits avec titre élégant */}
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-rose-600"></div>
                <span className="text-sm font-bold text-rose-700 uppercase tracking-widest">
                  Notre Sélection
                </span>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-rose-600"></div>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 bg-gradient-to-r from-[#8B5E3C] via-rose-700 to-pink-600 bg-clip-text text-transparent">
              Nos Modèles Tendance
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              12 paires soigneusement sélectionnées pour vous faire briller
            </p>
          </div>

          {/* Grille de produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <Produit
              img="Chaussure/Chaussure 1.jpg"
              titre="Talons Argentin"
              prix="25 000 FCFA"
              description="Talons hauts argentins élégants avec plateforme confortable. Design sophistiqué parfait pour les occasions spéciales et les sorties nocturnes."
            />
            <Produit
              img="Chaussure/Chaussure 2.jpg"
              titre="Talons Orange"
              prix="20 000 FCFA"
              description="Talons orange vibrants avec talon fin et plateforme. Style audacieux et moderne pour apporter une touche de couleur à vos tenues."
            />
            <Produit
              img="Chaussure/Chaussure 3.jpg"
              titre="Sac et Talons Assortis"
              prix="35 000 FCFA"
              description="Ensemble coordonné composé de talons élégants et d'un sac assorti. Look complet et harmonieux pour un style raffiné."
            />
            <Produit
              img="Chaussure/Chaussure 4.jpg"
              titre="Talons Perles + Sacoche"
              prix="20 000 FCFA"
              description="Talons décorés de perles délicates accompagnés d'une petite sacoche. Ensemble féminin et élégant pour les occasions spéciales."
            />
            <Produit
              img="Chaussure/Chaussure 5.jpg"
              titre="Bleu Perlé Assorti"
              prix="35 000 FCFA"
              description="Ensemble bleu perlé coordonné avec talons et accessoires. Style romantique et sophistiqué pour un look complet."
            />
            <Produit
              img="Chaussure/Chaussure 6.jpg"
              titre="Ensemble Élégant"
              prix="35 000 FCFA"
              description="Ensemble élégant composé de talons classiques et d'accessoires assortis. Parfait pour un style professionnel ou des sorties."
            />
            <Produit
              img="Chaussure/Chaussure 7.jpg"
              titre="Ensemble Sarah"
              prix="35 000 FCFA"
              description="Ensemble Sarah complet avec talons et sac coordonné. Design moderne et polyvalent pour toutes les occasions."
            />
            <Produit
              img="Chaussure/Chaussure 8.jpg"
              titre="Nu-pieds Marron"
              prix="12 000 FCFA"
              description="Nu-pieds marron confortables en cuir véritable. Style classique et intemporel, parfait pour un usage quotidien élégant."
            />
            <Produit
              img="Chaussure/Chaussure 9.jpg"
              titre="Sandales d'Été"
              prix="12 000 FCFA"
              description="Sandales d'été légères et confortables. Design estival parfait pour les journées chaudes avec un style décontracté chic."
            />
            <Produit
              img="Chaussure/Chaussure 10.jpg"
              titre="Sandales Zara"
              prix="10 000 FCFA"
              description="Sandales inspirées de Zara avec design moderne. Confortables et tendance pour un look urbain et contemporain."
            />
            <Produit
              img="Chaussure/Chaussure 11.jpg"
              titre="Baskets Blanches"
              prix="15 000 FCFA"
              description="Baskets blanches classiques en cuir. Style intemporel et polyvalent, parfait pour un look casual chic au quotidien."
            />
            <Produit
              img="Chaussure/Chaussure 12.jpg"
              titre="Jordan"
              prix="10 000 FCFA"
              description="Baskets Jordan inspirées avec design sportif. Confort et style pour les amateurs de sneakers tendance."
            />
          </div>
        </div>

        {/* Section avantages premium */}
        <div className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-72 h-72 bg-pink-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-600 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-8">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-3">
                L'expérience qui fait la différence
              </h3>
              <p className="text-gray-600">Des avantages exclusifs pour vous</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-pink-200">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  <span className="text-4xl">👟</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Confort Absolu
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  Matériaux de qualité pour un confort toute la journée
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-pink-200">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  <span className="text-4xl">🚚</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Livraison Express
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  Chez vous en 48h à Dakar et environs
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-pink-200">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  <span className="text-4xl">💎</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Modèles Uniques
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  Collections exclusives et limitées
                </p>
              </div>

              <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 hover:border-pink-200">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-6">
                  <span className="text-4xl">✨</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  Style Garanti
                </h4>
                <p className="text-gray-600 text-center leading-relaxed">
                  Suivez les dernières tendances mode
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
