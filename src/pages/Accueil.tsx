import Layout from "../../components/Layout";
export default function Accueil() {
  return (
    <Layout>
      <div className="p-8">
        {/* Section nouvelle collection */}
        <section className="flex flex-col md:flex-row items-center bg-white p-6 rounded-2xl shadow mb-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#8B5E3C]">
              NOUVELLE COLLECTION
            </h2>
            <p className="text-gray-600 mb-4">
              Élégance et modernité pour tous
            </p>
            <button className="bg-[#8B5E3C] text-white px-4 py-2 rounded">
              Voir plus
            </button>
          </div>
          <img
            src="/images/nouvelle-collection.jpg"
            alt="Collection"
            className="w-64 rounded-2xl"
          />
        </section>

        {/* Section réduction */}
        <section className="bg-[#CBB59C] text-white text-center py-2 rounded mb-8">
          Réduction jusqu’à -15%
        </section>

        {/* Section modèles */}
        <section className="grid grid-cols-3 gap-4 mb-8">
          <img
            src="/images/model1.jpg"
            alt="Modèle 1"
            className="rounded-full"
          />
          <img
            src="/images/model2.jpg"
            alt="Modèle 2"
            className="rounded-full"
          />
          <img
            src="/images/model3.jpg"
            alt="Modèle 3"
            className="rounded-full"
          />
        </section>

        {/* Produits */}
        <h3 className="text-xl font-bold mb-4">Nos Nouveautés</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Produit
            img="/images/chaussure.jpg"
            titre="Chaussures escarpin"
            prix="30 000 FCFA"
          />
          <Produit
            img="/images/parure.jpg"
            titre="Parure en or"
            prix="300 000 FCFA"
          />
          <Produit
            img="/images/sac.jpg"
            titre="Sac en cuir"
            prix="15 000 FCFA"
          />
          <Produit
            img="/images/voile.jpg"
            titre="Voile Mouslin simple"
            prix="1 000 FCFA"
          />
        </div>
      </div>
    </Layout>
  );
}

function Produit({ img, titre, prix }: { img: string; titre: string; prix: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <img src={img} alt={titre} className="rounded-xl mb-2" />
      <p className="font-semibold">{titre}</p>
      <p className="text-sm text-gray-500">{prix}</p>
      <button className="mt-2 bg-[#8B5E3C] text-white px-3 py-1 rounded">
        Voir
      </button>
    </div>
  );
}
