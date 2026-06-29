import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

import {
  getOrders,
  getOrderDetails,
  trackOrder,
} from "../services/orderService";

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [tracking, setTracking] = useState({});
  const [loading, setLoading] = useState(false);

  const loadOrders = useCallback(async (force = false) => {
    if (!force && ordersLoaded) return orders;

    try {
      setLoading(true);

      const data = await getOrders();
      const nextOrders = data.orders || [];

      setOrders(nextOrders);
      setOrdersLoaded(true);

      return nextOrders;
    } catch (err) {
      console.log(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [orders, ordersLoaded]);

  const loadOrderDetails = useCallback(async (orderId, force = false) => {
    if (!orderId) return null;
    if (!force && orderDetails[orderId]) return orderDetails[orderId];

    try {
      setLoading(true);

      const data = await getOrderDetails(orderId);

      setOrderDetails((prev) => ({
        ...prev,
        [orderId]: data.order,
      }));

      return data.order;
    } finally {
      setLoading(false);
    }
  }, [orderDetails]);

  const loadTracking = useCallback(async (orderId, force = false) => {
    if (!orderId) return null;
    if (!force && tracking[orderId]) return tracking[orderId];

    try {
      setLoading(true);

      const data = await trackOrder(orderId);

      setTracking((prev) => ({
        ...prev,
        [orderId]: data.tracking,
      }));

      return data.tracking;
    } finally {
      setLoading(false);
    }
  }, [tracking]);

  const clearOrderCache = useCallback(() => {
    setOrders([]);
    setOrdersLoaded(false);
    setOrderDetails({});
    setTracking({});
  }, []);

  return (
    <OrderContext.Provider
      value={{
        loading,
        orders,
        orderDetails,
        tracking,
        loadOrders,
        loadOrderDetails,
        loadTracking,
        setOrders,
        clearOrderCache,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}