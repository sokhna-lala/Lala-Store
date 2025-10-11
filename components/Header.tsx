import { Search, ShoppingCart, User, Heart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#F5EFE7] shadow-sm">
      {/* Conteneur centré */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 px-3 py-1.5">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="LalaStore" className="w-10 h-10" />
          <span className="text-lg font-bold text-[#8B5E3C]">LalaStore</span>
        </div>

        {/* Barre de recherche - cachée sur petits écrans */}
        <div className="hidden md:flex items-center bg-white rounded-full px-3 py-1 w-1/2 border border-gray-300 shadow-inner">
          <Search className="text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Rechercher un article..."
            className="ml-2 w-full outline-none text-sm bg-transparent"
          />
        </div>

        {/* Icônes */}
        <div className="flex items-center gap-3 text-[#8B5E3C]">
          <ShoppingCart className="cursor-pointer hover:text-pink-600 transition-colors" />
          <User className="cursor-pointer hover:text-pink-600 transition-colors" />
          <Heart className="cursor-pointer hover:text-pink-600 transition-colors" />
        </div>
      </div>
    </header>
  );
}
