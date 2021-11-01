import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { itemsService } from '../services/itemsService';

export const getItemById = createAsyncThunk('get/itemById', async (id) => {
  const res = await itemsService.getItemById(id);
  return res.data;
});

const initialState = {
  value: [],
};

export const selectedItemSlice = createSlice({
  name: 'shopItems',
  initialState,
  reducers: {
    resetState: (state, action) => {
      state.value = [];
    },
  },
  extraReducers: {
    [getItemById.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getItemById.fulfilled]: (state, action) => {
      state.value = action.payload.item;
      state.brandDetails = action.payload.brandDetails;
      state.isLoading = false;
    },
    [getItemById.rejected]: (state, action) => {
      state.value = {};
      state.isLoading = false;
    },
  },
});

export const { resetState } = selectedItemSlice.actions;

export default selectedItemSlice.reducer;
