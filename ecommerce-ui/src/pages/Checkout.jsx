import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaHome,
  FaMapMarkerAlt,
  FaUser,
  FaTag,
  FaTruck,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { addCheckoutAddress } from "../services/checkoutService";
import "./Checkout.css";

const PLACEHOLDER = "https://via.placeholder.com/80x80?text=Product";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [coupon, setCoupon] = useState("");
  const [delivery, setDelivery] = useState("standard");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const shipping = delivery === "express" ? 99 : 0;
  const discount = coupon === "SAVE100" ? 100 : 0;
  const total = subtotal + shipping - discount;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const continuePayment = async () => {
    if (
      !form.name ||
      !form.mobile ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const data = await addCheckoutAddress({
        full_name: form.name.trim(),
        mobile: form.mobile.trim().replace(/\D/g, "").slice(-10),
        address_line1: form.address.trim(),
        address_line2: "",
        city: form.city.trim(),
        state: form.state.trim(),
        country: "India",
        pincode: form.pincode.trim().replace(/\D/g, ""),
        landmark: "",
        is_default: true,
      });

      localStorage.setItem("checkout_address_id", data.address.id);

      navigate("/payment", {
        state: {
          address_id: data.address.id,
        },
      });
    } catch (err) {
      console.log("Address error:", err.response?.data || err.message);

      alert(
        err.response?.data?.message ||
          JSON.stringify(err.response?.data?.errors) ||
          "Address save failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div>
          <span className="checkout-kicker">Secure Checkout</span>
          <h1>Checkout</h1>
          <p>Complete your delivery details and review your order.</p>
        </div>

        <div className="checkout-actions">
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

      <div className="checkout-container">
        <div className="checkout-left">
          <div className="checkout-card">
            <h2>
              <FaUser />
              Customer Information
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="checkout-card">
            <h2>
              <FaMapMarkerAlt />
              Shipping Address
            </h2>

            <textarea
              rows="4"
              placeholder="House No, Street, Area..."
              name="address"
              value={form.address}
              onChange={handleChange}
            />

            <div className="grid2">
              <input
                type="text"
                placeholder="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="State"
                name="state"
                value={form.state}
                onChange={handleChange}
              />
            </div>

            <input
              type="text"
              placeholder="PIN Code"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>

          <div className="checkout-card">
            <h2>
              <FaTruck />
              Delivery Option
            </h2>

            <label
              className={
                delivery === "standard"
                  ? "delivery-option selected"
                  : "delivery-option"
              }
            >
              <input
                type="radio"
                checked={delivery === "standard"}
                onChange={() => setDelivery("standard")}
              />

              <span>
                <strong>Standard Delivery</strong>
                <small>Delivered in 2-4 days</small>
              </span>

              <b>FREE</b>
            </label>

            <label
              className={
                delivery === "express"
                  ? "delivery-option selected"
                  : "delivery-option"
              }
            >
              <input
                type="radio"
                checked={delivery === "express"}
                onChange={() => setDelivery("express")}
              />

              <span>
                <strong>Express Delivery</strong>
                <small>Priority delivery within 24 hours</small>
              </span>

              <b>Rs. 99</b>
            </label>
          </div>
        </div>

        <div className="checkout-right">
          <div className="summary-card">
            <h2>Order Summary</h2>

            {cart.length === 0 ? (
              <div className="empty-cart-summary">
                <p>Your cart is empty.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div className="summary-product" key={item.cart_id || item.product_id}>
                  <img
                    src={item.image_url || PLACEHOLDER}
                    alt={item.product_name}
                  />

                  <div>
                    <h4>{item.product_name}</h4>
                    <p>Qty : {item.quantity}</p>
                  </div>

                  <strong>
                    Rs. {(Number(item.price) * Number(item.quantity)).toFixed(2)}
                  </strong>
                </div>
              ))
            )}

            <div className="coupon-box">
              <FaTag />

              <input
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
              />
            </div>

            <div className="price-row">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>

            <div className="price-row">
              <span>Delivery</span>
              <span>{shipping === 0 ? "FREE" : `Rs. ${shipping}`}</span>
            </div>

            <div className="price-row">
              <span>Discount</span>
              <span>- Rs. {discount}</span>
            </div>

            <hr />

            <div className="total-row">
              <span>Total</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>

            <button
              className="payment-btn"
              onClick={continuePayment}
              disabled={loading}
            >
              {loading ? "Saving Address..." : "Continue To Payment"}
            </button>

            <div className="secure">
              <FaLock />
              Secure Checkout
              <FaCheckCircle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}