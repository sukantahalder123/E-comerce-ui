import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaArrowLeft,
  FaHome,
  FaHeart,
  FaStar,
  FaTruck,
  FaUndo,
  FaShieldAlt,
  FaMinus,
  FaPlus,
  FaShareAlt,
  FaCheckCircle,
  FaShoppingCart,
  FaBolt,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

import "./ProductDetails.css";

const PLACEHOLDER = "https://via.placeholder.com/700x700?text=No+Image";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { addToCart, loading: cartLoading } = useCart();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const productRes = await axios.get(
          `https://e-com-backend-gules-six.vercel.app/products?action=view&id=${productId}`
        );

        const item = productRes.data.product || productRes.data.data || {};

        setProduct(item);
        setActiveImage(item.image_url || PLACEHOLDER);

        const productsRes = await axios.get(
          "https://e-com-backend-gules-six.vercel.app/products?action=list"
        );

        setProducts(productsRes.data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  useEffect(() => {
    if (!product) return;

    const related = products.filter(
      (item) => item.category === product.category && item.id !== product.id
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

  const handleAddCart = async () => {
    if (!product) return;

    try {
      await addToCart(product, qty);
      alert("Product added to cart successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to add product.");
    }
  };

  const handleBuyNow = async () => {
    await handleAddCart();
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="loading-page">
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

        <h2>Loading Product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="loading-page">
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

        <h2>Product Not Found</h2>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-topbar">
        <div>
          <div className="breadcrumb">
            Home / {product.category} / <span>{product.product_name}</span>
          </div>

          <h1>Product Details</h1>
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

      <div className="product-wrapper">
        <div className="product-gallery">
          <div className="thumbnail-wrapper">
            <img
              src={activeImage || PLACEHOLDER}
              alt={product.product_name}
              className="thumbnail active"
              onClick={() => setActiveImage(activeImage)}
            />
          </div>

          <div className="main-image-box">
            <span className="image-offer">20% OFF</span>

            <img
              src={activeImage || PLACEHOLDER}
              alt={product.product_name}
              className="main-image"
            />
          </div>
        </div>

        <div className="product-content">
          <span className="category-tag">{product.category}</span>

          <h2 className="product-title">{product.product_name}</h2>

          <p className="brand-name">
            Brand : <strong>{product.brand}</strong>
          </p>

          <div className="rating-box">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />

            <span>4.9 (124 Reviews)</span>
          </div>

          <div className="price-section">
            <span className="discount-price">Rs. {product.price}</span>

            <span className="actual-price">
              Rs. {(Number(product.price) * 1.25).toFixed(2)}
            </span>

            <span className="offer">20% OFF</span>
          </div>

          <div className="stock-box">
            {product.is_stock_out ? (
              <span className="stock-out">Out Of Stock</span>
            ) : (
              <span className="stock-in">
                <FaCheckCircle />
                In Stock
              </span>
            )}
          </div>

          <div className="quantity-section">
            <h4>Quantity</h4>

            <div className="qty-box">
              <button type="button" onClick={decreaseQty}>
                <FaMinus />
              </button>

              <span>{qty}</span>

              <button type="button" onClick={increaseQty}>
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="button-group">
            <button
              type="button"
              className="cart-btn"
              onClick={handleAddCart}
              disabled={cartLoading}
            >
              <FaShoppingCart />
              {cartLoading ? "Adding..." : "Add To Cart"}
            </button>

            <button
              type="button"
              className="buy-btn"
              onClick={handleBuyNow}
              disabled={cartLoading}
            >
              <FaBolt />
              {cartLoading ? "Please Wait..." : "Buy Now"}
            </button>

            <button type="button" className="wish-btn">
              <FaHeart />
            </button>

            <button type="button" className="share-btn">
              <FaShareAlt />
            </button>
          </div>

          <div className="feature-list">
            <div className="feature-card">
              <FaTruck />

              <div>
                <h4>Free Delivery</h4>
                <p>Delivery within 24 Hours</p>
              </div>
            </div>

            <div className="feature-card">
              <FaUndo />

              <div>
                <h4>Easy Returns</h4>
                <p>7 Days Return Policy</p>
              </div>
            </div>

            <div className="feature-card">
              <FaShieldAlt />

              <div>
                <h4>Secure Payment</h4>
                <p>100% Safe Transactions</p>
              </div>
            </div>
          </div>

          <div className="description-box">
            <h2>Product Description</h2>

            <p>
              {product.description ||
                `Fresh premium quality ${product.product_name}. Carefully selected, hygienically packed and delivered directly from trusted suppliers. Perfect for daily use with guaranteed freshness.`}
            </p>
          </div>

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
                  <td>Rs. {product.price}</td>
                </tr>

                <tr>
                  <td>Stock</td>
                  <td>{product.stock_quantity || 0} Available</td>
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

      <section className="related-products">
        <div className="related-header">
          <div>
            <span className="related-kicker">More choices</span>
            <h2>Related Products</h2>
          </div>

          <button className="view-all-btn" onClick={() => navigate("/")}>
            View All
          </button>
        </div>

        {relatedProducts.length === 0 ? (
          <div className="no-related">No Related Products Found</div>
        ) : (
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}