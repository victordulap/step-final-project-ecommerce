import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../data/categories';
import { items } from '../data/items';
import { SORT_OPTIONS } from '../utils/constants';

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
    sortShopItems: (state, action) => {
      console.log(action.payload);
      if (action.payload.sortOption === SORT_OPTIONS.lowUp) {
        console.log('low up');
        const sortedItems = [...items].sort((a, b) => a.price - b.price);
        state.value = sortedItems;
      } else if (action.payload.sortOption === SORT_OPTIONS.upLow) {
        console.log('up low');
        const sortedItems = [...items].sort((a, b) => b.price - a.price);
        state.value = sortedItems;
      } else {
        console.log('default');
        state.value = items;
      }
    },
  },
});

export const { setShopItems, getItemById, sortShopItems } =
  shopItemsSlice.actions;

export default shopItemsSlice.reducer;
