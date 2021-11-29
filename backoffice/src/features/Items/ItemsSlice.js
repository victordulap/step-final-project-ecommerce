import { createSlice } from '@reduxjs/toolkit';
import { getItems, getItemById } from './ItemsActions';

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

    [getItemById.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getItemById.fulfilled]: (state, action) => {
      state.item = action.payload.item;
      state.isLoading = false;
    },
    [getItemById.rejected]: (state, action) => {
      state.item = [];
      state.isLoading = false;
    },
  },
});

export const { resetState } = ItemsSlice.actions;

export default ItemsSlice.reducer;
