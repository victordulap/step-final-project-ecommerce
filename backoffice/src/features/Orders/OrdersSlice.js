import { createSlice } from '@reduxjs/toolkit';
import { getAllOrders, getOrder } from './OrdersActions';

const initialState = {
  value: [],
  order: {},
};

export const OrdersSlice = createSlice({
  name: 'Orders',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllOrders.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.value = action.payload.orders;
      state.isLoading = false;
    },
    [getAllOrders.rejected]: (state, action) => {
      state.value = [];
      state.isLoading = false;
    },

    [getOrder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getOrder.fulfilled]: (state, action) => {
      state.order = action.payload.order;
      state.isLoading = false;
    },
    [getOrder.rejected]: (state, action) => {
      state.order = [];
      state.isLoading = false;
    },
  },
});

export default OrdersSlice.reducer;
