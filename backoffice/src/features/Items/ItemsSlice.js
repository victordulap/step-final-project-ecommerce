import { createSlice } from '@reduxjs/toolkit';
import { STATE_STATUSES } from '../../util/constants';
import { getItems, getItemById, addItem } from './ItemsActions';

const initialState = {
  value: [],
  item: {},
  status: STATE_STATUSES.IDLE,
};

export const ItemsSlice = createSlice({
  name: 'Items',
  initialState,
  reducers: {
    resetState: (state, action) => {
      state.value = [];
      state.item = {};
    },
    resetStatus: (state) => {
      state.status = STATE_STATUSES.IDLE;
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

    [addItem.pending]: (state, action) => {
      state.isLoading = true;
      state.status = STATE_STATUSES.LOADING;
    },
    [addItem.fulfilled]: (state, action) => {
      state.status = STATE_STATUSES.SUCCESS;
      state.isLoading = false;
    },
    [addItem.rejected]: (state, action) => {
      state.status = STATE_STATUSES.ERROR;
      state.isLoading = false;
    },
  },
});

export const { resetState, resetStatus } = ItemsSlice.actions;

export default ItemsSlice.reducer;
