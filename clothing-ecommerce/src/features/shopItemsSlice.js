import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../data/categories';
import { items } from '../data/items';

const initialState = {
  value: [],
  currentItem: {},
};

export const shopItemsSlice = createSlice({
  name: 'shopItems',
  initialState,
  reducers: {
    setShopItems: (state, action) => {
      state.value = action.payload;
    },
    getItemById: (state, action) => {
      state.currentItem = items.find((item) => item.id === action.payload.id);
    },
  },
});

export const { setShopItems, getItemById } = shopItemsSlice.actions;

export default shopItemsSlice.reducer;
