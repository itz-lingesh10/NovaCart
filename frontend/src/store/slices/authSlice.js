import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  role: null,
  isAuthenticated: false,
  username: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, role, username, userId } = action.payload;
      state.token = token;
      state.role = role;
      state.username = username;
      state.userId = userId;
      state.isAuthenticated = true;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.username = null;
      state.userId = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
