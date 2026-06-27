import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaTag,
  FaTruck,
  FaLock,
} from "react-icons/fa";

import "./Checkout.css";

const PLACEHOLDER =
  "https://via.placeholder.com/80x80?text=Product";

export default function Checkout() {
  const navigate = useNavigate();

  const { cart } = useCart();

  const [coupon, setCoupon] = useState("");

  const [delivery, setDelivery] = useState("standard");

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
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  const shipping =
    delivery === "express" ? 99 : 0;

  const discount =
    coupon === "SAVE100" ? 100 : 0;

  const total =
    subtotal + shipping - discount;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const continuePayment = () => {
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

    navigate("/payment");
  };

  return (
    <div className="checkout-container">

      {/* LEFT */}

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

          <label className="delivery-option">

            <input
              type="radio"
              checked={delivery === "standard"}
              onChange={() =>
                setDelivery("standard")
              }
            />

            Standard Delivery

            <span>FREE</span>

          </label>

          <label className="delivery-option">

            <input
              type="radio"
              checked={delivery === "express"}
              onChange={() =>
                setDelivery("express")
              }
            />

            Express Delivery

            <span>₹99</span>

          </label>

        </div>

      </div>

      {/* RIGHT */}

      <div className="checkout-right">

        <div className="summary-card">

          <h2>Order Summary</h2>

          {cart.map((item) => (

            <div
              className="summary-product"
              key={item.product_id}
            >

              <img
                src={
                  item.image_url ||
                  PLACEHOLDER
                }
                alt=""
              />

              <div>

                <h4>

                  {item.product_name}

                </h4>

                <p>

                  Qty : {item.qty}

                </p>

              </div>

              <strong>

                ₹
                {(
                  Number(item.price) *
                  item.qty
                ).toFixed(2)}

              </strong>

            </div>

          ))}

          <div className="coupon-box">

            <FaTag />

            <input
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) =>
                setCoupon(
                  e.target.value.toUpperCase()
                )
              }
            />

          </div>

          <div className="price-row">

            <span>Subtotal</span>

            <span>

              ₹ {subtotal.toFixed(2)}

            </span>

          </div>

          <div className="price-row">

            <span>Delivery</span>

            <span>

              {shipping === 0
                ? "FREE"
                : `₹ ${shipping}`}

            </span>

          </div>

          <div className="price-row">

            <span>Discount</span>

            <span>

              - ₹ {discount}

            </span>

          </div>

          <hr />

          <div className="total-row">

            <span>Total</span>

            <span>

              ₹ {total.toFixed(2)}

            </span>

          </div>

          <button
            className="payment-btn"
            onClick={continuePayment}
          >

            Continue To Payment

          </button>

          <div className="secure">

            <FaLock />

            Secure Checkout

          </div>

        </div>

      </div>

    </div>
  );
}