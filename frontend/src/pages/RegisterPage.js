import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../services/authService";
import "./AuthPage.css";

const message = {
  success: () => {},
  error: () => {},
};

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await authService.register({ username, email, password, role });
      message.success("Registration successful");
      navigate("/login");
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        "Registration failed.";
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
          Join a storefront built for <span className="accent">speed, not clutter.</span>
        </h1>
        <p className="auth-hero-foot">Free to join. Cancel anytime.</p>
      </div>

      <div className="auth-form-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Create your account</h1>
          <p className="auth-form-subtitle">Takes less than a minute.</p>

          <label htmlFor="register-username">Username</label>
          <input
            id="register-username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="register-role">Role</label>
          <select
            id="register-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="ROLE_USER">ROLE_USER</option>
            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
          </select>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit-btn btn-gradient">
            Create account
          </button>

          <span className="auth-switch-link">
            Already have an account? <Link to="/login">Log in</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
