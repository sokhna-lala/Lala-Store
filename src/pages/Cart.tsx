import { useCartStore } from "../store/cartStore";
import Layout from "../components/Layout";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCartStore();

  const total = getTotal();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-amber-950 mb-8">Votre Panier</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-amber-700 text-lg">Votre panier est vide</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
                  <img
                    src={item.img}
                    alt={item.titre}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-amber-950">{item.titre}</h3>
                    <p className="text-amber-700">{item.prix}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 bg-amber-100 text-amber-900 rounded hover:bg-amber-200"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-amber-50 text-amber-900 rounded">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-amber-100 text-amber-900 rounded hover:bg-amber-200"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-amber-950">Total:</span>
                <span className="text-xl font-bold text-amber-950">{total.toLocaleString()} FCFA</span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Vider le panier
                </button>
                <button className="px-6 py-3 bg-amber-600 text-white rounded hover:bg-amber-700">
                  Commander
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
