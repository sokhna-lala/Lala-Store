import { useEffect, useState } from "react";
import Layout from "../components/Layout";

type CartEntry = {
  id?: string | number;
  titre?: string;
  prix?: string | number;
  qty?: number;
  img?: string;
};

export default function Panier() {
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"wave" | "orange">("wave");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function readCart() {
    try {
      const raw = localStorage.getItem("cart");
      const parsed: CartEntry[] = raw ? JSON.parse(raw) : [];
      setCart(parsed);
    } catch {
      setCart([]);
    }
  }

  useEffect(() => {
    readCart();
    const handler = () => readCart();
    window.addEventListener("cartUpdated", handler as EventListener);
    return () =>
      window.removeEventListener("cartUpdated", handler as EventListener);
  }, []);

  function saveCart(updated: CartEntry[]) {
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("cartUpdated"));
    setCart(updated);
  }

  function inc(i: number) {
    const next = cart.slice();
    next[i].qty = (next[i].qty || 0) + 1;
    saveCart(next);
  }

  function dec(i: number) {
    const next = cart.slice();
    next[i].qty = (next[i].qty || 0) - 1;
    if ((next[i].qty || 0) <= 0) {
      next.splice(i, 1);
    }
    saveCart(next);
  }

  function removeAt(i: number) {
    const next = cart.slice();
    next.splice(i, 1);
    saveCart(next);
  }

  // Parse price strings to extract numeric value and currency (FCFA or EUR).
  function parsePrice(prix: string | number | undefined) {
    if (prix === undefined || prix === null)
      return { value: 0, currency: null as string | null };
    if (typeof prix === "number") return { value: prix, currency: "EUR" };
    const s = String(prix).trim();
    // detect FCFA
    if (/fcfa/i.test(s)) {
      const digits = s
        .replace(/[^0-9.,]/g, "")
        .replace(/,/g, ".")
        .replace(/\s+/g, "");
      const v = parseFloat(digits) || 0;
      return { value: v, currency: "FCFA" };
    }
    // detect euro symbol
    if (/€/i.test(s) || /eur/i.test(s)) {
      const digits = s
        .replace(/[^0-9.,-]/g, "")
        .replace(/,/g, ".")
        .replace(/\s+/g, "");
      const v = parseFloat(digits) || 0;
      return { value: v, currency: "EUR" };
    }
    // fallback: extract digits and assume FCFA if number is big (>1000), else EUR
    const digits = s
      .replace(/[^0-9.,-]/g, "")
      .replace(/,/g, ".")
      .replace(/\s+/g, "");
    const v = parseFloat(digits) || 0;
    if (v > 1000) return { value: v, currency: "FCFA" };
    return { value: v, currency: "EUR" };
  }

  // compute totals per currency
  const totals = cart.reduce((acc: Record<string, number>, p) => {
    const price = parsePrice(p.prix);
    const qty = p.qty || 0;
    if (!price.currency) return acc;
    acc[price.currency] = (acc[price.currency] || 0) + price.value * qty;
    return acc;
  }, {});

  function formatNumber(n: number) {
    return new Intl.NumberFormat("fr-FR").format(Math.round(n));
  }

  function handleValidate() {
    if (cart.length === 0) return;
    setShowModal(true);
  }

  function handleConfirmOrder() {
    if (!phone.trim() || !address.trim()) {
      alert(
        "Veuillez remplir le numéro de téléphone et l'adresse de livraison."
      );
      return;
    }
    // in a real app we'd send the order to the backend. Here we clear the cart and notify
    localStorage.removeItem("cart");
    window.dispatchEvent(new CustomEvent("cartUpdated"));
    setCart([]);
    setShowModal(false);
    setPhone("");
    setAddress("");
    setPaymentMethod("wave");
    window.alert("Commande validée — merci !");
  }

  function handleCancelOrder() {
    setShowModal(false);
    setPhone("");
    setAddress("");
    setPaymentMethod("wave");
  }

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Panier</h1>

        {cart.length === 0 ? (
          <div className="text-gray-600">Votre panier est vide.</div>
        ) : (
          <div className="space-y-4">
            {cart.map((p, i) => (
              <div
                key={`${p.id}-${i}`}
                className="flex items-center gap-4 border p-3 rounded"
              >
                {p.img ? (
                  // img is expected to be a public path like '/Robe/1.jpg'
                  <img
                    src={p.img}
                    alt={p.titre}
                    className="w-20 h-20 object-cover rounded"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-100 flex items-center justify-center">
                    Image
                  </div>
                )}

                <div className="flex-1">
                  <div className="font-medium">{p.titre}</div>
                  <div className="text-sm text-gray-600">
                    {typeof p.prix === "number" ? `${p.prix} €` : p.prix}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <button className="px-2 py-1 border" onClick={() => dec(i)}>
                      -
                    </button>
                    <div className="px-3">{p.qty ?? 0}</div>
                    <button className="px-2 py-1 border" onClick={() => inc(i)}>
                      +
                    </button>
                    <button
                      className="ml-4 text-sm text-red-600"
                      onClick={() => removeAt(i)}
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-right font-semibold">
              {Object.keys(totals).length === 0 ? (
                <div>Aucun total disponible</div>
              ) : (
                <div className="space-y-1">
                  {Object.entries(totals).map(([cur, val]) => (
                    <div key={cur}>
                      {cur}:{" "}
                      {cur === "FCFA"
                        ? formatNumber(val) + " FCFA"
                        : formatNumber(val) + " "}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={handleValidate}
                disabled={cart.length === 0}
                className={`px-4 py-2 rounded text-white ${
                  cart.length === 0
                    ? "bg-gray-400"
                    : "bg-[#8B5E3C] hover:bg-[#7a5135]"
                }`}
              >
                Valider la commande
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de validation de commande */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Valider la commande</h2>

            {/* Liste des produits */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Produits :</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {cart.map((p, i) => (
                  <div
                    key={`${p.id}-${i}`}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {p.titre} (x{p.qty})
                    </span>
                    <span>
                      {typeof p.prix === "number" ? `${p.prix} €` : p.prix}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Montants totaux */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Total :</h3>
              <div className="space-y-1">
                {Object.entries(totals).map(([cur, val]) => (
                  <div key={cur} className="font-semibold">
                    {cur}:{" "}
                    {cur === "FCFA"
                      ? formatNumber(val) + " FCFA"
                      : formatNumber(val) + " "}
                  </div>
                ))}
              </div>
            </div>

            {/* Méthodes de paiement */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Méthode de paiement :</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="wave"
                    checked={paymentMethod === "wave"}
                    onChange={(e) => setPaymentMethod(e.target.value as "wave")}
                    className="mr-2"
                  />
                  Wave
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="orange"
                    checked={paymentMethod === "orange"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value as "orange")
                    }
                    className="mr-2"
                  />
                  Orange Money
                </label>
              </div>
            </div>

            {/* Numéro de téléphone */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Numéro de téléphone :
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Entrez votre numéro"
              />
            </div>

            {/* Adresse de livraison */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">
                Adresse de livraison :
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border p-2 rounded"
                rows={3}
                placeholder="Entrez votre adresse"
              />
            </div>

            {/* Boutons */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmOrder}
                className="px-4 py-2 bg-[#8B5E3C] text-white rounded hover:bg-[#7a5135]"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
