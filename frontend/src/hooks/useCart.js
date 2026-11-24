import { useDispatch, useSelector } from "react-redux";
import { setCartItems, clearCart } from "../store/slices/cartSlice";
import cartService from "../services/cartService";

export default function useCart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const refreshCart = async () => {
    const response = await cartService.getCart();
    dispatch(setCartItems(response.data));
    return response.data;
  };

  const addToCart = async (productId, quantity) => {
    const response = await cartService.addToCart({ productId, quantity });
    await refreshCart();
    return response.data;
  };

  const updateQuantity = async (cartItemId, productId, quantity) => {
    await cartService.updateCartItem(cartItemId, { productId, quantity });
    await refreshCart();
  };

  const removeItem = async (cartItemId) => {
    await cartService.removeCartItem(cartItemId);
    await refreshCart();
  };

  const empty = () => dispatch(clearCart());

  return { items, refreshCart, addToCart, updateQuantity, removeItem, empty };
}
