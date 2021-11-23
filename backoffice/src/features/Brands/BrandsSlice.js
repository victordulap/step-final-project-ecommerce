import { createSlice } from '@reduxjs/toolkit';
import { getAllBrands, getBrand } from './BrandsActions';

const initialState = {
  value: [],
  brand: {},
};

export const BrandSlice = createSlice({
  name: 'Brands',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllBrands.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllBrands.fulfilled]: (state, action) => {
      state.value = action.payload.brands;
      state.isLoading = false;
    },
    [getAllBrands.rejected]: (state, action) => {
      state.value = [];
      state.isLoading = false;
    },

    [getBrand.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getBrand.fulfilled]: (state, action) => {
      state.brand = action.payload.brand;
      state.isLoading = false;
    },
    [getBrand.rejected]: (state, action) => {
      state.brand = [];
      state.isLoading = false;
    },
  },
});

export default BrandSlice.reducer;
