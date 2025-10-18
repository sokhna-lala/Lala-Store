import Layout from "../components/Layout";
import Produit from "../components/Produit";

export default function Voiles() {
  return (
    <Layout>
      {/* 🕊️ Section principale avec fond doux et dégradé */}
      <div className="relative bg-gradient-to-b from-amber-50 via-yellow-50 to-white min-h-screen overflow-hidden">
        {/* 🌟 Éléments décoratifs lumineux */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-200 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-20 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping"></div>

        {/* 💫 Titre principal */}
        <div className="relative text-center py-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#9A7B4F] drop-shadow-sm mb-4">
            Collection de Voiles Élégants
          </h2>
          <p className="text-gray-600 text-lg">
            Légèreté, raffinement et confort pour sublimer votre tenue.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-24 bg-[#9A7B4F] rounded-full"></div>
          </div>
        </div>

        {/* 🧕 Grille des produits */}
        <div className="relative p-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <Produit
              img="Voiles/Voile 1.jpg"
              titre="Voile perlé"
              prix="2 000 FCFA"
            />
            <Produit
              img="Voiles/Voile 2.jpg"
              titre="Mousseline perlée"
              prix="1 000 FCFA"
            />
            <Produit
              img="Voiles/Voile 3.jpg"
              titre="Mousseline simple"
              prix="2 500 FCFA"
            />
            <Produit
              img="Voiles/Voile 4.jpg"
              titre="Mousseline avec finition"
              prix="3 500 FCFA"
            />
            <Produit
              img="Voiles/Voile 5.jpg"
              titre="Voile Assya"
              prix="10 000 FCFA"
            />
            <Produit
              img="Voiles/Voile 6.jpg"
              titre="Voile coton"
              prix="2 000 FCFA"
            />
            <Produit
              img="Voiles/voile 7.jpg"
              titre="Voile à paillettes"
              prix="2 000 FCFA"
            />
            <Produit
              img="Voiles/Voile 8.jpg"
              titre="Voile Habiba"
              prix="1 500 FCFA"
            />
            <Produit
              img="Voiles/Voile 9.jpg"
              titre="Voile plissé"
              prix="2 000 FCFA"
            />
            <Produit
              img="Voiles/Voile 10.jpg"
              titre="Mousseline perlée simple"
              prix="2 000 FCFA"
            />
            <Produit
              img="Voiles/Voile 11.jpg"
              titre="La grande dame"
              prix="5 000 FCFA"
            />
            <Produit
              img="Voiles/Voile 13.jpg"
              titre="Voile en soie"
              prix="5 000 FCFA"
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
