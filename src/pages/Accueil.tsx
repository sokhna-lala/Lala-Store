import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../components/Layout";
import Produit from "../components/Produit";
import Carousel from "../components/Carousel";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function Accueil() {
  const { user } = useAuth();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Redirect admin users to admin dashboard
  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  const handleEnSavoirPlus = () => {
    Swal.fire({
      title: "À propos de Lala Store",
      html: `
        <div style="text-align: left; line-height: 1.6;">
          <h3 style="color: #8B5E3C; margin-bottom: 15px;">Notre Histoire</h3>
          <p style="margin-bottom: 15px;">
            Fondée en 2020, Lala Store est née d'une passion pour l'élégance et l'authenticité.
            Notre boutique en ligne propose une collection exclusive de tissus traditionnels,
            de voiles raffinés, de sacs à main élégants et de bijoux précieux.
          </p>

          <h3 style="color: #8B5E3C; margin-bottom: 15px;">Notre Mission</h3>
          <p style="margin-bottom: 15px;">
            Nous nous engageons à offrir à nos clientes des produits de qualité exceptionnelle
            qui allient tradition et modernité. Chaque pièce est soigneusement sélectionnée
            pour garantir authenticité et raffinement.
          </p>

          <h3 style="color: #8B5E3C; margin-bottom: 15px;">Nos Valeurs</h3>
          <ul style="margin-bottom: 15px;">
            <li>• <strong>Qualité</strong> : Sélection rigoureuse de nos fournisseurs</li>
            <li>• <strong>Authenticité</strong> : Produits traditionnels et originaux</li>
            <li>• <strong>Service</strong> : Accompagnement personnalisé</li>
            <li>• <strong>Innovation</strong> : Tendances modernes et classiques</li>
          </ul>

          <h3 style="color: #8B5E3C; margin-bottom: 15px;">Notre Engagement</h3>
          <p>
            Chez Lala Store, nous croyons que la mode doit être accessible à toutes.
            C'est pourquoi nous proposons des prix compétitifs sans compromettre la qualité,
            et nous nous efforçons de créer une expérience d'achat exceptionnelle pour chacune de nos clientes.
          </p>
        </div>
      `,
      confirmButtonText: "Fermer",
      confirmButtonColor: "#8B5E3C",
      width: "600px",
      customClass: {
        popup: "swal-wide",
      },
    });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Email requis",
        text: "Veuillez saisir votre adresse email.",
        confirmButtonColor: "#8B5E3C",
      });
      return;
    }

    try {
      // Simuler l'envoi à une API
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulation

      Swal.fire({
        icon: "success",
        title: "Inscription réussie !",
        text: "Merci de vous être inscrit à notre newsletter. Vous recevrez bientôt nos dernières nouvelles.",
        confirmButtonColor: "#8B5E3C",
      });

      setNewsletterEmail("");
    } catch {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Une erreur s'est produite. Veuillez réessayer.",
        confirmButtonColor: "#8B5E3C",
      });
    }
  };
  return (
    <Layout>
      <div className="bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 min-h-screen">
        {/* Hero Section - Nouvelle Collection */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Contenu texte */}
              <div className="flex-1 text-center lg:text-left space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <span className="text-2xl">🌸</span>
                  <span className="text-sm font-medium text-amber-900">
                    Nouvelle Collection 2024
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-amber-950 leading-tight">
                  L'élégance à votre{" "}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                    portée
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-amber-800 max-w-xl">
                  Découvrez notre collection exclusive qui allie raffinement,
                  modernité et authenticité pour sublimer votre style unique.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    to="/all-products"
                    className="bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 inline-block"
                  >
                    Voir plus
                  </Link>

                  <button
                    onClick={handleEnSavoirPlus}
                    className="bg-white/80 backdrop-blur-sm text-amber-900 font-semibold px-8 py-4 rounded-full shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    En savoir plus
                  </button>
                </div>

                {/* Stats */}
                <div className="flex gap-8 justify-center lg:justify-start pt-6">
                  <div>
                    <div className="text-3xl font-bold text-amber-900">
                      500+
                    </div>
                    <div className="text-sm text-amber-700">Produits</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-900">
                      2000+
                    </div>
                    <div className="text-sm text-amber-700">Clientes</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-900">5★</div>
                    <div className="text-sm text-amber-700">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* ✅ Image  */}
              <div className="flex-1 relative flex justify-center items-center">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20 blur-3xl"></div>

                <div className="relative overflow-hidden rounded-3xl shadow-2xl max-w-sm w-full aspect-[4/5]">
                  <img
                    src="/Models/la fille voilée.png"
                    alt="Collection"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="absolute bottom-4 right-6 bg-white rounded-2xl shadow-xl p-3">
                  <span className="text-3xl">❤️</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bannière Réduction */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 text-white rounded-2xl shadow-xl overflow-hidden relative">
            <div className="relative text-center py-6 px-4 overflow-hidden">
              {/* 🔽 Texte défilant */}
              <div className="inline-block whitespace-nowrap animate-scroll">
                <div className="text-2xl md:text-3xl font-bold mb-2">
                  OFFRE EXCEPTIONNELLE
                </div>
                <div className="text-lg md:text-xl">
                  Jusqu'à <span className="text-4xl font-black mx-2">-15%</span>{" "}
                  sur toute la boutique
                </div>
                <div className="text-sm mt-2 opacity-90">
                  Offre limitée · Valable sur tous les articles
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carrousel Modèles */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950 mb-3">
              Nos Meilleurs Modèles
            </h2>
            <p className="text-amber-700 text-lg">
              Des créations qui reflètent votre personnalité
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl p-6">
            <Carousel
              images={[
                "/Models/model1.jpg",
                "/Models/model2.jpg",
                "/Models/model3.jpg",
              ]}
              alt="modèle"
            />
          </div>
        </section>

        {/* Grille Produits */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-4">
              <span className="text-xl">🛍️</span>
              <span className="text-sm font-medium text-amber-900">
                Nouveautés
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950 mb-3">
              Découvrez Nos Dernières Créations
            </h2>
            <p className="text-amber-700 text-lg">
              Une sélection raffinée pour vous
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Produit
              img="/Tissus/Brodé autriche.jpeg"
              titre="Brodé autriche"
              prix="30 000 FCFA"
              description="Tissu traditionnel brodé autrichien de haute qualité, parfait pour créer des pièces élégantes et raffinées. Idéal pour les tenues de cérémonie et les créations sur mesure."
            />
            <Produit
              img="/Bijoux/colier2.jpeg"
              titre="Parure en or"
              prix="300 000 FCFA"
              description="Magnifique parure en or 18 carats composée d'un collier, de boucles d'oreilles et d'un bracelet. Pièce maîtresse pour sublimer votre style avec élégance et sophistication."
            />
            <Produit
              img="/Sac/sac a main Pedra.jpeg"
              titre="Sac en cuir"
              prix="15 000 FCFA"
              description="Sac à main en cuir véritable de couleur marron, avec fermeture éclair et compartiments intérieurs. Design moderne et fonctionnel pour un usage quotidien."
            />
            <Produit
              img="/Voile/voiles.jpg"
              titre="Voile Mouslin simple"
              prix="1 000 FCFA"
              description="Voile en mousseline légère et aérienne, parfaite pour les tenues traditionnelles. Tissu fluide et confortable, disponible en plusieurs coloris."
            />
            <Produit
              img="/Voile/Cachemir imprimé.jpeg"
              titre="Voile Cachemir imprimé"
              prix="1 000 FCFA"
              description="Voile en cachemire avec motifs imprimés délicats. Combinaison parfaite de douceur et d'élégance pour vos tenues traditionnelles."
            />
            <Produit
              img="/Tissus/cotonade.jpeg"
              titre="Cotonade"
              prix="1 000 FCFA"
              description="Tissu en cotonade de qualité supérieure, résistant et confortable. Idéal pour la confection de vêtements traditionnels et modernes."
            />
            <Produit
              img="/Sac/sac dior.jpeg"
              titre="Sac Dior"
              prix="100 000 FCFA"
              description="Sac à main de luxe inspiré de Dior, en cuir synthétique haut de gamme. Design élégant avec chaîne dorée et compartiments multiples."
            />
            <Produit
              img="/Bijoux/BOUCLE 14.jpeg"
              titre="Boucles d'oreilles"
              prix="10 000 FCFA"
              description="Boucles d'oreilles en argent plaqué or avec motifs traditionnels. Pièces délicates et raffinées pour compléter votre look avec style."
            />
          </div>
        </section>

        {/* Section Newsletter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-br from-amber-900 to-orange-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-12 md:py-16 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Restez Informée de Nos Nouveautés
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Inscrivez-vous à notre newsletter et recevez en exclusivité nos
                nouvelles collections et offres spéciales
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="flex-1 px-6 py-4 rounded-full text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-300"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-amber-900 font-semibold px-8 py-4 rounded-full hover:bg-amber-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  S'inscrire
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
