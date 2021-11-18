import { createSlice } from '@reduxjs/toolkit';
import { getAllBrands } from './BrandsActions';

const initialState = {
  value: [],
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
  },
});

export default BrandSlice.reducer;
