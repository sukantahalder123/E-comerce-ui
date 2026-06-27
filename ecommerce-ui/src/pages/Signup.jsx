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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(form);

    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        <h1>Create Account</h1>

        <p>Register to start shopping</p>

        <form onSubmit={handleSignup}>

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

          <div className="input-box">
            <FaPhone />
            <input
              type="text"
              placeholder="Mobile Number"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
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

          <div className="input-box">
            <FaLock />

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />

            <span
              className="eye"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
            >
              {showConfirm ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>

          <button className="signup-btn">
            Create Account
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