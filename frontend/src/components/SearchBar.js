import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const formStyle = { display: "flex", gap: "0.5rem" };
const inputStyle = {
  flex: 1,
  padding: "0.55rem 0.8rem",
  border: "1px solid #E5E7EB",
  borderRadius: 6,
  fontSize: "0.95rem",
};
const buttonStyle = {
  background: "#E94560",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "0.55rem 1.1rem",
  cursor: "pointer",
};

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const runSearch = (keyword) => {
    if (onSearch) {
      onSearch(keyword);
    } else {
      navigate(`/products?search=${encodeURIComponent(keyword)}`);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    runSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(query);
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit} role="search">
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={handleChange}
        style={inputStyle}
        aria-label="Search products"
      />
      <button type="submit" style={buttonStyle}>
        Search
      </button>
    </form>
  );
}
