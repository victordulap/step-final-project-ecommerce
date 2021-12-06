import { createSlice } from '@reduxjs/toolkit';
import { STATE_STATUSES } from '../../util/constants';
import { deleteOrder, getAllOrders, getOrder, updateOrder } from './OrdersActions';

const initialState = {
  value: [],
  order: {},
  status: STATE_STATUSES.IDLE,
};

export const OrdersSlice = createSlice({
  name: 'Orders',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = STATE_STATUSES.IDLE;
    },
  },
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

    [deleteOrder.pending]: (state, action) => {
      state.isLoading = true;
      state.status = STATE_STATUSES.LOADING;
    },
    [deleteOrder.fulfilled]: (state, action) => {
      state.status = STATE_STATUSES.SUCCESS;
      state.isLoading = false;
    },
    [deleteOrder.rejected]: (state, action) => {
      state.status = STATE_STATUSES.ERROR;
      state.isLoading = false;
    },

    [updateOrder.pending]: (state, action) => {
      state.isLoading = true;
      state.status = STATE_STATUSES.LOADING;
    },
    [updateOrder.fulfilled]: (state, action) => {
      state.status = STATE_STATUSES.SUCCESS;
      state.isLoading = false;
    },
    [updateOrder.rejected]: (state, action) => {
      state.status = STATE_STATUSES.ERROR;
      state.isLoading = false;
    },
  },
});

export const { resetStatus } = OrdersSlice.actions;

export default OrdersSlice.reducer;
