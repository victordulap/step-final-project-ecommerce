import { createSlice } from '@reduxjs/toolkit';
import { brands } from '../data/brands';

const initialState = {
  value: [...brands],
};

export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
});

export const {} = brandSlice.actions;

export default brandSlice.reducer;
