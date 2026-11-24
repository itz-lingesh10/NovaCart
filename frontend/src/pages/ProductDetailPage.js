import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../services/productService";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import Spinner from "../components/Spinner";
import "./ProductDetailPage.css";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    productService
      .searchProducts(slug)
      .then((res) => {
        if (!isMounted) return;
        const match = res.data.find((p) => p.slug === slug) || res.data[0] || null;
        setProduct(match);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) return <Spinner />;
  if (!product) return <p className="product-detail-not-found">Product not found.</p>;

  return (
    <div className="product-detail-page">
      <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p className="product-detail-price">${Number(product.price).toFixed(2)}</p>
        <p className="product-detail-description">{product.description}</p>
        <p className="product-detail-stock">In stock: {product.stock}</p>
        {isAuthenticated && (
          <button
            type="button"
            className="product-detail-add-btn"
            onClick={() => addToCart(product.id, 1)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
