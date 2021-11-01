import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { brands } from '../data/brands';
import { brandsService } from '../services/brandsService';

export const getAllBrands = createAsyncThunk('get/allBrands', async () => {
  const res = await brandsService.getAllBrands();
  console.log(res.data);
  return res.data;
});

const initialState = {
  value: { brands: [] },
};

export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllBrands.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllBrands.fulfilled]: (state, action) => {
      state.value = action.payload;
      state.isLoading = false;
    },
    [getAllBrands.rejected]: (state, action) => {
      state.value.brands = [];
      state.isLoading = false;
    },
  },
});

export const {} = brandSlice.actions;

export default brandSlice.reducer;
