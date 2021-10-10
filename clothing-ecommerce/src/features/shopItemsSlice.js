import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../data/categories';
import { items } from '../data/items';

const initialState = {
  value: [],
};

export const shopItemsSlice = createSlice({
  name: 'shopItems',
  initialState,
  reducers: {
    setShopItems: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setShopItems } = shopItemsSlice.actions;

export default shopItemsSlice.reducer;
