import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../data/categories';

const initialState = {
  value: [...categories],
};

export const brandSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export const {} = brandSlice.actions;

export default brandSlice.reducer;
