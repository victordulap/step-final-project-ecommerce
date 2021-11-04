import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { itemsService } from '../services/itemsService';

export const getItems = createAsyncThunk('get/items', async (q) => {
  const res = await itemsService.getItems(q);
  return res.data;
});

export const getItemsByPage = createAsyncThunk('get/items', async (q) => {
  const res = await itemsService.getItems(q);
  return res.data;
});

const initialState = {
  value: [],
  noMoreToLoad: false,
};

export const shopItemsSlice = createSlice({
  name: 'shopItems',
  initialState,
  reducers: {
    resetState: (state, action) => {
      state.value = [];
      state.shopTitle = '';
      state.noMoreToLoad = false;
    },
  },
  extraReducers: {
    [getItems.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getItems.fulfilled]: (state, action) => {
      state.value = action.payload.items;
      state.noMoreToLoad = action.payload.nbHits < 10;
      state.isLoading = false;
      state.shopTitle = action.payload.shopTitle;
    },
    [getItems.rejected]: (state, action) => {
      state.value = [];
      state.isLoading = false;
      state.shopTitle = '';
    },

    [getItemsByPage.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getItemsByPage.fulfilled]: (state, action) => {
      state.value = [...state.value, ...action.payload.items];
      state.noMoreToLoad = action.payload.nbHits < 10;
      state.isLoading = false;
      state.shopTitle = action.payload.shopTitle;
    },
    [getItemsByPage.rejected]: (state, action) => {
      state.value = [];
      state.isLoading = false;
      state.shopTitle = '';
    },
  },
});

export const { resetState } = shopItemsSlice.actions;

export default shopItemsSlice.reducer;
