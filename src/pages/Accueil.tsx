import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProductCard from '../components/ProductCard';
import { products, type Product } from '../data/products';

export default function Accueil() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=500&fit=crop",
      title: "NOUVELLE COLLECTION",
      subtitle: "Élégance et modernité pour tous"
    },
    {
      url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=500&fit=crop",
      title: "TENDANCES 2025",
      subtitle: "Découvrez les dernières modes"
    },
    {
      url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=500&fit=crop",
      title: "PROMOTIONS",
      subtitle: "Jusqu'à -15% sur une sélection"
    }
  ];

  const featuredProducts = products.slice(0, 4); // Show first 4 products as featured

  const addToCart = (product: Product) => {
    // Placeholder for add to cart functionality
    alert(`Produit ajouté au panier: ${product.name}`);
  };

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} showArrows={true} showIndicators={true} autoPlay={true} interval={5000} stopOnHover={true}>
          {carouselImages.map((slide, index) => (
            <div key={index} className="relative h-96 md:h-[500px]">
              <img
                src={slide.url}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl md:text-2xl mb-6">{slide.subtitle}</p>
                  <button className="bg-amber-700 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition">
                    Découvrir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Promotion Banner */}
      <div className="bg-amber-700 text-white text-center py-4">
        <p className="text-xl font-semibold">🎉 Réduction jusqu'à moins 15% - Offre limitée !</p>
      </div>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">NOS NOUVEAUTÉS</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onToggleFavorite={toggleFavorite}
                isFavorite={favorites.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
