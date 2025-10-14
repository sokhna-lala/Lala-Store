export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export const products: Product[] = [
  // Vêtements
  {
    id: 1,
    name: "Robe élégante soirée",
    price: 45000,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    category: "Vêtements"
  },
  {
    id: 2,
    name: "Ensemble traditionnel",
    price: 65000,
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400&h=500&fit=crop",
    category: "Vêtements"
  },
  {
    id: 3,
    name: "Caftan moderne",
    price: 55000,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=500&fit=crop",
    category: "Vêtements"
  },
  {
    id: 4,
    name: "Tailleur femme chic",
    price: 48000,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    category: "Vêtements"
  },
  {
    id: 5,
    name: "Robe africaine wax",
    price: 38000,
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=500&fit=crop",
    category: "Vêtements"
  },
  {
    id: 6,
    name: "Kimono brodé",
    price: 42000,
    image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=500&fit=crop",
    category: "Vêtements"
  },

  // Chaussures
  {
    id: 7,
    name: "Escarpins rouge élégant",
    price: 30000,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop",
    category: "Chaussures"
  },
  {
    id: 8,
    name: "Sandales à talons dorées",
    price: 28000,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=500&fit=crop",
    category: "Chaussures"
  },
  {
    id: 9,
    name: "Bottines cuir noir",
    price: 35000,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=500&fit=crop",
    category: "Chaussures"
  },
  {
    id: 10,
    name: "Baskets tendance",
    price: 25000,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=500&fit=crop",
    category: "Chaussures"
  },
  {
    id: 11,
    name: "Mules à talons",
    price: 22000,
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=500&fit=crop",
    category: "Chaussures"
  },
  {
    id: 12,
    name: "Ballerines confort",
    price: 18000,
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&h=500&fit=crop",
    category: "Chaussures"
  },

  // Accessoires
  {
    id: 13,
    name: "Parure en Or 18k",
    price: 300000,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
    category: "Accessoires"
  },
  {
    id: 14,
    name: "Sac en cuir véritable",
    price: 150000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
    category: "Accessoires"
  },
  {
    id: 15,
    name: "Montre élégante",
    price: 85000,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop",
    category: "Accessoires"
  },
  {
    id: 16,
    name: "Lunettes de soleil",
    price: 35000,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=500&fit=crop",
    category: "Accessoires"
  },
  {
    id: 17,
    name: "Ceinture cuir doré",
    price: 28000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
    category: "Accessoires"
  },
  {
    id: 18,
    name: "Foulard soie premium",
    price: 45000,
    image: "https://images.unsplash.com/photo-1601924357840-3e95e9f04bb5?w=400&h=500&fit=crop",
    category: "Accessoires"
  },

  // Voiles
  {
    id: 19,
    name: "Voile Mousslin simple",
    price: 1000,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=500&fit=crop",
    category: "Voiles"
  },
  {
    id: 20,
    name: "Hijab premium soie",
    price: 3500,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=500&fit=crop",
    category: "Voiles"
  },
  {
    id: 21,
    name: "Voile jersey stretch",
    price: 1500,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
    category: "Voiles"
  },
  {
    id: 22,
    name: "Châle élégant brodé",
    price: 5000,
    image: "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=400&h=500&fit=crop",
    category: "Voiles"
  },
  {
    id: 23,
    name: "Turban africain wax",
    price: 2500,
    image: "https://images.unsplash.com/photo-1612723476646-f1c39f9612a5?w=400&h=500&fit=crop",
    category: "Voiles"
  },
  {
    id: 24,
    name: "Voile pashmina luxe",
    price: 8000,
    image: "https://images.unsplash.com/photo-1599008633840-052c7f756385?w=400&h=500&fit=crop",
    category: "Voiles"
  }
];
