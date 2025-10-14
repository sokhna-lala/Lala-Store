import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products, type Product } from '../data/products';

export default function Promotions() {
  const [favorites, setFavorites] = useState<number[]>([]);

  // For now, show all products as promotions since no discount data exists
  const promotions = products;

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
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Promotions</h1>
        <p className="text-gray-600 mb-8">Découvrez nos offres spéciales et réductions exceptionnelles</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotions.map((product) => (
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
    </div>
  );
}
