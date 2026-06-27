import { useNavigate } from "react-router-dom";
import {
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaRedo,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./Orders.css";

const orders = [
  {
    orderId: "ORD-102541",
    productName: "Fresh Strawberry",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400",
    price: 599,
    qty: 2,
    date: "27 June 2026",
    payment: "UPI",
    status: "Delivered",
  },
  {
    orderId: "ORD-102542",
    productName: "Fresh Apple",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
    price: 900,
    qty: 1,
    date: "28 June 2026",
    payment: "Cash On Delivery",
    status: "Shipped",
  },
];

export default function Orders() {
  const navigate = useNavigate();

  return (
    <div className="orders-container">

      <div className="orders-header">

        <h1>My Orders</h1>

        <p>
          Track, manage and reorder your purchases.
        </p>

      </div>

      {orders.map((order) => (

        <div className="order-card" key={order.orderId}>

          <img
            src={order.image}
            alt={order.productName}
          />

          <div className="order-details">

            <h2>{order.productName}</h2>

            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>

            <p>
              <strong>Date:</strong> {order.date}
            </p>

            <p>
              <strong>Payment:</strong> {order.payment}
            </p>

            <p>
              <strong>Quantity:</strong> {order.qty}
            </p>

            <h3>
              ₹ {(order.price * order.qty).toFixed(2)}
            </h3>

            <span
              className={
                order.status === "Delivered"
                  ? "status delivered"
                  : "status shipped"
              }
            >
              {order.status === "Delivered" ? (
                <FaCheckCircle />
              ) : (
                <FaTruck />
              )}

              {order.status}
            </span>

          </div>

          <div className="order-actions">

            <button
              className="track-btn"
              onClick={() =>
                navigate(`/tracking/${order.orderId}`)
              }
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

      ))}

    </div>
  );
}