import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";
import orderService from "../services/orderService";
import Spinner from "../components/Spinner";
import "./CartPage.css";

const message = {
  success: () => {},
  error: () => {},
};

export default function CartPage() {
  const { items, refreshCart, updateQuantity, removeItem, empty } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    refreshCart().finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = items.reduce((sum, item) => sum + Number(item.subtotal || 0), 0);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await orderService.checkout();
      empty();
      message.success("Order placed successfully");
      navigate("/orders");
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        "Checkout failed.";
      message.error(msg);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="cart-page">
      <h1>Your cart</h1>
      {items.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-card">
            {items.map((item) => (
              <div className="cart-row" key={item.id}>
                <div className="cart-row-thumb" />
                <div className="cart-row-info">
                  <span className="cart-row-name">{item.productName}</span>
                  <span className="cart-row-unit">${Number(item.productPrice).toFixed(2)} each</span>
                </div>
                <div className="cart-row-stepper">
                  <button
                    type="button"
                    className="cart-stepper-btn"
                    onClick={() =>
                      updateQuantity(item.id, item.productId, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>
                  <span className="cart-stepper-value">{item.quantity}</span>
                  <button
                    type="button"
                    className="cart-stepper-btn"
                    onClick={() => updateQuantity(item.id, item.productId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="cart-row-subtotal">${Number(item.subtotal).toFixed(2)}</span>
                <button type="button" className="cart-row-remove" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary-card">
            <h2>Order summary</h2>
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="cart-summary-line">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="cart-summary-divider" />
            <div className="cart-summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              type="button"
              className="cart-checkout-btn btn-coral"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? "Processing..." : "Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
