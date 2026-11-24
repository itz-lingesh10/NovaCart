import api from "./api";

const orderService = {
  checkout: () => api.post("/api/orders/checkout"),

  getMyOrders: () => api.get("/api/orders/my-orders"),

  getAllOrders: () => api.get("/api/orders/all"),

  updateOrderStatus: (id, data) => api.put(`/api/orders/${id}/status`, data),
};

export default orderService;
