import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { orderApi } from "../services/api";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  X,
  CreditCard,
  MapPin,
  Phone,
} from "lucide-react";

type CartEntry = {
  id?: string | number;
  titre?: string;
  prix?: string | number;
  qty?: number;
  img?: string;
};

export default function Panier() {
  const { user } = useAuth();
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

  function parsePrice(prix: string | number | undefined) {
    if (prix === undefined || prix === null)
      return { value: 0, currency: null as string | null };
    if (typeof prix === "number") return { value: prix, currency: "EUR" };
    const s = String(prix).trim();
    if (/fcfa/i.test(s)) {
      const digits = s
        .replace(/[^0-9.,]/g, "")
        .replace(/,/g, ".")
        .replace(/\s+/g, "");
      const v = parseFloat(digits) || 0;
      return { value: v, currency: "FCFA" };
    }
    if (/€/i.test(s) || /eur/i.test(s)) {
      const digits = s
        .replace(/[^0-9.,-]/g, "")
        .replace(/,/g, ".")
        .replace(/\s+/g, "");
      const v = parseFloat(digits) || 0;
      return { value: v, currency: "EUR" };
    }
    const digits = s
      .replace(/[^0-9.,-]/g, "")
      .replace(/,/g, ".")
      .replace(/\s+/g, "");
    const v = parseFloat(digits) || 0;
    if (v > 1000) return { value: v, currency: "FCFA" };
    return { value: v, currency: "EUR" };
  }

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

  async function handleConfirmOrder() {
    if (!phone.trim() || !address.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Champs requis",
        text: "Veuillez remplir le numéro de téléphone et l'adresse de livraison.",
      });
      return;
    }

    const order = {
      user: user?.email || "guest@example.com",
      items: cart.map((item) => ({
        id: item.id,
        titre: item.titre,
        prix: item.prix,
        qty: item.qty,
      })),
      total: Object.entries(totals)
        .map(([cur, val]) => `${formatNumber(val)} ${cur}`)
        .join(" + "),
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      paymentMethod,
      phone,
      address,
    };

    try {
      await orderApi.createOrder(order);

      localStorage.removeItem("cart");
      window.dispatchEvent(new CustomEvent("cartUpdated"));
      setCart([]);
      setShowModal(false);
      setPhone("");
      setAddress("");
      setPaymentMethod("wave");
      Swal.fire({
        icon: "success",
        title: "Commande validée",
        text: "Merci pour votre commande, nous vous contacterons pour la livraison!",
      });
    } catch (error) {
      console.error("Error creating order:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la création de la commande. Veuillez réessayer.",
      });
    }
  }

  function handleCancelOrder() {
    setShowModal(false);
    setPhone("");
    setAddress("");
    setPaymentMethod("wave");
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
              {cart.length > 0 && (
                <span className="ml-auto bg-blue-100 text-blue-600 px-4 py-1 rounded-full font-semibold">
                  {cart.length} article{cart.length > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                Votre panier est vide
              </h2>
              <p className="text-gray-500">
                Découvrez nos produits et ajoutez-les à votre panier
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((p, i) => (
                  <div
                    key={`${p.id}-${i}`}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
                  >
                    <div className="flex gap-4">
                      {p.img ? (
                        <img
                          src={p.img}
                          alt={p.titre}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400 text-xs">Image</span>
                        </div>
                      )}

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">
                            {p.titre}
                          </h3>
                          <p className="text-blue-600 font-medium mt-1">
                            {typeof p.prix === "number"
                              ? `${p.prix} €`
                              : p.prix}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                            <button
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                              onClick={() => dec(i)}
                              aria-label="Diminuer la quantité"
                              title="Diminuer la quantité"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                              <span className="sr-only">
                                Diminuer la quantité
                              </span>
                            </button>
                            <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                              {p.qty ?? 0}
                            </span>
                            <button
                              className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                              onClick={() => inc(i)}
                              aria-label="Augmenter la quantité"
                              title="Augmenter la quantité"
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                              <span className="sr-only">
                                Augmenter la quantité
                              </span>
                            </button>
                          </div>

                          <button
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                            onClick={() => removeAt(i)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Retirer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Récapitulatif
                  </h2>

                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    {Object.entries(totals).map(([cur, val]) => (
                      <div
                        key={cur}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-600">Total {cur}:</span>
                        <span className="text-xl font-bold text-gray-900">
                          {formatNumber(val)} {cur}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleValidate}
                    disabled={cart.length === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Valider la commande
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                Finaliser la commande
              </h2>
              <button
                onClick={handleCancelOrder}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Products List */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                  Produits commandés
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {cart.map((p, i) => (
                    <div
                      key={`${p.id}-${i}`}
                      className="flex justify-between text-sm bg-white p-3 rounded-lg"
                    >
                      <span className="text-gray-700">
                        {p.titre}{" "}
                        <span className="text-gray-500">× {p.qty}</span>
                      </span>
                      <span className="font-medium text-gray-900">
                        {typeof p.prix === "number" ? `${p.prix} €` : p.prix}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Total à payer
                </h3>
                <div className="space-y-2">
                  {Object.entries(totals).map(([cur, val]) => (
                    <div
                      key={cur}
                      className="flex justify-between items-center"
                    >
                      <span className="text-gray-700">{cur}:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatNumber(val)} {cur}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Méthode de paiement
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      value="wave"
                      checked={paymentMethod === "wave"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as "wave")
                      }
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 font-medium text-gray-900">Wave</span>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      value="orange"
                      checked={paymentMethod === "orange"}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as "orange")
                      }
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 font-medium text-gray-900">
                      Orange Money
                    </span>
                  </label>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-600" />
                  Numéro de téléphone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Entrez votre numéro"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Adresse de livraison
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  rows={3}
                  placeholder="Entrez votre adresse complète"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex gap-3 rounded-b-2xl">
              <button
                onClick={handleCancelOrder}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Confirmer la commande
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
