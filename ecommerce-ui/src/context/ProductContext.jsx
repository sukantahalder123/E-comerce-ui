import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import api from "../services/api";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(
    async (force = false) => {
      if (!force && products.length > 0) return;

      try {
        setLoading(true);

        const res = await api.get("/products?action=list");

        if (res.data.success) {
          setProducts(res.data.products);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.log(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [products.length]
  );

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        loadProducts,
        setProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}