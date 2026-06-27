import { Link } from "react-router-dom";
import {
  FaTrash,
  FaHeart,
  FaMinus,
  FaPlus,
  FaTag,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";

import "./Cart.css";

const PLACEHOLDER =
  "https://via.placeholder.com/150x150?text=No+Image";

export default function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useCart();

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.qty,
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;

  const discount = subtotal > 2000 ? 150 : 0;

  const total = subtotal + shipping - discount;

  if (cart.length === 0) {
    return (
      <div className="empty-cart">

        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt=""
        />

        <h1>Your Cart is Empty</h1>

        <p>
          Looks like you haven't added anything yet.
        </p>

        <Link to="/">
          <button>
            Continue Shopping
          </button>
        </Link>

      </div>
    );
  }

  return (
    <div className="cart-container">

      {/* LEFT */}

      <div className="cart-left">

        <h1>

          Shopping Cart

        </h1>

        <p>

          {cart.length} Items

        </p>

        {cart.map((item) => (

  <div
    className="cart-card"
    key={item.id}
  >

    {/* Product Image */}

    <div className="cart-image">

      <img
        src={
          item.image_url ||
          PLACEHOLDER
        }
        alt={item.product_name}
      />

      <span className="offer">
        20% OFF
      </span>

    </div>

    {/* Product Info */}

    <div className="cart-info">

      <h2>{item.product_name}</h2>

      <p>
        <strong>Brand :</strong> {item.brand}
      </p>

      <p>
        <strong>Category :</strong> {item.category}
      </p>

      <div className="rating">

        ⭐⭐⭐⭐⭐

        <span>(4.8)</span>

      </div>

      <span className="stock">

        <FaTruck />

        Free Delivery Available

      </span>

      <p className="delivery-date">

        Estimated Delivery :

        <strong> Tomorrow</strong>

      </p>

      <div className="qty">

        <button
          onClick={() =>
            decreaseQty(item.id)
          }
        >

          <FaMinus />

        </button>

        <span>

          {item.qty}

        </span>

        <button
          onClick={() =>
            increaseQty(item.id)
          }
        >

          <FaPlus />

        </button>

      </div>

    </div>

    {/* Price */}

    <div className="price-box">

      <small className="old-price">

        ₹
        {(Number(item.price) * 1.2).toFixed(2)}

      </small>

      <h2>

        ₹
        {(Number(item.price) * item.qty).toFixed(2)}

      </h2>

      <button className="wishlist">

        <FaHeart />

      </button>

      <button className="save-btn">

        Save For Later

      </button>

      <button
        className="delete"
        onClick={() =>
          removeFromCart(item.id)
        }
      >

        <FaTrash />

      </button>

    </div>

  </div>

))}

      </div>

      {/* RIGHT */}

      <div className="cart-right">

        <div className="summary">

          <h2>

            Order Summary

          </h2>

          <div className="coupon">

            <FaTag />

            <input
              placeholder="Coupon Code"
            />

            <button>

              Apply

            </button>

          </div>

          <div className="row">

            <span>

              Subtotal

            </span>

            <span>

              ₹
              {subtotal.toFixed(2)}

            </span>

          </div>

          <div className="row">

            <span>

              Shipping

            </span>

            <span>

              {shipping === 0
                ? "FREE"
                : `₹ ${shipping}`}

            </span>

          </div>

          <div className="row">

            <span>

              Discount

            </span>

            <span>

              - ₹
              {discount}

            </span>

          </div>

          <hr />

          <div className="total">

            <span>

              Total

            </span>

            <span>

              ₹
              {total.toFixed(2)}

            </span>

          </div>

          <div className="secure">

            <FaShieldAlt />

            Secure Checkout

          </div>

          <Link to="/checkout">

            <button
              className="checkout-btn"
            >

              Proceed To Checkout

            </button>

          </Link>

          <Link to="/">

            <button
              className="continue-btn"
            >

              Continue Shopping

            </button>

          </Link>

        </div>

      </div>

    </div>
  );
}