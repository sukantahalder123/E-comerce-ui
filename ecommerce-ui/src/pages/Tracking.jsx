import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaHome,
  FaPhone,
  FaFileInvoice,
  FaHeadset,
  FaMapMarkerAlt,
  FaClipboardList,
} from "react-icons/fa";

import { useOrders } from "../context/OrderContext";
import "./Tracking.css";

const PLACEHOLDER = "https://via.placeholder.com/120x120?text=Product";

const icons = {
  placed: <FaCheckCircle />,
  confirmed: <FaCheckCircle />,
  packed: <FaBox />,
  shipped: <FaTruck />,
  delivered: <FaHome />,
};

export default function Tracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const {
    loading,
    orderDetails,
    tracking,
    loadOrderDetails,
    loadTracking,
  } = useOrders();

  const order = orderDetails?.[orderId];
  const currentTracking = tracking?.[orderId];

  useEffect(() => {
    if (!orderId) return;

    loadOrderDetails(orderId);
    loadTracking(orderId);
  }, [orderId, loadOrderDetails, loadTracking]);

  const formatDate = (date) => {
    if (!date) return "Pending";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading && !order && !currentTracking) {
    return (
      <div className="tracking-container">
        <div className="tracking-hero">
          <div>
            <span className="tracking-kicker">Order Tracking</span>
            <h1>Loading your order...</h1>
            <p>Please wait while we fetch your tracking details.</p>
          </div>

          <div className="tracking-actions">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <FaArrowLeft />
              Back
            </button>

            <button className="home-btn" onClick={() => navigate("/", { replace: true })}>
              <FaHome />
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const address = order?.shipping_address || {};
  const items = order?.items || [];
  const steps = currentTracking?.steps || [];

  return (
    <div className="tracking-container">
      <div className="tracking-hero">
        <div>
          <span className="tracking-kicker">Order Tracking</span>
          <h1>Track Your Order</h1>
          <p>Order ID : {orderId}</p>
        </div>

        <div className="tracking-actions">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft />
            Back
          </button>

          <button className="home-btn" onClick={() => navigate("/", { replace: true })}>
            <FaHome />
            Home
          </button>
        </div>
      </div>

      <div className="tracking-summary">
        <div>
          <FaClipboardList />
          <span>Status</span>
          <strong>{order?.order_status || "Processing"}</strong>
        </div>

        <div>
          <FaTruck />
          <span>Delivery</span>
          <strong>{currentTracking?.estimated_delivery || "In progress"}</strong>
        </div>

        <div>
          <FaCheckCircle />
          <span>Payment</span>
          <strong>{order?.payment_method || "Confirmed"}</strong>
        </div>
      </div>

      <div className="tracking-grid">
        <div>
          <div className="tracking-card">
            <div className="card-title">
              <h2>Delivery Status</h2>
              <span>{steps.length} steps</span>
            </div>

            <div className="timeline">
              {steps.map((step) => (
                <div
                  className={step.completed ? "step active" : "step pending"}
                  key={step.key}
                >
                  <div className="step-icon">
                    {icons[step.key] || <FaCheckCircle />}
                  </div>

                  <div className="step-content">
                    <h3>{step.label}</h3>
                    <p>
                      {step.completed
                        ? formatDate(
                            step.date ||
                              step.completed_at ||
                              currentTracking?.created_at
                          )
                        : "Pending"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tracking-card">
            <div className="card-title">
              <h2>Delivery Address</h2>
            </div>

            <div className="address-box">
              <FaMapMarkerAlt />
              <p>
                {address.address_line1 || "Address not available"}
                {address.city ? `, ${address.city}` : ""}
                {address.state ? `, ${address.state}` : ""}
                {address.pincode ? ` - ${address.pincode}` : ""}
              </p>
            </div>
          </div>

          <div className="tracking-card">
            <div className="card-title">
              <h2>Customer Support</h2>
            </div>

            <div className="support-actions">
              <button className="support-btn">
                <FaPhone />
                Call Delivery Partner
              </button>

              <button className="invoice-btn">
                <FaFileInvoice />
                Download Invoice
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="tracking-card partner-card">
            <h2>Delivery Partner</h2>

            <img
              className="delivery-boy"
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="Delivery partner"
            />

            <h3>Rahul Sharma</h3>
            <p>Delivery Executive</p>

            <button className="support-btn">
              <FaHeadset />
              Contact
            </button>
          </div>

          <div className="tracking-card">
            <div className="card-title">
              <h2>Ordered Products</h2>
              <span>{items.length} items</span>
            </div>

            {items.length === 0 ? (
              <p className="empty-text">No product details available.</p>
            ) : (
              items.map((item) => (
                <div className="product-box" key={item.order_item_id}>
                  <img
                    src={item.image_url || PLACEHOLDER}
                    alt={item.product_name}
                  />

                  <div>
                    <h3>{item.product_name}</h3>
                    <p>Quantity : {item.quantity}</p>
                    <h4>Rs. {Number(item.subtotal || 0).toFixed(2)}</h4>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}