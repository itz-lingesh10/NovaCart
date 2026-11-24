import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../store/slices/authSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const login = (payload) => dispatch(loginSuccess(payload));
  const signOut = () => dispatch(logout());

  return {
    ...auth,
    login,
    logout: signOut,
    isAdmin: auth.role === "ROLE_ADMIN",
  };
}
