// src/pages/Accessoires.jsx
import Layout from "../components/Layout";
import Produit from "../components/Produit";

export default function Accessoires() {
  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-[#8B5E3C] mb-6">Accessoires</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Produit
            img="/images/sac.jpg"
            titre="Sac en cuir"
            prix="15 000 FCFA"
          />
          <Produit
            img="/images/lunette.jpg"
            titre="Lunettes de soleil"
            prix="10 000 FCFA"
          />
          <Produit
            img="/images/montre.jpg"
            titre="Montre classique"
            prix="25 000 FCFA"
          />
          <Produit
            img="/images/parure.jpg"
            titre="Parure dorée"
            prix="30 000 FCFA"
          />
        </div>
      </div>
    </Layout>
  );
}
