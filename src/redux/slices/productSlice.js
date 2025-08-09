import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api'; // 👈 using configured Axios with credentials

export const listFeaturedProducts = createAsyncThunk(
  'products/listFeatured',
  async () => {
    const response = await API.get('/api/products/featured'); // ✅ updated
    console.log('Featured products response:', response.data);
    return response.data;
  }
);

export const listAllProducts = createAsyncThunk(
  'products/listAll',
  async () => {
    const response = await API.get('/api/products'); // ✅ updated
    console.log('All products response:', response.data);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    featuredProducts: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(listFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(listAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(listAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default productSlice.reducer;
