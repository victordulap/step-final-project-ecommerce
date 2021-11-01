import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { items } from '../data/items';
import { itemsService } from '../services/itemsService';
import { SORT_OPTIONS } from '../utils/constants';

export const getAllItemsByBrandId = createAsyncThunk(
  'get/allItemsByBrandId',
  async (id) => {
    const res = await itemsService.getAllItemsByBrandId(id);
    return res.data;
  }
);

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
  extraReducers: {
    [getAllItemsByBrandId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllItemsByBrandId.fulfilled]: (state, action) => {
      state.value = action.payload.items;
      state.isLoading = false;
    },
    [getAllItemsByBrandId.rejected]: (state, action) => {
      state.value = [];
      state.isLoading = false;
    },
  },
});

export const { setShopItems, getItemById, sortShopItems } =
  shopItemsSlice.actions;

export default shopItemsSlice.reducer;
