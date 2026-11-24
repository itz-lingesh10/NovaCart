import api from "./api";

const authService = {
  login: async (credentials) => {
    const response = await api.post("/api/auth/login", credentials);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  },

  register: async (userData) => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  },
};

export default authService;
