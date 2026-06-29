import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaAppleAlt,
  FaLeaf,
  FaShoppingBasket,
  FaTruck,
  FaShieldAlt,
  FaClock,
  FaTags,
  FaArrowRight,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import { useProducts } from "../context/ProductContext";
import "./Home.css";

const categories = [
  { title: "All", value: "", image: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png" },
  { title: "Fruits", value: "Fruits", image: "https://cdn-icons-png.flaticon.com/512/3194/3194766.png" },
  { title: "Vegetables", value: "Vegetables", image: "https://cdn-icons-png.flaticon.com/512/2153/2153788.png" },
  { title: "Grocery", value: "Grocery", image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
  { title: "Dairy", value: "Dairy", image: "https://cdn-icons-png.flaticon.com/512/3082/3082037.png" },
  { title: "Bakery", value: "Bakery", image: "https://cdn-icons-png.flaticon.com/512/3081/3081985.png" },
  { title: "Snacks", value: "Snacks", image: "https://cdn-icons-png.flaticon.com/512/2553/2553691.png" },
  { title: "Beverages", value: "Beverages", image: "https://cdn-icons-png.flaticon.com/512/3050/3050158.png" },
  { title: "Personal Care", value: "Personal Care", image: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png" },
  { title: "Household", value: "Household", image: "https://cdn-icons-png.flaticon.com/512/3082/3082048.png" },
];

const benefits = [
  { icon: <FaTruck />, title: "Fast Delivery", text: "Fresh essentials delivered quickly." },
  { icon: <FaShieldAlt />, title: "Quality Checked", text: "Picked and packed with care." },
  { icon: <FaClock />, title: "Daily Fresh", text: "New stock updated every day." },
  { icon: <FaTags />, title: "Better Prices", text: "Smart deals on everyday items." },
];

export default function Home() {
  const location = useLocation();
  const { products, loading } = useProducts();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    if (location.state?.orderPlaced) {
      alert("Thank you! Your order has been placed successfully.");
    }
  }, [location]);

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 6);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchSearch = item.product_name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "" ||
        item.category?.toLowerCase() === selectedCategory.toLowerCase();

      return matchSearch && matchCategory;
    });
  }, [products, search, selectedCategory]);

  const visibleProducts = showAllProducts
    ? filteredProducts
    : filteredProducts.slice(0, 8);

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <main className="home-page">
        <Banner />

        <section className="benefit-strip">
          {benefits.map((benefit) => (
            <div className="benefit-item" key={benefit.title}>
              <span>{benefit.icon}</span>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            </div>
          ))}
        </section>

        <section className="category-section">
          <div className="category-row-layout">
            <div className="category-left">
              <span className="section-kicker">
                <FaShoppingBasket />
                Shop Smarter
              </span>

              <h2>Shop By Category</h2>
              <p>Pick a category and browse fresh products faster.</p>

              <button
                type="button"
                className="view-all-btn"
                onClick={() => setShowAllCategories((prev) => !prev)}
              >
                {showAllCategories ? "Show Less" : "View All"}
                <FaArrowRight />
              </button>
            </div>

            <div className="category-scroll">
              {visibleCategories.map((category) => (
                <button
                  type="button"
                  className={
                    selectedCategory === category.value
                      ? "category-button active"
                      : "category-button"
                  }
                  key={category.title}
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <CategoryCard title={category.title} image={category.image} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="products">
          <div className="products-top">
            <div>
              <span className="section-kicker">
                {selectedCategory ? <FaLeaf /> : <FaAppleAlt />}
                {selectedCategory || "Fresh Picks"}
              </span>

              <h2>Latest Products</h2>
              <p>{filteredProducts.length} products available</p>
            </div>

            {filteredProducts.length > 8 && (
              <button
                type="button"
                className="view-all-btn product-view-btn"
                onClick={() => setShowAllProducts((prev) => !prev)}
              >
                {showAllProducts ? "Show Less" : "View All"}
                <FaArrowRight />
              </button>
            )}
          </div>

          {loading ? (
            <Loader />
          ) : visibleProducts.length === 0 ? (
            <div className="empty-products">
              <h3>No Products Found</h3>
              <p>Try another category or search for a different item.</p>
            </div>
          ) : (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}