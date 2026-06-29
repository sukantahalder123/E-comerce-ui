import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaRedo,
  FaMapMarkerAlt,
  FaHome,
  FaArrowLeft,
} from "react-icons/fa";

import { useOrders } from "../context/OrderContext";
import "./Orders.css";

const PLACEHOLDER = "https://via.placeholder.com/120x120?text=Order";

export default function Orders() {
  const navigate = useNavigate();

  const { orders, loading, loadOrders } = useOrders();

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatStatus = (status) => {
    if (!status) return "Placed";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading && orders.length === 0) {
    return (
      <div className="orders-container">
        <div className="orders-header">
          <div>
            <span className="orders-kicker">Order History</span>
            <h1>My Orders</h1>
            <p>Loading your orders...</p>
          </div>

          <div className="page-actions">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <FaArrowLeft />
              Back
            </button>

            <button className="home-btn" onClick={() => navigate("/")}>
              <FaHome />
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <div>
          <span className="orders-kicker">Order History</span>
          <h1>My Orders</h1>
          <p>Track, manage and reorder your purchases.</p>
        </div>

        <div className="page-actions">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft />
            Back
          </button>

          <button className="home-btn" onClick={() => navigate("/")}>
            <FaHome />
            Home
          </button>
        </div>
      </div>

      {orders.length === 0 && (
        <div className="order-card empty-order">
          <div className="order-details">
            <h2>No orders found</h2>
            <p>Your placed orders will appear here.</p>
          </div>
        </div>
      )}

      {orders.map((order) => {
        const isDelivered = order.order_status === "delivered";

        return (
          <div className="order-card" key={order.order_id}>
            <img src={order.image_url || PLACEHOLDER} alt="Order" />

            <div className="order-details">
              <h2>Order #{String(order.order_id).slice(0, 8)}</h2>

              <p>
                <strong>Order ID:</strong> {order.order_id}
              </p>

              <p>
                <strong>Date:</strong> {formatDate(order.created_at)}
              </p>

              <p>
                <strong>Payment:</strong> {order.payment_method}
              </p>

              <p>
                <strong>Items:</strong> {order.total_items}
              </p>

              <h3>Rs. {Number(order.total_amount || 0).toFixed(2)}</h3>

              <span className={isDelivered ? "status delivered" : "status shipped"}>
                {isDelivered ? <FaCheckCircle /> : <FaTruck />}
                {formatStatus(order.order_status)}
              </span>
            </div>

            <div className="order-actions">
              <button
                className="track-btn"
                onClick={() => navigate(`/tracking/${order.order_id}`)}
              >
                <FaMapMarkerAlt />
                Track Order
              </button>

              <button className="buy-btn">
                <FaRedo />
                Buy Again
              </button>

              <button className="cancel-btn">
                <FaClock />
                Cancel
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}