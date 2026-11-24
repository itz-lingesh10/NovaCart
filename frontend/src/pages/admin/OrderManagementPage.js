import React, { useEffect, useState } from "react";
import orderService from "../../services/orderService";
import Spinner from "../../components/Spinner";
import "./AdminPage.css";

const message = {
  success: () => {},
  error: () => {},
};

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

function StatusPill({ status }) {
  return <span className={`status-pill ${status.toLowerCase()}`}>{status}</span>;
}

export default function OrderManagementPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [banner, setBanner] = useState("");

  const loadOrders = () => {
    setIsLoading(true);
    return orderService
      .getAllOrders()
      .then((res) => setOrders(res.data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await orderService.updateOrderStatus(orderId, { status: newStatus });
      const label = newStatus.charAt(0) + newStatus.slice(1).toLowerCase();
      setBanner(`Order #${orderId} status updated to ${label}`);
      message.success("Order status updated successfully");
      await loadOrders();
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        "Failed to update order status.";
      message.error(msg);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="order-management-page">
      <div className="admin-page-header">
        <div>
          <h1>Order management</h1>
          <p>Review orders and update their fulfillment status</p>
        </div>
      </div>

      {banner && <div className="admin-banner-success">{banner}</div>}

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.username}</td>
                  <td>${Number(order.totalAmount).toFixed(2)}</td>
                  <td>
                    <StatusPill status={order.status} />
                  </td>
                  <td>
                    <select
                      className="admin-status-select"
                      aria-label={`Update status for order ${order.id}`}
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
