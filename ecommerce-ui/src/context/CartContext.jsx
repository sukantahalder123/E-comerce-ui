import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const BASE_API = "https://e-com-backend-gules-six.vercel.app";
const CART_API = `${BASE_API}/cart`;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Cart Summary
  // ===============================

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const grandTotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
  }, [cart]);

  // ===============================
  // Load Cart
  // ===============================

  const loadCart = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user?.id) {
        setCart([]);
        return;
      }

      setLoading(true);

      const response = await fetch(
        `${CART_API}?action=list&user_id=${user.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load cart");
      }

      setCart(data.cart || []);
    } catch (err) {
      console.error("Load Cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ===============================
  // Add To Cart
  // ===============================

  // ===============================
// Add To Cart
// ===============================

const addToCart = async (product, quantity = 1) => {
  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || !user?.id) {
    alert("Please login first.");
    return;
  }

  const productId = product.product_id || product.id;

  // Save current cart for rollback
  const previousCart = [...cart];

  // ==========================
  // Instant UI Update
  // ==========================
  setCart((prev) => {
    const existing = prev.find(
      (item) => (item.product_id || item.id) === productId
    );

    if (existing) {
      return prev.map((item) =>
        (item.product_id || item.id) === productId
          ? {
              ...item,
              quantity: item.quantity + quantity,
              subtotal: (
                Number(item.price) *
                (item.quantity + quantity)
              ).toFixed(2),
            }
          : item
      );
    }

    return [
      ...prev,
      {
        cart_id: `temp-${Date.now()}`,
        product_id: productId,
        product_name: product.product_name,
        image_url: product.image_url,
        price: Number(product.price),
        quantity,
        subtotal: (Number(product.price) * quantity).toFixed(2),
      },
    ];
  });

  try {
    const response = await fetch(`${CART_API}?action=add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: user.id,
        product_id: productId,
        quantity,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    // Get real cart from backend
    await loadCart();

    return data;
  } catch (err) {
    console.error(err);

    // Rollback if API fails
    setCart(previousCart);

    alert(err.message);
  }
};

    // ===============================
  // Increase Quantity
  // ===============================

  const increaseQty = async (cartItem) => {
    const oldCart = [...cart];

    // Instant UI Update
    setCart((prev) =>
      prev.map((item) =>
        item.cart_id === cartItem.cart_id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (
                Number(item.price) *
                (item.quantity + 1)
              ).toFixed(2),
            }
          : item
      )
    );

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(
        `${CART_API}?action=update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cart_id: cartItem.cart_id,
            quantity: cartItem.quantity + 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (err) {
      // Rollback
      setCart(oldCart);
      alert(err.message);
    }
  };

  // ===============================
  // Decrease Quantity
  // ===============================

  const decreaseQty = async (cartItem) => {
    if (cartItem.quantity <= 1) {
      return removeFromCart(cartItem.cart_id);
    }

    const oldCart = [...cart];

    // Instant UI Update
    setCart((prev) =>
      prev.map((item) =>
        item.cart_id === cartItem.cart_id
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: (
                Number(item.price) *
                (item.quantity - 1)
              ).toFixed(2),
            }
          : item
      )
    );

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(
        `${CART_API}?action=update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cart_id: cartItem.cart_id,
            quantity: cartItem.quantity - 1,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (err) {
      // Rollback
      setCart(oldCart);
      alert(err.message);
    }
  };

  // ===============================
  // Remove Cart Item
  // ===============================

  const removeFromCart = async (cartId) => {
    const oldCart = [...cart];

    // Instant Remove
    setCart((prev) =>
      prev.filter((item) => item.cart_id !== cartId)
    );

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(
        `${CART_API}?action=remove&cart_id=${cartId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (err) {
      // Rollback
      setCart(oldCart);
      alert(err.message);
    }
  };

  // ===============================
  // Clear Cart
  // ===============================

  const clearCart = () => {
    setCart([]);
  };

    return (
    <CartContext.Provider
      value={{
        cart,
        loading,

        // Summary
        totalItems,
        grandTotal,

        // APIs
        loadCart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};