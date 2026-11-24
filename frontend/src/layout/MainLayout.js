import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const pageStyle = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
};

const mainStyle = {
  flex: 1,
};

export default function MainLayout() {
  return (
    <div style={pageStyle}>
      <Navbar />
      <main style={mainStyle}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
