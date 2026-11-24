import React, { useEffect, useState } from "react";
import orderService from "../services/orderService";
import Spinner from "../components/Spinner";
import "./OrdersPage.css";

const STEPS = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED"];

function OrderProgress({ status }) {
  if (status === "CANCELLED") {
    return <span className="order-cancelled-badge">Cancelled</span>;
  }

  const currentIndex = STEPS.indexOf(status);

  return (
    <div className="order-progress">
      {STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div className="order-progress-step">
            <span
              className={
                "order-progress-dot" +
                (i < currentIndex
                  ? " done"
                  : i === currentIndex
                  ? " current"
                  : "")
              }
            >
              {i < currentIndex ? "\u2713" : ""}
            </span>
            <span className="order-progress-label">{step.charAt(0) + step.slice(1).toLowerCase()}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={"order-progress-line" + (i < currentIndex ? " done" : "")} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    orderService
      .getMyOrders()
      .then((res) => {
        if (isMounted) setOrders(res.data);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <div className="orders-page">
      <h1>My orders</h1>
      {orders.length === 0 ? (
        <p className="orders-empty">You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div>
                  <span className="order-card-title">Order #{order.id}</span>
                  <span className="order-date">
                    {new Date(order.orderDate).toLocaleString()}
                  </span>
                </div>
                <span className="order-total">${Number(order.totalAmount).toFixed(2)}</span>
              </div>

              <OrderProgress status={order.status} />

              <p className="order-items-line">
                {order.orderItems
                  .map((item) => `${item.productName} \u00d7 ${item.quantity} \u2014 $${Number(item.price).toFixed(2)}`)
                  .join("  \u00b7  ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
