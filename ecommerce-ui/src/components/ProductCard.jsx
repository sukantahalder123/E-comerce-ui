import { useState } from "react";
import "./ProductCard.css";
import { FaStar, FaShoppingCart, FaCheck } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const PLACEHOLDER =
  "https://via.placeholder.com/300x250?text=No+Image";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [added, setAdded] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();

    addToCart(product);

    setAnimate(true);
    setAdded(true);

    setTimeout(() => {
      setAnimate(false);
    }, 250);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-image">
        <img
          src={product.image_url || PLACEHOLDER}
          alt={product.product_name}
        />
        <span className="discount">20% OFF</span>
      </div>

      <div className="product-info">
        <h3>{product.product_name}</h3>

        <p>{product.brand}</p>

        <div className="rating">
          <FaStar color="#FFC107" />
          <FaStar color="#FFC107" />
          <FaStar color="#FFC107" />
          <FaStar color="#FFC107" />
          <FaStar color="#FFC107" />
        </div>

        <h2>₹ {product.price}</h2>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`cart-btn ${animate ? "clicked" : ""} ${
            added ? "added" : ""
          }`}
        >
          {added ? <FaCheck /> : <FaShoppingCart />}
          {added ? " Added" : " Add To Cart"}
        </button>
      </div>
    </div>
  );
}