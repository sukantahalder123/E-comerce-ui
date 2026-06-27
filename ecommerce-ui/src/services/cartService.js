import axios from "axios";

const API = axios.create({
  baseURL: "https://e-com-backend-gules-six.vercel.app/cart/addCart", // Apna backend URL yahan change karo
});

// Automatically token send karega
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ==========================
// Get Cart
// ==========================
export const getCart = async () => {
  return await API.get("/cart");
};

// ==========================
// Add To Cart
// ==========================
export const addToCart = async (data) => {
  return await API.post("/cart", data);
};

// ==========================
// Update Quantity
// ==========================
export const updateCart = async (cartId, quantity) => {
  return await API.put(`/cart/${cartId}`, {
    quantity,
  });
};

// ==========================
// Delete Cart Item
// ==========================
export const deleteCartItem = async (cartId) => {
  return await API.delete(`/cart/${cartId}`);
};

// ==========================
// Clear Cart (Optional)
// ==========================
export const clearCart = async () => {
  return await API.delete("/cart");
};