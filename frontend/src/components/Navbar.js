import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Navbar.css";

export default function Navbar() {
  const { isAuthenticated, isAdmin, username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initial = username ? username.charAt(0) : "";

  return (
    <nav className="novacart-navbar" aria-label="Main navigation">
      <div className="navbar-brand-group">
        <Link to="/" className="navbar-brand">
          <span className="brand-mark">N</span>
          NovaCart
        </Link>
      </div>

      <div className="navbar-pill-group">
        <NavLink
          to="/products"
          className={({ isActive }) => `navbar-pill${isActive ? " active" : ""}`}
        >
          Products
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => `navbar-pill${isActive ? " active" : ""}`}
        >
          Cart
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/orders"
            className={({ isActive }) => `navbar-pill${isActive ? " active" : ""}`}
          >
            My Orders
          </NavLink>
        )}
      </div>

      {isAuthenticated && (
        <div className="navbar-user-group">
          <span className="avatar-circle">{initial}</span>
          <span className="navbar-username">{username}</span>
        </div>
      )}

      <div className="navbar-action-group">
        {isAdmin && (
          <Link to="/admin" className="navbar-admin-link">
            Admin Panel
          </Link>
        )}
        {isAuthenticated ? (
          <button type="button" className="navbar-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="navbar-pill">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
