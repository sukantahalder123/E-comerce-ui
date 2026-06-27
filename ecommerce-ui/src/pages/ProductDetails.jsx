import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaShoppingCart,
  FaBolt,
  FaHeart,
  FaStar,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaMinus,
  FaPlus,
  FaShareAlt,
  FaCheckCircle,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

import "./ProductDetails.css";

const PLACEHOLDER =
  "https://via.placeholder.com/700x700?text=No+Image";

export default function ProductDetails() {
  const { productId } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [products, setProducts] = useState([]);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [qty, setQty] = useState(1);

  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    loadProduct();
    loadProducts();
  }, [productId]);

  async function loadProduct() {
    try {
      const res = await axios.get(
        `https://e-com-backend-gules-six.vercel.app/products/getProductview?id=${productId}`
      );

      const item =
        res.data.product ||
        res.data.data ||
        res.data;

      setProduct(item);

      setActiveImage(item.image_url || PLACEHOLDER);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadProducts() {
    try {
      const res = await axios.get(
        "https://e-com-backend-gules-six.vercel.app/products/getAllproduct"
      );

      const list = res.data.products || [];

      setProducts(list);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!product) return;

    const related = products.filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    );

    setRelatedProducts(related.slice(0, 8));
  }, [product, products]);

  const increaseQty = () => {
    setQty((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const handleAddCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }

    alert("Product added to cart successfully.");
  };

  const handleBuyNow = () => {
    handleAddCart();

    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="loading-page">
        <h2>Loading Product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="loading-page">
        <h2>Product Not Found</h2>
      </div>
    );
  }
  return (
  <div className="product-page">

    {/* Breadcrumb */}

    <div className="breadcrumb">

      Home / {product.category} / <span>{product.product_name}</span>

    </div>

    <div className="product-wrapper">

      {/* LEFT */}

      <div className="product-gallery">

        <div className="thumbnail-wrapper">

          <img
            src={activeImage || PLACEHOLDER}
            alt=""
            className="thumbnail active"
            onClick={() =>
              setActiveImage(activeImage)
            }
          />

        </div>

        <div className="main-image-box">

          <img
            src={activeImage || PLACEHOLDER}
            alt={product.product_name}
            className="main-image"
          />

        </div>

      </div>

      {/* RIGHT */}

      <div className="product-content">

        <span className="category-tag">

          {product.category}

        </span>

        <h1 className="product-title">

          {product.product_name}

        </h1>

        <p className="brand-name">

          Brand :
          <strong> {product.brand}</strong>

        </p>

        {/* Rating */}

        <div className="rating-box">

          <FaStar />

          <FaStar />

          <FaStar />

          <FaStar />

          <FaStar />

          <span>

            4.9 (124 Reviews)

          </span>

        </div>

        {/* Price */}

        <div className="price-section">

          <span className="discount-price">

            ₹ {product.price}

          </span>

          <span className="actual-price">

            ₹ {(Number(product.price) * 1.25).toFixed(2)}

          </span>

          <span className="offer">

            20% OFF

          </span>

        </div>

        {/* Stock */}

        <div className="stock-box">

          {product.is_stock_out ? (

            <span className="stock-out">

              ❌ Out Of Stock

            </span>

          ) : (

            <span className="stock-in">

              <FaCheckCircle />

              In Stock

            </span>

          )}

        </div>

        {/* Quantity */}

        <div className="quantity-section">

          <h4>

            Quantity

          </h4>

          <div className="qty-box">

            <button
              onClick={decreaseQty}
            >

              <FaMinus />

            </button>

            <span>

              {qty}

            </span>

            <button
              onClick={increaseQty}
            >

              <FaPlus />

            </button>

          </div>

        </div>

        {/* Buttons */}

        <div className="button-group">

          <button
            className="cart-btn"
            onClick={handleAddCart}
          >

            <FaShoppingCart />

            Add To Cart

          </button>

          <button
            className="buy-btn"
            onClick={handleBuyNow}
          >

            <FaBolt />

            Buy Now

          </button>

          <button className="wish-btn">

            <FaHeart />

          </button>

          <button className="share-btn">

            <FaShareAlt />

          </button>

        </div>

        {/* Features */}

        <div className="feature-list">

          <div className="feature-card">

            <FaTruck />

            <div>

              <h4>

                Free Delivery

              </h4>

              <p>

                Delivery within 24 Hours

              </p>

            </div>

          </div>

          <div className="feature-card">

            <FaUndo />

            <div>

              <h4>

                Easy Returns

              </h4>

              <p>

                7 Days Return Policy

              </p>

            </div>

          </div>

          <div className="feature-card">

            <FaShieldAlt />

            <div>

              <h4>

                Secure Payment

              </h4>

              <p>

                100% Safe Transactions

              </p>

            </div>

          </div>

        </div>
                {/* Description */}

        <div className="description-box">

          <h2>Product Description</h2>

          <p>
            {product.description ||
              `Fresh premium quality ${product.product_name}. Carefully selected, hygienically packed and delivered directly from trusted suppliers. Perfect for daily use with guaranteed freshness.`}
          </p>

        </div>

        {/* Specifications */}

        <div className="specification-box">

          <h2>Specifications</h2>

          <table>

            <tbody>

              <tr>
                <td>Product Name</td>
                <td>{product.product_name}</td>
              </tr>

              <tr>
                <td>Brand</td>
                <td>{product.brand}</td>
              </tr>

              <tr>
                <td>Category</td>
                <td>{product.category}</td>
              </tr>

              <tr>
                <td>Price</td>
                <td>₹ {product.price}</td>
              </tr>

              <tr>
                <td>Stock</td>
                <td>
                  {product.stock_quantity || 0} Available
                </td>
              </tr>

              <tr>
                <td>Unit</td>
                <td>{product.unit_type}</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

    {/* Related Products */}

    <section className="related-products">

      <div className="related-header">

        <h2>Related Products</h2>

        <button
          className="view-all-btn"
          onClick={() => navigate("/")}
        >
          View All
        </button>

      </div>

      {relatedProducts.length === 0 ? (

        <div className="no-related">

          No Related Products Found

        </div>

      ) : (

        <div className="related-grid">

          {relatedProducts.map((item) => (

            <ProductCard
              key={item.id}
              product={item}
            />

          ))}

        </div>

      )}

    </section>

  </div>
);
}