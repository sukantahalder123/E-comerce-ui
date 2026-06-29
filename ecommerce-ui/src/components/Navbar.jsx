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
} from "react-icons/fa";

import { useCart } from "../context/CartContext";

import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const { cart } = useCart();
  const [cartAnimate, setCartAnimate] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSuggestion, setShowSuggestion] =
    useState(false);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const user =
    JSON.parse(localStorage.getItem("user")) || {
      first_name: "Customer",
      last_name: "",
      role: "customer",
    };

  const totalItems = cart.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (totalItems > 0) {
      setCartAnimate(true);

      const timer = setTimeout(() => {
        setCartAnimate(false);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  async function getProducts() {
    try {
      const res = await axios.get(
        "https://e-com-backend-gules-six.vercel.app/products?action=list"
      );

      setProducts(res.data.products || []);

    } catch (err) {
      console.log(err);
    }
  }

  // Logout
  const handleLogout = async () => {
    try {

      const token =
        localStorage.getItem("access_token");

      await fetch(
        "https://e-com-backend-gules-six.vercel.app/products?action=list",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    } catch (err) {

      console.log(err);

    } finally {

      localStorage.removeItem(
        "access_token"
      );

      localStorage.removeItem(
        "refresh_token"
      );

      localStorage.removeItem(
        "user"
      );

      navigate("/login", {
        replace: true,
      });

    }
  };

  const filteredProducts =
    products.filter((item) =>
      item.product_name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  // const totalItems = cart.reduce(
  //   (sum, item) => sum + Number(item.quantity || 0),
  //   0
  // );

  return (
    <header className="navbar">

      {/* Logo */}

      <div className="logo">

        <Link to="/">
          Easymart
        </Link>

      </div>

      {/* Search */}

      <div className="search-container">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onFocus={() =>
              setShowSuggestion(true)
            }
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {showSuggestion &&
          search.length > 0 && (

            <div className="search-result">

              {filteredProducts.length ===
                0 && (
                  <p
                    style={{
                      padding: 15,
                    }}
                  >
                    No Product Found
                  </p>
                )}

              {filteredProducts
                .slice(0, 6)
                .map((item) => (

                  <div
                    key={item.id}
                    className="search-item"
                    onClick={() => {

                      navigate(
                        `/product/${item.id}`
                      );

                      setSearch("");

                      setShowSuggestion(
                        false
                      );

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

                      <h4>
                        {item.product_name}
                      </h4>

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
          className={`cart-btn ${cartAnimate ? "cart-bounce" : ""}`}
        >
          <FaShoppingCart size={24} color="red" />

          {totalItems > 0 && (
            <span className="cart-count">
              {totalItems}
            </span>
          )}
          <div style={{ color: "red", fontSize: "40px" }}>
            <FaShoppingCart />
          </div>
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
                  alt="profile"
                />

                <div>

                  <h4>
                    {user.first_name} {user.last_name}
                  </h4>

                  <span>
                    {user.role || "Customer"}
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
                onClick={handleLogout}
              >

                <FaSignOutAlt />

                Logout

              </button>

            </div>

          )}

        </div>

      </nav>

      {/* Mobile Menu */}

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