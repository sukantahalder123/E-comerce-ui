import api from "./api";

export const getOrders = async () => {
  const response = await api.get("/orders?action=list");
  return response.data;
};

export const getOrderDetails = async (orderId) => {
  const response = await api.get(`/orders?action=details&order_id=${orderId}`);
  return response.data;
};

export const trackOrder = async (orderId) => {
  const response = await api.get(`/orders?action=track&order_id=${orderId}`);
  return response.data;
};