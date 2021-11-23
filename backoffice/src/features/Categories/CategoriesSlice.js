import { createSlice } from '@reduxjs/toolkit';
import { getAllCategories, getCategory } from './CategoriesActions';

const initialState = {
  value: [],
  category: {},
};

export const CategoriesSlice = createSlice({
  name: 'Brands',
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

    [getCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.category = action.payload.category;
      state.isLoading = false;
    },
    [getCategory.rejected]: (state, action) => {
      state.category = {};
      state.isLoading = false;
    },
  },
});

export default CategoriesSlice.reducer;
