import { Link } from "react-router-dom";
import "./Success.css";

export default function Success() {
  return (
    <div className="success-page">

      <div className="success-box">

        <div className="success-icon">✅</div>

        <h1>Order Placed Successfully</h1>

        <p>
          Thank you for shopping with ShopZone.
          Your order has been received.
        </p>

        <Link to="/orders">
          <button>View My Orders</button>
        </Link>

      </div>

    </div>
  );
}