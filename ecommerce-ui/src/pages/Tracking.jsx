import { useParams } from "react-router-dom";
import {
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaHome,
  FaPhone,
  FaFileInvoice,
  FaHeadset,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./Tracking.css";

export default function Tracking() {
  const { orderId } = useParams();

  return (
    <div className="tracking-container">

      <div className="tracking-header">

        <h1>Track Your Order</h1>

        <p>Order ID : {orderId}</p>

      </div>

      <div className="tracking-grid">

        {/* Left */}

        <div>

          <div className="tracking-card">

            <h2>Delivery Status</h2>

            <div className="timeline">

              <div className="step active">
                <FaCheckCircle />
                <div>
                  <h3>Order Confirmed</h3>
                  <p>27 June 2026 • 09:30 AM</p>
                </div>
              </div>

              <div className="step active">
                <FaBox />
                <div>
                  <h3>Packed</h3>
                  <p>27 June 2026 • 10:15 AM</p>
                </div>
              </div>

              <div className="step active">
                <FaTruck />
                <div>
                  <h3>Out For Delivery</h3>
                  <p>27 June 2026 • 02:20 PM</p>
                </div>
              </div>

              <div className="step pending">
                <FaHome />
                <div>
                  <h3>Delivered</h3>
                  <p>Expected Today • 07:00 PM</p>
                </div>
              </div>

            </div>

          </div>

          <div className="tracking-card">

            <h2>Delivery Address</h2>

            <p>

              <FaMapMarkerAlt />

              221B Baker Street,
              Kolkata,
              West Bengal - 700001

            </p>

          </div>

          <div className="tracking-card">

            <h2>Customer Support</h2>

            <button className="support-btn">

              <FaPhone />

              Call Delivery Partner

            </button>

            <button className="invoice-btn">

              <FaFileInvoice />

              Download Invoice

            </button>

          </div>

        </div>

        {/* Right */}

        <div>

          <div className="tracking-card">

            <h2>Delivery Partner</h2>

            <img
              className="delivery-boy"
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt=""
            />

            <h3>Rahul Sharma</h3>

            <p>Delivery Executive</p>

            <button className="support-btn">

              <FaHeadset />

              Contact

            </button>

          </div>

          <div className="tracking-card">

            <h2>Ordered Product</h2>

            <div className="product-box">

              <img
                src="https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400"
                alt=""
              />

              <div>

                <h3>Fresh Strawberry</h3>

                <p>Quantity : 2</p>

                <h4>₹ 599.00</h4>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}