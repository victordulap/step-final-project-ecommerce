import { createSlice } from '@reduxjs/toolkit';
import { getAllCategories } from './CategoriesActions';

const initialState = {
  value: [],
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
  },
});

export default CategoriesSlice.reducer;
