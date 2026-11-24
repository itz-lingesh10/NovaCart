import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../services/authService";
import { loginSuccess } from "../store/slices/authSlice";
import "./AuthPage.css";

const message = {
  success: () => {},
  error: () => {},
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await authService.login({ username, password });

      dispatch(
        loginSuccess({
          token: data.token,
          role: data.role,
          username: data.username,
          userId: data.userId,
        })
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      message.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        "Invalid credentials.";
      setError(msg);
      message.error(msg);
    }
  };

  return (
    <div className="auth-split">
      <div className="auth-hero">
        <div className="auth-hero-brand">
          <span className="brand-mark">N</span>
          NovaCart
        </div>
        <h1 className="auth-hero-headline">
          Track orders, save your cart, and <span className="accent">checkout faster</span> next time.
        </h1>
        <p className="auth-hero-foot">Trusted by thousands of happy shoppers.</p>
      </div>

      <div className="auth-form-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <p className="auth-form-subtitle">Log in to pick up where you left off.</p>

          <label htmlFor="login-username">Username</label>
          <input
            id="login-username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit-btn btn-gradient">
            Login
          </button>

          <span className="auth-switch-link">
            New here? <Link to="/register">Create an account</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
