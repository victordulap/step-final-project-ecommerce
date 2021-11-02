import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { itemsService } from '../services/itemsService';

export const getAllItemsByBrandId = createAsyncThunk(
  'get/allItemsByBrandId',
  async (id) => {
    const res = await itemsService.getAllItemsByBrandId(id);
    return res.data;
  }
);

export const getAllItemsByCategoryId = createAsyncThunk(
  'get/allItemsByCategoryId',
  async (id) => {
    const res = await itemsService.getAllItemsByCategoryId(id);
    return res.data;
  }
);

const initialState = {
  value: [],
};

export const shopItemsSlice = createSlice({
  name: 'shopItems',
  initialState,
  reducers: {
    resetState: (state, action) => {
      state.value = [];
      state.shopTitle = '';
    },
  },
  extraReducers: {
    [getAllItemsByBrandId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllItemsByBrandId.fulfilled]: (state, action) => {
      state.value = action.payload.items;
      state.isLoading = false;
      state.shopTitle = action.payload.shopTitle;
    },
    [getAllItemsByBrandId.rejected]: (state, action) => {
      state.value = [];
      state.isLoading = false;
      state.shopTitle = '';
    },

    [getAllItemsByCategoryId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllItemsByCategoryId.fulfilled]: (state, action) => {
      state.value = action.payload.items;
      state.shopTitle = action.payload.shopTitle;
      state.isLoading = false;
    },
    [getAllItemsByCategoryId.rejected]: (state, action) => {
      state.value = [];
      state.shopTitle = '';
      state.isLoading = false;
    },
  },
});

export const { resetState } = shopItemsSlice.actions;

export default shopItemsSlice.reducer;
