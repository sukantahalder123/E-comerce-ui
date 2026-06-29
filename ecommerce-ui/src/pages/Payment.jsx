import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaCreditCard,
  FaMobileAlt,
  FaLock,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/checkoutService";
import "./Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cart, clearCart } = useCart();

  const addressId =
    location.state?.address_id || localStorage.getItem("checkout_address_id");

  const [method, setMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const [card, setCard] = useState({
    cardNumber: "",
    holder: "",
    expiry: "",
    cvv: "",
    upi: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const handleChange = (e) => {
    setCard({
      ...card,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (!addressId) {
      alert("Please add address first.");
      navigate("/checkout");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    if (
      method === "CARD" &&
      (!card.cardNumber || !card.holder || !card.expiry || !card.cvv)
    ) {
      alert("Please enter card details");
      return;
    }

    if (method === "UPI" && !card.upi) {
      alert("Please enter UPI ID");
      return;
    }

    try {
      setLoading(true);

      console.log("PLACE ORDER BODY:", {
        address_id: addressId,
        payment_method: method,
      });

      const data = await placeOrder({
        address_id: addressId,
        payment_method: method,
      });

      console.log("ORDER RESPONSE:", data);

      // Remove temporary checkout data
      localStorage.removeItem("checkout_address_id");

      // Clear cart immediately
      clearCart();

      // Small success message
      alert("🎉 Order placed successfully!");

      // Redirect to Home after 1.5 seconds
      setTimeout(() => {
        navigate("/", {
          replace: true,
          state: {
            orderPlaced: true,
            order_id: data.order?.order_id,
          },
        });
      }, 1500);
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("BACKEND ERROR:", err.response?.data);

      alert(
        err.response?.data?.error ||
        err.response?.data?.message ||
        JSON.stringify(err.response?.data) ||
        "Order failed"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="payment-container">
      <div className="payment-left">
        <h1>Secure Payment</h1>

        <div className="payment-method">
          <label>
            <input
              type="radio"
              checked={method === "COD"}
              onChange={() => setMethod("COD")}
            />
            <FaMoneyBillWave />
            Cash On Delivery
          </label>

          <label>
            <input
              type="radio"
              checked={method === "UPI"}
              onChange={() => setMethod("UPI")}
            />
            <FaMobileAlt />
            UPI
          </label>

          <label>
            <input
              type="radio"
              checked={method === "CARD"}
              onChange={() => setMethod("CARD")}
            />
            <FaCreditCard />
            Credit / Debit Card
          </label>
        </div>

        {method === "UPI" && (
          <div className="card-form">
            <input
              type="text"
              placeholder="Enter UPI ID"
              name="upi"
              value={card.upi}
              onChange={handleChange}
            />
          </div>
        )}

        {method === "CARD" && (
          <>
            <div className="card-preview">
              <h2>SHOPZONE BANK</h2>

              <h3>{card.cardNumber || "XXXX XXXX XXXX XXXX"}</h3>

              <div className="bottom">
                <span>{card.holder || "CARD HOLDER"}</span>
                <span>{card.expiry || "MM/YY"}</span>
              </div>
            </div>

            <div className="card-form">
              <input
                type="text"
                placeholder="Card Number"
                name="cardNumber"
                value={card.cardNumber}
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Card Holder Name"
                name="holder"
                value={card.holder}
                onChange={handleChange}
              />

              <div className="grid2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  name="expiry"
                  value={card.expiry}
                  onChange={handleChange}
                />

                <input
                  type="password"
                  placeholder="CVV"
                  name="cvv"
                  value={card.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="payment-right">
        <div className="summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="summary-item" key={item.cart_id || item.product_id}>
              <span>
                {item.product_name} × {item.quantity}
              </span>

              <strong>
                ₹ {(Number(item.price) * Number(item.quantity)).toFixed(2)}
              </strong>
            </div>
          ))}

          <hr />

          <div className="total">
            <span>Total</span>
            <strong>₹ {total.toFixed(2)}</strong>
          </div>

          <button className="pay-btn" onClick={handlePayment} disabled={loading}>
            <FaLock />
            {loading ? "Placing Order..." : "Pay Securely"}
          </button>

          <div className="cards">
            <FaCcVisa />
            <FaCcMastercard />
            <FaMobileAlt />
          </div>
        </div>
      </div>
    </div>
  );
}