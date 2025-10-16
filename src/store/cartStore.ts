import { create } from 'zustand';

interface Product {
  id: number;
  img: string;
  titre: string;
  prix: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    } else {
      return {
        cart: [...state.cart, { ...product, quantity: 1 }]
      };
    }
  }),

  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter(item => item.id !== id)
  })),

  updateQuantity: (id, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, quantity) }
        : item
    ).filter(item => item.quantity > 0)
  })),

  clearCart: () => set({ cart: [] }),

  getTotal: () => {
    const cart = get().cart;
    return cart.reduce((total, item) => {
      const price = parseFloat(item.prix.replace(/[^\d]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  }
}));
