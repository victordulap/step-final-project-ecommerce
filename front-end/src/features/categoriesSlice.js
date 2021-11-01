import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { categoriesService } from '../services/categoriesService';

export const getAllCategories = createAsyncThunk(
  'get/allCategories',
  async () => {
    const res = await categoriesService.getAllCategories();
    return res.data;
  }
);

const initialState = {
  value: { categories: [] },
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllCategories.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.value = action.payload.categories;
      state.isLoading = false;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.value = [];
      state.isLoading = false;
    },
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
