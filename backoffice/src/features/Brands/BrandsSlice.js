import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { brandsService } from '../../services';

export const getAllBrands = createAsyncThunk('get/allBrands', async () => {
  const res = await brandsService.getAllBrands();
  return res.data;
});

const initialState = {
  value: { brands: [], isLoading: true },
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
