import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import collectionImg from '../assets/image/collection.jpg.jpg';
import model1 from '../assets/image/Modele1.jpg';
import model2 from '../assets/image/Modele2.jpg';
import model3 from '../assets/image/modele3.jpg';
import chaussure from '../assets/image/Chaussures escarpin.jpg';
import parure from '../assets/image/Parure en or.jpg';
import sac from '../assets/image/sac a cuir.png.png';
import voile from '../assets/image/Voile mousline .png';

export default function Accueil() {
  return (
    <div className="p-8">
      <section className="flex flex-col md:flex-row items-center bg-brown-200 p-6 rounded-2xl shadow mb-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-brown-600">NOUVELLE COLLECTION</h2>
          <p className="text-gray-600 mb-4">Élégance et modernité pour tous</p>
          <button className="bg-brown-600 text-white px-4 py-2 rounded">Voir plus</button>
        </div>
        <img src={collectionImg} alt="Collection" className="w-64 rounded-2xl" />
      </section>

      <section className="bg-brown-400 text-white text-center py-2 rounded mb-8">
        Réduction jusqu’à 15%
      </section>

      <section className="mb-8 ">
        <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} showArrows={true} showIndicators={true} autoPlay={true} interval={4000} stopOnHover={true}>
          <div className="bg-brown-600 rounded-xl w-72 h-72 flex items-center justify-center mx-auto">
            <img src={model1} alt="Modèle 1" className="rounded-xl w-72 h-72 object-contain" />
          </div>
          <div className="bg-brown-600 rounded-xl w-72 h-72 flex items-center justify-center mx-auto">
            <img src={model2} alt="Modèle 2" className="rounded-xl w-72 h-72 object-contain" />
          </div>
          <div className="bg-brown-600 rounded-xl w-72 h-72 flex items-center justify-center mx-auto">
            <img src={model3} alt="Modèle 3" className="rounded-xl w-72 h-72 object-contain" />
          </div>
        </Carousel>
      </section>

      <h3 className="text-xl font-bold mb-4">Nos Nouveautés</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Produit img={chaussure} titre="Chaussures escarpin" prix="30000 FCFA" />
        <Produit img={parure} titre="Parure en or" prix="300000 FCFA" />
        <Produit img={sac} titre="Sac en cuir" prix="15000 FCFA" />
        <Produit img={voile} titre="Voile Mouslin simple" prix="1000 FCFA" />
      </div>
    </Layout>
  );
}

function Produit({ img, titre, prix }: { img: string; titre: string; prix: string }) {
  return (
    <div className="p-4 rounded-xl shadow text-center">
      <img src={img} alt={titre} className="rounded-xl mb-2 w-40 h-40 object-cover" />
      <p className="font-semibold text-brown-600">{titre}</p>
      <p className="text-sm text-gray-600">{prix}</p>
      <button className="mt-2 bg-brown-600 text-white px-3 py-1 rounded">Voir</button>

    </div>
  );
}
