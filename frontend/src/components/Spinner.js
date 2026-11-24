import React from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem",
};

const ringStyle = {
  width: 36,
  height: 36,
  border: "4px solid #E5E7EB",
  borderTopColor: "#1F4068",
  borderRadius: "50%",
  animation: "novacart-spin 0.8s linear infinite",
};

export default function Spinner() {
  return (
    <div data-testid="spinner-container" style={containerStyle}>
      <style>
        {`@keyframes novacart-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
      <div style={ringStyle} />
    </div>
  );
}
