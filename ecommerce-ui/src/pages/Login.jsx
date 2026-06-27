import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Backend API call yahan aayega
    console.log(form);

    navigate("/");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p>Login to continue shopping</p>

        <form onSubmit={handleLogin}>

          <div className="input-box">
            <FaEnvelope />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
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

          <button className="login-btn">
            Login
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account?

          <Link to="/signup">
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}