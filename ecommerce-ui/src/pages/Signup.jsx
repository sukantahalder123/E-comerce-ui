import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const API_URL =
    "https://e-com-backend-gules-six.vercel.app/auth?action=signup";

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Signup Failed"
        );
      }

      alert("Account Created Successfully");

      navigate("/login");

    } catch (err) {
      console.error(err);

      alert(err.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <h1>Create Account</h1>

        <p>Register to start shopping</p>

        <form onSubmit={handleSignup}>

          {/* Full Name */}

          <div className="input-box">
            <FaUser />

            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}

          <div className="input-box">
            <FaEnvelope />

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}

          <div className="input-box">
            <FaPhone />

            <input
              type="text"
              placeholder="Mobile Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}

          <div className="input-box">

            <FaLock />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <span
              className="eye"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>

          {/* Submit */}

          <button
            className="signup-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <p className="bottom-text">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}