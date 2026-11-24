import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/AdminLayout";

import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";

import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import CategoryManagementPage from "./pages/admin/CategoryManagementPage";
import OrderManagementPage from "./pages/admin/OrderManagementPage";
import UserManagementPage from "./pages/admin/UserManagementPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/products/:slug" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="products" element={<ProductManagementPage />} />
        <Route path="categories" element={<CategoryManagementPage />} />
        <Route path="orders" element={<OrderManagementPage />} />
        <Route path="users" element={<UserManagementPage />} />
      </Route>
    </Routes>
  );
}
