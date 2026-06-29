import api from "./api";

export const addCheckoutAddress = async (addressData) => {
  const response = await api.post("/checkout?action=add-address", addressData);
  return response.data;
};

export const getCheckoutAddresses = async () => {
  const response = await api.get("/checkout?action=addresses");
  return response.data;
};

export const getCheckoutSummary = async () => {
  const response = await api.get("/checkout?action=summary");
  return response.data;
};

export const placeOrder = async (orderData) => {
  const response = await api.post("/checkout?action=place-order", orderData);
  return response.data;
};