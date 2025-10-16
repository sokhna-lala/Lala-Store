// src/pages/Promotions.jsx
import Layout from "../components/Layout";
import Produit from "../components/Produit";

export default function Promotions() {
  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-[#8B5E3C] mb-6">Promotions</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Produit
            img="/images/chaussure.jpg"
            titre="Chaussure promo"
            prix="25 000 FCFA"
          />
          <Produit img="/images/sac.jpg" titre="Sac promo" prix="12 000 FCFA" />
          <Produit
            img="/images/robe1.jpg"
            titre="Robe promo"
            prix="20 000 FCFA"
          />
          <Produit
            img="/images/voile1.jpg"
            titre="Voile promo"
            prix="800 FCFA"
          />
        </div>
      </div>
    </Layout>
  );
}
