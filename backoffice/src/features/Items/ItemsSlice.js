import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { itemsService } from '../../services/itemsService';

export const getItems = createAsyncThunk('get/items', async () => {
  const res = await itemsService.getItems();
  console.log(res.data);
  return res.data;
});

const initialState = {
  value: [],
};

export const ItemsSlice = createSlice({
  name: 'Items',
  initialState,
  reducers: {
    resetState: (state, action) => {
      state.value = [];
    },
  },
  extraReducers: {
    [getItems.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getItems.fulfilled]: (state, action) => {
      state.value = action.payload.items;
      state.isLoading = false;
    },
    [getItems.rejected]: (state, action) => {
      state.value = [];
      state.isLoading = false;
    },
  },
});

export const { resetState } = ItemsSlice.actions;

export default ItemsSlice.reducer;
