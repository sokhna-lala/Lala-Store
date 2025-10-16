// src/pages/Vetements.jsx
import Layout from "../components/Layout";
import Produit from "../components/Produit";

export default function Vetements() {
  return (
    <Layout>
      <div className="p-8">
        <h2 className="text-2xl font-bold text-[#8B5E3C] mb-6">Vêtements</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Produit
            img="/images/robe1.jpg"
            titre="Robe élégante"
            prix="25 000 FCFA"
          />
          <Produit
            img="/images/chemise1.jpg"
            titre="Chemise homme"
            prix="15 000 FCFA"
          />
          <Produit
            img="/images/pantalon1.jpg"
            titre="Pantalon slim"
            prix="18 000 FCFA"
          />
          <Produit
            img="/images/robe2.jpg"
            titre="Robe de soirée"
            prix="35 000 FCFA"
          />
          <Produit
            img="/images/robe2.jpg"
            titre="Robe de soirée"
            prix="35 000 FCFA"
          />
          <Produit
            img="/images/robe2.jpg"
            titre="Robe de soirée"
            prix="35 000 FCFA"
          />
          <Produit
            img="/images/robe2.jpg"
            titre="Robe de soirée"
            prix="35 000 FCFA"
          />
          <Produit
            img="/images/robe2.jpg"
            titre="Robe de soirée"
            prix="35 000 FCFA"
          />
          <Produit
            img="/images/robe2.jpg"
            titre="Robe de soirée"
            prix="35 000 FCFA"
          />
          <Produit
            img="/images/robe2.jpg"
            titre="Robe de soirée"
            prix="35 000 FCFA"
          />
        </div>
      </div>
    </Layout>
  );
}
