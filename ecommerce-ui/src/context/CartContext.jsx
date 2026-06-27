import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
  const productKey =
    product.product_id || product.id || product._id;

  setCart((prevCart) => {
    const existing = prevCart.find(
      (item) =>
        (item.product_id || item.id || item._id) === productKey
    );

    if (existing) {
      return prevCart.map((item) =>
        (item.product_id || item.id || item._id) === productKey
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    }

    return [
      ...prevCart,
      {
        ...product,
        qty: 1,
      },
    ];
  });
};

  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== id)
    );
  };

  const increaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty > 1 ? item.qty - 1 : 1,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};