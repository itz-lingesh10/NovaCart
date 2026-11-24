import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import productService from "../services/productService";
import categoryService from "../services/categoryService";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";

export default function ProductListingPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const keyword = searchParams.get("search");
  const categoryId = searchParams.get("category");

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    // Parallel fetch — required so both requests fire on mount without
    // one blocking the other.
    Promise.all([productService.getAll(), categoryService.getAll()])
      .then(([productsRes, categoriesRes]) => {
        if (!isMounted) return;
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (keyword) {
      productService.searchProducts(keyword).then((res) => setProducts(res.data));
    } else if (categoryId) {
      productService.getProductsByCategory(categoryId).then((res) => setProducts(res.data));
    }
  }, [keyword, categoryId]);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <SearchBar />
      </div>

      <div style={{ display: "flex", gap: "2rem" }}>
        <aside style={{ width: 200 }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.8rem" }}>Categories</h3>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {categories.map((c) => (
              <li key={c.id}>
                <a href={`/products?category=${c.id}`}>{c.name}</a>
              </li>
            ))}
          </ul>
        </aside>

        <div style={{ flex: 1 }}>
          {isLoading ? (
            <Spinner />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "1.2rem",
              }}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
