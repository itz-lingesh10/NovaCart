import api from "./api";

const cartService = {
  getCart: () => api.get("/api/cart"),

  addToCart: (data) => api.post("/api/cart/add", data),

  updateCartItem: (id, data) => api.put(`/api/cart/${id}`, data),

  removeCartItem: (id) => api.delete(`/api/cart/${id}`),
};

export default cartService;
