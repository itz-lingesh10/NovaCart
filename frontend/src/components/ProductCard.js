import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    await addToCart(product.id, 1);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.slug}`} className="product-card-link">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card-image"
        />
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">${Number(product.price).toFixed(2)}</p>
      </Link>
      {isAuthenticated && (
        <button type="button" className="product-card-add-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      )}
    </div>
  );
}
