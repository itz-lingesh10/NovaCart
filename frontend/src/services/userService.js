import api from "./api";

const userService = {
  getAllUsers: () => api.get("/api/users"),
  getAll: () => api.get("/api/users"),

  getUserById: (id) => api.get(`/api/users/${id}`),
  getById: (id) => api.get(`/api/users/${id}`),

  deleteUser: (id) => api.delete(`/api/users/${id}`),
  remove: (id) => api.delete(`/api/users/${id}`),

  uploadImage: (formData) =>
    api.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export default userService;
