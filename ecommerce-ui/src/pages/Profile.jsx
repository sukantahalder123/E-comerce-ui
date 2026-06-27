import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBox,
  FaHeart,
  FaLock,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";

import "./Profile.css";

export default function Profile() {
  const navigate = useNavigate();

  const user = {
    name: "Sukanta Halder",
    email: "sukanta@gmail.com",
    phone: "9876543210",
    address: "Kolkata, West Bengal",
    image: "https://i.pravatar.cc/250?img=12",
  };

  return (
    <div className="profile-page">

      {/* Sidebar */}

      <div className="profile-sidebar">

        <img src={user.image} alt="" />

        <h2>{user.name}</h2>

        <p>Premium Customer</p>

        <button className="edit-btn">
          <FaEdit />
          Edit Profile
        </button>

        <div className="menu">

          <div onClick={() => navigate("/orders")}>
            <FaBox />
            My Orders
          </div>

          <div>
            <FaHeart />
            Wishlist
          </div>

          <div>
            <FaMapMarkerAlt />
            Saved Address
          </div>

          <div>
            <FaLock />
            Change Password
          </div>

          <div className="logout">
            <FaSignOutAlt />
            Logout
          </div>

        </div>

      </div>

      {/* Right */}

      <div className="profile-content">

        <div className="card">

          <h2>Personal Information</h2>

          <div className="info">

            <FaUser />

            <div>
              <span>Full Name</span>
              <h3>{user.name}</h3>
            </div>

          </div>

          <div className="info">

            <FaEnvelope />

            <div>
              <span>Email</span>
              <h3>{user.email}</h3>
            </div>

          </div>

          <div className="info">

            <FaPhone />

            <div>
              <span>Phone</span>
              <h3>{user.phone}</h3>
            </div>

          </div>

          <div className="info">

            <FaMapMarkerAlt />

            <div>
              <span>Address</span>
              <h3>{user.address}</h3>
            </div>

          </div>

        </div>

        <div className="stats">

          <div className="box">
            <h1>25</h1>
            <p>Orders</p>
          </div>

          <div className="box">
            <h1>8</h1>
            <p>Wishlist</p>
          </div>

          <div className="box">
            <h1>₹18,500</h1>
            <p>Total Spend</p>
          </div>

        </div>

      </div>

    </div>
  );
}