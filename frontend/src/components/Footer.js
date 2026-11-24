import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="novacart-footer">
      <div className="footer-inner">
        <span className="footer-brand">NovaCart</span>
        <span className="footer-tagline">Dynamic Headless E-Commerce Platform</span>
        <span className="footer-copy">&copy; {new Date().getFullYear()} NovaCart. All rights reserved.</span>
      </div>
    </footer>
  );
}
