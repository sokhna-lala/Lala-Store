import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://backend-api-f3oa.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface Order {
  id?: string;
  user: string;
  items: Array<{
    id?: string | number;
    titre?: string;
    prix?: string | number;
    qty?: number;
  }>;
  total: string;
  status: string;
  date: string;
  paymentMethod: string;
  phone: string;
  address: string;
}

interface Product {
  id?: string;
  titre: string;
  prix: string;
  category: string;
  img: string;
  description?: string;
}

// Users API
export const userApi = {
  getUsers: () => api.get<User[]>("/users"),
  createUser: (user: User) => api.post("/users", user),
  updateUser: (id: string, user: Partial<User>) =>
    api.put(`/users/${id}`, user),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
};

// Orders API
export const orderApi = {
  getOrders: () => api.get<Order[]>("/orders"),
  createOrder: (order: Order) => api.post("/orders", order),
  updateOrder: (id: string, order: Partial<Order>) =>
    api.put(`/orders/${id}`, order),
  deleteOrder: (id: string) => api.delete(`/orders/${id}`),
};

// Products API
export const productApi = {
  getProducts: () => api.get<Product[]>("/products"),
  createProduct: (product: Product) => api.post("/products", product),
  updateProduct: (id: string, product: Partial<Product>) =>
    api.put(`/products/${id}`, product),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
};

export default api;
