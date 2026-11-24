import React from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

const shellStyle = { display: "flex", minHeight: "100vh" };
const sidebarStyle = {
  width: 230,
  background: "linear-gradient(180deg, #1B1B3A, #0F1024)",
  color: "#C7C4E0",
  padding: "1.5rem 1rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
};
const brandRowStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.7rem",
  marginBottom: "1.5rem",
  padding: "0 0.5rem",
};
const linkStyle = ({ isActive }) => ({
  color: isActive ? "#ffffff" : "#C7C4E0",
  background: isActive ? "linear-gradient(135deg, #7C3AED, #EC4899)" : "transparent",
  textDecoration: "none",
  padding: "0.65rem 0.9rem",
  borderRadius: 10,
  fontSize: "0.9rem",
  fontWeight: isActive ? 600 : 500,
});
const contentWrapStyle = { flex: 1, display: "flex", flexDirection: "column" };
const contentStyle = { flex: 1, padding: "2rem", background: "#F6F5FB" };

export default function AdminLayout() {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={shellStyle}>
      <aside style={sidebarStyle} aria-label="Admin navigation">
        <div style={brandRowStyle}>
          <span className="brand-mark">N</span>
          <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#fff" }}>Admin</span>
        </div>
        <NavLink to="/admin" end style={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" style={linkStyle}>
          Products
        </NavLink>
        <NavLink to="/admin/categories" style={linkStyle}>
          Categories
        </NavLink>
        <NavLink to="/admin/orders" style={linkStyle}>
          Orders
        </NavLink>
        <NavLink to="/admin/users" style={linkStyle}>
          Users
        </NavLink>
      </aside>
      <div style={contentWrapStyle}>
        <Navbar />
        <div style={contentStyle}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
