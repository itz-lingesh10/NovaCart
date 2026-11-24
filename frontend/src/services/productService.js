import api from "./api";

const productService = {
  getAllProducts: () => api.get("/api/products"),
  getAll: () => api.get("/api/products"),

  getProductById: (id) => api.get(`/api/products/${id}`),
  getById: (id) => api.get(`/api/products/${id}`),

  searchProducts: (keyword) =>
    api.get(`/api/products/search`, { params: { keyword } }),
  search: (keyword) =>
    api.get(`/api/products/search`, { params: { keyword } }),

  getProductsByCategory: (categoryId) =>
    api.get(`/api/products/category/${categoryId}`),
  getByCategory: (categoryId) =>
    api.get(`/api/products/category/${categoryId}`),

  createProduct: (data) => api.post("/api/products", data),
  create: (data) => api.post("/api/products", data),

  updateProduct: (id, data) => api.put(`/api/products/${id}`, data),
  update: (id, data) => api.put(`/api/products/${id}`, data),

  deleteProduct: (id) => api.delete(`/api/products/${id}`),
  remove: (id) => api.delete(`/api/products/${id}`),
};

export default productService;
