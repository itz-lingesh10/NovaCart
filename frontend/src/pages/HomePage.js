import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryService from "../services/categoryService";
import Spinner from "../components/Spinner";
import "./HomePage.css";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    categoryService
      .getAllCategories()
      .then((response) => {
        if (isMounted) setCategories(response.data);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home-page">
      <section className="home-hero">
        <p className="home-hero-kicker">Headless commerce, built for speed</p>
        <h1>
          Built for shoppers <span className="accent">who don't wait.</span>
        </h1>
        <p className="home-hero-sub">
          A dynamic headless e-commerce platform — fast, secure catalog and checkout, curated for a great shopping experience.
        </p>
        <div className="home-hero-actions">
          <Link to="/products" className="home-cta btn-coral">
            Shop now
          </Link>
          <Link to="/products" className="home-cta-secondary">
            Browse categories
          </Link>
        </div>

        <div className="home-hero-stats">
          <div>
            <span className="stat-value">Secure</span>
            <span className="stat-label">JWT authentication</span>
          </div>
          <div>
            <span className="stat-value">Fast</span>
            <span className="stat-label">Headless architecture</span>
          </div>
          <div>
            <span className="stat-value">Simple</span>
            <span className="stat-label">Checkout flow</span>
          </div>
        </div>
      </section>

      <section className="home-categories">
        <h2>Top Categories</h2>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="home-categories-grid">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="home-category-card"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
