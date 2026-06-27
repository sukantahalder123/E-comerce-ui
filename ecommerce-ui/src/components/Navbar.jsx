import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaClipboardList,
  FaBars,
  FaTimes,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaHeart,
  FaMoon,
  FaSun,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const { cart } = useCart();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const res = await axios.get(
        "https://e-com-backend-gules-six.vercel.app/products/getAllproduct"
      );

      setProducts(res.data.products || []);
    } catch (err) {
      console.log(err);
    }
  }

  const filteredProducts = products.filter((item) =>
    item.product_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return (
    <header className="navbar">

      {/* Logo */}

      <div className="logo">
        <Link to="/">Easymart</Link>
      </div>

      {/* Search */}

      <div className="search-container">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onFocus={() => setShowSuggestion(true)}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {showSuggestion && search.length > 0 && (

          <div className="search-result">

            {filteredProducts.length === 0 && (
              <p style={{ padding: 15 }}>
                No Product Found
              </p>
            )}

            {filteredProducts
              .slice(0, 6)
              .map((item) => (

                <div
                  key={item.product_id}
                  className="search-item"
                  onClick={() => {
                    navigate(`/product/${item.product_id}`);

                    setSearch("");

                    setShowSuggestion(false);
                  }}
                >

                  <img
                    src={
                      item.image_url ||
                      "https://via.placeholder.com/60"
                    }
                    alt=""
                  />

                  <div>

                    <h4>{item.product_name}</h4>

                    <span>

                      ₹ {item.price}

                    </span>

                  </div>

                </div>

              ))}

          </div>

        )}

      </div>

      {/* Desktop Menu */}

      <nav
        className={
          menuOpen
            ? "nav-links active"
            : "nav-links"
        }
      >

        <Link to="/">
          Home
        </Link>

        <Link to="/orders">

          <FaClipboardList />

          Orders

        </Link>

        {/* Cart */}

        <Link
  to="/cart"
  className="cart-btn"
>
  <FaShoppingCart />

  {totalItems > 0 && (

    <span>

      {totalItems}

    </span>

  )}

</Link>

        {/* Profile */}

        <div className="profile-menu">

          <div
            className="profile-icon"
            onClick={() =>
              setShowProfile(!showProfile)
            }
          >

            <FaUserCircle />

          </div>

          {showProfile && (

            <div className="profile-dropdown">

              <div className="profile-header">

                <img
                  src="https://i.pravatar.cc/120?img=12"
                  alt=""
                />

                <div>

                  <h4>Sukanta Halder</h4>

                  <span>

                    Premium Customer

                  </span>

                </div>

              </div>

              <hr />

              <Link
                to="/profile"
                onClick={() =>
                  setShowProfile(false)
                }
              >

                <FaUserCircle />

                My Profile

              </Link>

              <Link
                to="/orders"
                onClick={() =>
                  setShowProfile(false)
                }
              >

                <FaClipboardList />

                My Orders

              </Link>

              <Link
                to="/settings"
                onClick={() =>
                  setShowProfile(false)
                }
              >

                <FaCog />

                Settings

              </Link>

              <button
                className="logout-btn"
                onClick={() => {

                  localStorage.removeItem("token");

                  navigate("/login");

                }}
              >

                <FaSignOutAlt />

                Logout

              </button>

            </div>

          )}

        </div>

      </nav>

      {/* Mobile */}

      <button
        className="menu-btn"
        onClick={() =>
          setMenuOpen(!menuOpen)
        }
      >

        {menuOpen ? (
          <FaTimes />
        ) : (
          <FaBars />
        )}

      </button>

    </header>
  );
}