import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboardPage.css";

export default function AdminDashboardPage() {
  return (
    <div className="admin-dashboard-page">
      <h1>Admin Dashboard</h1>
      <p>Manage your store's catalog, orders, and users from here.</p>

      <div className="admin-dashboard-grid">
        <Link to="/admin/products" className="admin-dashboard-card">
          <h2>Products</h2>
          <p>Add, edit, and remove catalog items</p>
        </Link>
        <Link to="/admin/categories" className="admin-dashboard-card">
          <h2>Categories</h2>
          <p>Organize catalog structure</p>
        </Link>
        <Link to="/admin/orders" className="admin-dashboard-card">
          <h2>Orders</h2>
          <p>Review and update order status</p>
        </Link>
        <Link to="/admin/users" className="admin-dashboard-card">
          <h2>Users</h2>
          <p>View and manage user accounts</p>
        </Link>
      </div>
    </div>
  );
}
