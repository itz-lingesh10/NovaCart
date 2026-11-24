import api from "./api";

const categoryService = {
  getAllCategories: () => api.get("/api/categories"),
  getAll: () => api.get("/api/categories"),

  getCategoryById: (id) => api.get(`/api/categories/${id}`),
  getById: (id) => api.get(`/api/categories/${id}`),

  createCategory: (data) => api.post("/api/categories", data),
  create: (data) => api.post("/api/categories", data),

  updateCategory: (id, data) => api.put(`/api/categories/${id}`, data),
  update: (id, data) => api.put(`/api/categories/${id}`, data),

  deleteCategory: (id) => api.delete(`/api/categories/${id}`),
  remove: (id) => api.delete(`/api/categories/${id}`),
};

export default categoryService;
