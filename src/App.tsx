import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Heart, Search, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LalaStore() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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

  const products = [
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
      image: "data:image/jpeg;base64,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",
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

  const categories = ['Tous', 'Vêtements', 'Chaussures', 'Accessoires', 'Voiles'];

  const filteredProducts = selectedCategory === 'Tous' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const searchedProducts = searchQuery.trim() === ''
    ? filteredProducts
    : filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleLogin = (email, password) => {
    // Simulation de connexion
    setCurrentUser({
      name: 'Fatou Diop',
      email: email,
      phone: '+221 77 123 45 67',
      address: 'Dakar, Sénégal'
    });
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setShowAccount(false);
  };

  const completeOrder = (deliveryInfo, paymentMethod) => {
    const newOrder = {
      id: `LS${Math.floor(Math.random() * 100000)}`,
      date: new Date().toLocaleDateString('fr-FR'),
      items: [...cart],
      total: getTotalPrice(),
      status: 'En cours',
      deliveryInfo,
      paymentMethod,
      trackingSteps: [
        { step: 'Commande reçue', completed: true, date: new Date().toLocaleDateString('fr-FR') },
        { step: 'En préparation', completed: false, date: null },
        { step: 'Expédiée', completed: false, date: null },
        { step: 'En livraison', completed: false, date: null },
        { step: 'Livrée', completed: false, date: null }
      ]
    };
    setUserOrders([newOrder, ...userOrders]);
    return newOrder;
  };

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-bold text-amber-900">Lala'store</span>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-10 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button className="relative hidden md:block">
                <Heart size={24} className="text-gray-700" />
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>
              <button className="relative">
                <ShoppingCart size={24} className="text-gray-700" onClick={() => setCartOpen(true)} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
              <button className="hidden md:block" onClick={() => isLoggedIn ? setShowAccount(true) : setShowLogin(true)}>
                <User size={24} className="text-gray-700" />
              </button>
              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block bg-amber-800 text-white`}>
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex flex-col md:flex-row md:space-x-8 py-3">
              <li className="py-2 md:py-0"><a href="#" className="hover:text-amber-200">Accueil</a></li>
              <li className="py-2 md:py-0"><a href="#nouveautes" className="hover:text-amber-200">Nouveautés</a></li>
              <li className="py-2 md:py-0"><a href="#" className="hover:text-amber-200">Vêtements</a></li>
              <li className="py-2 md:py-0"><a href="#" className="hover:text-amber-200">Chaussures</a></li>
              <li className="py-2 md:py-0"><a href="#" className="hover:text-amber-200">Accessoires</a></li>
              <li className="py-2 md:py-0"><a href="#" className="hover:text-amber-200">Voiles</a></li>
              <li className="py-2 md:py-0"><a href="#" className="hover:text-amber-200 font-semibold">Promotions</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Carousel Hero */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {carouselImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
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
        
        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition"
        >
          <ChevronRight size={32} />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Promotion Banner */}
      <div className="bg-amber-700 text-white text-center py-4">
        <p className="text-xl font-semibold">🎉 Réduction jusqu'à moins 15% - Offre limitée !</p>
      </div>

      {/* Featured Images */}
      <section className="py-12 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=400&fit=crop"
            ].map((img, i) => (
              <div key={i} className="relative rounded-full overflow-hidden aspect-square shadow-lg hover:shadow-2xl transition">
                <img
                  src={img}
                  alt={`Featured ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="nouveautes" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">NOS NOUVEAUTÉS</h2>
          
          {/* Mobile Search */}
          <div className="md:hidden mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-700"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-10 top-2.5 text-gray-400"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-amber-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {searchQuery && (
            <p className="mb-4 text-gray-600">
              {searchedProducts.length} résultat(s) pour "{searchQuery}"
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                  />
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
                  >
                    <Heart
                      size={20}
                      className={favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
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
                    onClick={() => addToCart(product)}
                    className="w-full bg-amber-800 text-white py-2 rounded-lg hover:bg-amber-900 transition"
                  >
                    Ajouter au panier
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="w-full mt-2 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-bold text-xl mb-2">À Propos de la Boutique</h3>
              <p className="text-gray-700">Votre destination mode au Sénégal</p>
              <p className="text-gray-700">Qualité et élégance garanties</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xl mb-2">Services Clients</h3>
              <p className="text-gray-700">Suivie Commande</p>
              <p className="text-gray-700">Livraison et retour gratuits</p>
              <p className="text-gray-700">Paiement sécurisé</p>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-xl mb-2">Restons Connectés</h3>
              <p className="text-gray-700 mb-4">Inscrivez-vous à notre newsletter</p>
              <div className="flex max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="Entrez votre mail"
                  className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:border-amber-700"
                />
                <button className="bg-gray-800 text-white px-6 py-2 rounded-r-lg hover:bg-gray-900">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
            <div>
              <h4 className="font-bold text-lg mb-3">Lala'store</h4>
              <p className="text-gray-400 text-sm">Votre boutique de mode élégante au Sénégal</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3">Catégories</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Vêtements</a></li>
                <li><a href="#" className="hover:text-white">Chaussures</a></li>
                <li><a href="#" className="hover:text-white">Accessoires</a></li>
                <li><a href="#" className="hover:text-white">Voiles</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3">Informations</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">À propos</a></li>
                <li><a href="#" className="hover:text-white">Livraison</a></li>
                <li><a href="#" className="hover:text-white">Retours</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3">Paiement</h4>
              <p className="text-gray-400 text-sm">Orange Money, Wave, Carte bancaire</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center">
            <p className="text-gray-400">© Lala'store 2025 - Tous droits réservés</p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Panier ({getTotalItems()})</h2>
                <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={28} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Votre panier est vide</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 border-b pb-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <p className="text-amber-800 font-bold text-sm">{item.price.toLocaleString()} FCF</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-gray-200 px-2 py-1 rounded text-sm hover:bg-gray-300"
                            >
                              -
                            </button>
                            <span className="text-sm font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-gray-200 px-2 py-1 rounded text-sm hover:bg-gray-300"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 text-sm hover:text-red-700"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Sous-total:</span>
                      <span className="font-bold">{getTotalPrice().toLocaleString()} FCF</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Livraison:</span>
                      <span className="text-green-600">Gratuite</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold border-t pt-2">
                      <span>Total:</span>
                      <span className="text-amber-800">{getTotalPrice().toLocaleString()} FCF</span>
                    </div>
                  </div>

                  <button className="w-full bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-900 transition">
                    Commander maintenant
                  </button>
                  <button 
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutStep(1);
                    }}
                    className="w-full mt-3 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Procéder au paiement
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                <button onClick={() => setSelectedProduct(null)} className="text-gray-500 hover:text-gray-700">
                  <X size={28} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>

                <div>
                  <div className="mb-4">
                    <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {selectedProduct.category}
                    </span>
                  </div>

                  <p className="text-3xl font-bold text-amber-800 mb-6">
                    {selectedProduct.price.toLocaleString()} FCF
                  </p>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Article de haute qualité, parfait pour toutes les occasions. 
                      Fabriqué avec soin et attention aux détails. Design moderne et élégant 
                      qui vous mettra en valeur. Disponible en différentes tailles.
                    </p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-2">Caractéristiques</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>✓ Matériaux de qualité premium</li>
                      <li>✓ Confort optimal</li>
                      <li>✓ Style moderne et tendance</li>
                      <li>✓ Livraison gratuite</li>
                      <li>✓ Retour sous 14 jours</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-2">Taille</h3>
                    <div className="flex gap-2">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          className="border-2 border-gray-300 px-4 py-2 rounded hover:border-amber-800 hover:text-amber-800 transition"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct);
                        setSelectedProduct(null);
                        setCartOpen(true);
                      }}
                      className="flex-1 bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-900 transition"
                    >
                      Ajouter au panier
                    </button>
                    <button
                      onClick={() => toggleFavorite(selectedProduct.id)}
                      className="border-2 border-amber-800 text-amber-800 px-4 rounded-lg hover:bg-amber-50 transition"
                    >
                      <Heart
                        size={24}
                        className={favorites.includes(selectedProduct.id) ? 'fill-current' : ''}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutStep > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                <div className={`flex items-center ${checkoutStep >= 1 ? 'text-amber-800' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep >= 1 ? 'bg-amber-800 text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="ml-2 text-sm font-semibold">Livraison</span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-4">
                  <div className={`h-full ${checkoutStep >= 2 ? 'bg-amber-800' : ''}`} style={{width: checkoutStep >= 2 ? '100%' : '0%'}}></div>
                </div>
                <div className={`flex items-center ${checkoutStep >= 2 ? 'text-amber-800' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep >= 2 ? 'bg-amber-800 text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="ml-2 text-sm font-semibold">Paiement</span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-4">
                  <div className={`h-full ${checkoutStep >= 3 ? 'bg-amber-800' : ''}`} style={{width: checkoutStep >= 3 ? '100%' : '0%'}}></div>
                </div>
                <div className={`flex items-center ${checkoutStep >= 3 ? 'text-amber-800' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep >= 3 ? 'bg-amber-800 text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="ml-2 text-sm font-semibold">Confirmation</span>
                </div>
              </div>

              {/* Step 1: Delivery Info */}
              {checkoutStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Informations de livraison</h2>
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Prénom</label>
                        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700" placeholder="Votre prénom" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Nom</label>
                        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700" placeholder="Votre nom" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Téléphone</label>
                      <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700" placeholder="+221 XX XXX XX XX" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700" placeholder="votre@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Adresse complète</label>
                      <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700" rows="3" placeholder="Numéro, rue, quartier, ville..."></textarea>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Ville</label>
                        <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700">
                          <option>Dakar</option>
                          <option>Thiès</option>
                          <option>Saint-Louis</option>
                          <option>Kaolack</option>
                          <option>Ziguinchor</option>
                          <option>Autre</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Code Postal</label>
                        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700" placeholder="12345" />
                      </div>
                    </div>
                  </form>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setCheckoutStep(0)}
                      className="flex-1 border-2 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
                    >
                      Retour
                    </button>
                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="flex-1 bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-900"
                    >
                      Continuer
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {checkoutStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Mode de paiement</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-semibold mb-2">Récapitulatif</h3>
                    <div className="flex justify-between mb-1">
                      <span>Sous-total ({getTotalItems()} articles)</span>
                      <span>{getTotalPrice().toLocaleString()} FCF</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Livraison</span>
                      <span className="text-green-600">Gratuite</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-amber-800">{getTotalPrice().toLocaleString()} FCF</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-amber-700">
                      <input type="radio" name="payment" className="mr-3" defaultChecked />
                      <div className="flex-1">
                        <div className="font-semibold">Orange Money</div>
                        <div className="text-sm text-gray-500">Paiement sécurisé via Orange Money</div>
                      </div>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Orange_Money_Logo.svg/200px-Orange_Money_Logo.svg.png" alt="Orange Money" className="h-8" />
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-amber-700">
                      <input type="radio" name="payment" className="mr-3" />
                      <div className="flex-1">
                        <div className="font-semibold">Wave</div>
                        <div className="text-sm text-gray-500">Paiement rapide avec Wave</div>
                      </div>
                      <div className="bg-blue-500 text-white px-3 py-1 rounded font-bold">WAVE</div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-amber-700">
                      <input type="radio" name="payment" className="mr-3" />
                      <div className="flex-1">
                        <div className="font-semibold">Carte Bancaire</div>
                        <div className="text-sm text-gray-500">Visa, Mastercard acceptées</div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-blue-600 font-bold">VISA</span>
                        <span className="text-red-600 font-bold">MC</span>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-amber-700">
                      <input type="radio" name="payment" className="mr-3" />
                      <div className="flex-1">
                        <div className="font-semibold">Paiement à la livraison</div>
                        <div className="text-sm text-gray-500">Payez en espèces à la réception</div>
                      </div>
                      <span className="text-2xl">💵</span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setCheckoutStep(1)}
                      className="flex-1 border-2 border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
                    >
                      Retour
                    </button>
                    <button
                      onClick={() => setCheckoutStep(3)}
                      className="flex-1 bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-900"
                    >
                      Confirmer le paiement
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {checkoutStep === 3 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-green-600 mb-4">Commande confirmée !</h2>
                  <p className="text-gray-600 mb-2">Merci pour votre achat</p>
                  <p className="text-gray-500 mb-8">Numéro de commande: #{(() => {
                    const order = completeOrder({}, 'Orange Money');
                    return order.id;
                  })()}</p>
                  
                  <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
                    <h3 className="font-bold mb-4">Détails de la commande</h3>
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between mb-2">
                        <span>{item.name} x{item.quantity}</span>
                        <span>{(item.price * item.quantity).toLocaleString()} FCF</span>
                      </div>
                    ))}
                    <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                      <span>Total payé</span>
                      <span className="text-amber-800">{getTotalPrice().toLocaleString()} FCF</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-6">
                    Vous recevrez un email de confirmation et un SMS avec les détails de votre commande.
                    Livraison estimée : 2-5 jours ouvrables.
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setCheckoutStep(0);
                        setCart([]);
                      }}
                      className="flex-1 bg-amber-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-900"
                    >
                      Retour à l'accueil
                    </button>
                    <button
                      onClick={() => {
                        setCheckoutStep(0);
                        setCart([]);
                        setShowAccount(true);
                      }}
                      className="flex-1 border-2 border-amber-800 text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50"
                    >
                      Suivre ma commande
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Login/Register Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Connexion</h2>
              <button onClick={() => setShowLogin(false)} className="text-gray-500 hover:text-gray-700">
                <X size={28} />
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              handleLogin(e.target.email.value, e.target.password.value);
            }}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Mot de passe</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-amber-700"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-800 text-white py-3 rounded-lg font-semibold hover:bg-amber-900 transition mb-4"
              >
                Se connecter
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Pas encore de compte ?{' '}
                  <button type="button" className="text-amber-800 font-semibold hover:underline">
                    S'inscrire
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Account/Orders Modal */}
      {showAccount && isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center p-4 py-12">
            <div className="bg-white rounded-lg max-w-4xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Mon Compte</h2>
                <button onClick={() => setShowAccount(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={28} />
                </button>
              </div>

              {/* User Info */}
              <div className="bg-amber-50 p-6 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{currentUser?.name}</h3>
                    <p className="text-gray-600">{currentUser?.email}</p>
                    <p className="text-gray-600">{currentUser?.phone}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>

              {/* Orders Section */}
              <div>
                <h3 className="text-xl font-bold mb-4">Mes Commandes ({userOrders.length})</h3>
                
                {userOrders.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Aucune commande pour le moment</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <div key={order.id} className="border-2 rounded-lg p-4 hover:border-amber-700 transition">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-lg">Commande #{order.id}</h4>
                            <p className="text-sm text-gray-600">Date: {order.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'Livrée' ? 'bg-green-100 text-green-800' :
                            order.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>

                        {/* Order Items */}
                        <div className="mb-4 space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 text-sm">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                              <div className="flex-1">
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-gray-600">Qté: {item.quantity}</p>
                              </div>
                              <p className="font-semibold">{(item.price * item.quantity).toLocaleString()} FCF</p>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-3 mb-4">
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span className="text-amber-800">{order.total.toLocaleString()} FCF</span>
                          </div>
                        </div>

                        {/* Tracking Timeline */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h5 className="font-semibold mb-3 text-sm">Suivi de livraison</h5>
                          <div className="space-y-3">
                            {order.trackingSteps.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  step.completed ? 'bg-green-500' : 'bg-gray-300'
                                }`}>
                                  {step.completed && (
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className={`text-sm font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {step.step}
                                  </p>
                                  {step.date && (
                                    <p className="text-xs text-gray-500">{step.date}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
