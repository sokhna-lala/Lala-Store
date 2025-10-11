export default function Footer() {
  return (
    <footer className="bg-[#E9DCC9] text-gray-800 mt-8">
      {/* Partie supérieure */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-4">
        {/* À propos */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img src="/logo.png" alt="LalaStore" className="w-10 h-10" />
            <h3 className="text-lg font-bold text-[#8B5E3C]">LalaStore</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Boutique en ligne dédiée à la mode, l’élégance et la modernité.
            Découvrez nos collections uniques pour sublimer votre style au
            quotidien.
          </p>
        </div>

        {/* Services clients */}
        <div>
          <h3 className="text-sm font-bold mb-3 text-[#8B5E3C]">Services Clients</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="hover:text-[#8B5E3C] cursor-pointer transition-colors">Suivi de commande</li>
            <li className="hover:text-[#8B5E3C] cursor-pointer transition-colors">Livraison & retour</li>
            <li className="hover:text-[#8B5E3C] cursor-pointer transition-colors">Contactez-nous</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-bold mb-3 text-[#8B5E3C]">Restons connectés</h3>
          <p className="text-sm text-gray-700 mb-3">Recevez nos nouveautés et promotions directement dans votre boîte mail.</p>
          <div className="flex items-center">
            <input
              type="email"
              placeholder="Votre email..."
              className="w-full rounded-l-full px-3 py-1.5 border border-gray-400 outline-none focus:border-[#8B5E3C]"
            />
            <button className="bg-[#8B5E3C] text-white px-3 py-1.5 rounded-r-full hover:bg-[#A0724D] transition-colors">OK</button>
          </div>
        </div>
      </div>

      {/* Bande inférieure */}
  <div className="bg-[#8B5E3C] text-white text-center py-1.5 text-sm">
        © 2025 <span className="font-semibold">LalaStore</span> — Tous droits réservés
      </div>
    </footer>
  );
}
