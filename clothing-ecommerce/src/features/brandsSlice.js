import { createSlice } from '@reduxjs/toolkit';
import { brands } from '../data/brands';

const initialState = {
  value: [...brands],
};

export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    getBrandByName: (state, action) => {
      // const name = action.payload.name;
      // return state.value.find(
      //   (brand) => brand.name.toLowerCase() === name.toLowerCase()
      // );
    },
  },
});

export const {} = brandSlice.actions;

export default brandSlice.reducer;
