import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products, type Product } from '../data/products';

export default function Vetement() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const vetements = products.filter(p => p.category === 'Vêtements');

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Vêtements</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vetements.map((product) => (
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
