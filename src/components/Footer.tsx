export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <img src="/logo.png" alt="LalaStore" className="w-5 h-5" />
            <h3 className="text-sm font-semibold text-[#8B5E3C]">LalaStore</h3>
          </div>
          <p className="text-xs text-gray-600">
            Boutique en ligne dédiée à la mode et à l’élégance.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-800">Services</h4>
          <ul className="space-y-1 text-xs text-gray-600">
            <li className="hover:text-gray-800 cursor-pointer">
              Suivi de commande
            </li>
            <li className="hover:text-gray-800 cursor-pointer">
              Livraison & retour
            </li>
            <li className="hover:text-gray-800 cursor-pointer">
              Contactez-nous
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 text-gray-800">Newsletter</h4>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 rounded-md px-3 py-1 border border-gray-200 text-xs"
            />
            <button className="bg-[#8B5E3C] text-white px-3 py-1 rounded-md text-xs hover:bg-[#7a5135]">
              S'inscrire
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white text-center py-2 text-xs text-gray-500 border-t">
        © 2025 <span className="font-semibold text-gray-700">LalaStore</span> —
        Tous droits réservés
      </div>
    </footer>
  );
}
