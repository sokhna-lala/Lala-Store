import Layout from "../components/Layout";
import Produit from "../components/Produit";

export default function Promotions() {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        {/* Section titre */}
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-600"></div>
                <span className="text-sm font-bold text-amber-700 uppercase tracking-widest">
                  Offres Exceptionnelles
                </span>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-600"></div>
              </div>
            </div>

            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 bg-gradient-to-r from-[#8B5E3C] via-amber-700 to-orange-600 bg-clip-text text-transparent">
              Nos Promotions du Moment
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des articles tendance à prix doux — profitez-en avant la fin des
              stocks !
            </p>
          </div>

          {/* Grille de produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Produit
              img="Promo/Promo1.jpg"
              titre="Talon compensé"
              prix="25 000 FCFA"
            />
            <Produit
              img="Promo/Promo 2.jpg"
              titre="Mocassin rouge"
              prix="25 000 FCFA"
            />
            <Produit
              img="Promo/Promo 3.jpg"
              titre="Mocassin noir"
              prix="25 000 FCFA"
            />
          </div>
        </div>

        {/* Section appel à l’action */}
        <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-72 h-72 bg-amber-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-5xl mx-auto px-8 text-center">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Ne ratez pas nos offres limitées
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Ces promotions sont disponibles pour une durée limitée. Commandez
              maintenant avant la rupture de stock !
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
