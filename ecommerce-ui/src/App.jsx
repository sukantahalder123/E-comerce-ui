import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import Tracking from "./pages/Tracking";
import Success from "./pages/Success";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/checkout" element={<Checkout />} />

      <Route path="/payment" element={<Payment />} />

      <Route path="/success" element={<Success />} />

      <Route path="/orders" element={<Orders />} />

      <Route
        path="/tracking/:orderId"
        element={<Tracking />}
      />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
     <Route
  path="/product/:productId"
  element={<ProductDetails />}
/>
    </Routes>
  );
}