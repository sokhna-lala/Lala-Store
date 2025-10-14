import React from 'react';
import { Heart } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: number) => void;
  isFavorite: boolean;
}

export default function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
        />
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
        >
          <Heart
            size={20}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
        <span className="absolute top-2 left-2 bg-amber-700 text-white text-xs px-3 py-1 rounded-full">
          {product.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 h-12">{product.name}</h3>
        <p className="text-amber-800 font-bold text-lg mb-4">{product.price.toLocaleString()} FCF</p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-amber-800 text-white py-2 rounded-lg hover:bg-amber-900 transition"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
