import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/productService";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await productService.getAllProducts();
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const searchProductsThunk = createAsyncThunk(
  "products/searchProducts",
  async (keyword, thunkAPI) => {
    try {
      const response = await productService.searchProducts(keyword);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  products: [],
  searchResults: [],
  isLoading: false,
  isError: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(searchProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProductsThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productSlice.reducer;
