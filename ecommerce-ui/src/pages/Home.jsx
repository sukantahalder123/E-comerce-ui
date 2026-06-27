import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

import "./Home.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await api.get("/products/getAllproduct");

      console.log("API Response:", res.data);

      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((item) =>
    item.product_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <Banner />

      <section className="category-section">
        <h2>Shop By Category</h2>

        <div className="category-grid">
          <CategoryCard
            title="Fruits"
            image="https://cdn-icons-png.flaticon.com/512/3194/3194766.png"
          />

          <CategoryCard
            title="Vegetables"
            image="https://cdn-icons-png.flaticon.com/512/2153/2153788.png"
          />

          <CategoryCard
            title="Grocery"
            image="https://cdn-icons-png.flaticon.com/512/3082/3082037.png"
          />

          <CategoryCard
            title="Dairy"
            image="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          />
        </div>
      </section>

      <section className="products">
        <h2>Latest Products</h2>

        {loading ? (
          <Loader />
        ) : filteredProducts.length === 0 ? (
          <h3 style={{ textAlign: "center", marginTop: "40px" }}>
            No Products Found
          </h3>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}