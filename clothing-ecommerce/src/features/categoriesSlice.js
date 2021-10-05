import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../data/categories';

const initialState = {
  value: [...categories],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoryByName: (state, action) => {
      // const name = action.payload.name;
      // return state.value.find(
      //   (category) => category.name.toLowerCase() === name.toLowerCase()
      // );
    },
  },
});

export const { getCategoryByName } = categoriesSlice.actions;

export default categoriesSlice.reducer;
