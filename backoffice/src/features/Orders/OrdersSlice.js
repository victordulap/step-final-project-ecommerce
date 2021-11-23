import { createSlice } from '@reduxjs/toolkit';
import { getAllOrders } from './OrdersActions';

const initialState = {
  value: [],
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
  },
});

export default OrdersSlice.reducer;
