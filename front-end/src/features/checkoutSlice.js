import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { categoriesService } from '../services/categoriesService';
import { checkoutService } from '../services/checkoutService';
import { REDUX_STATUS } from '../utils/constants';

export const createOrder = createAsyncThunk(
  'get/allCategories',
  async (orderDetails) => {
    const res = await checkoutService.createOrder(orderDetails);
    return res.data;
  }
);

const initialState = {
  value: { status: REDUX_STATUS.IDLE },
};

export const checkoutSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.status = REDUX_STATUS.LOADING;
    },
    [createOrder.fulfilled]: (state, action) => {
      state.status = REDUX_STATUS.SUCCESS;
    },
    [createOrder.rejected]: (state, action) => {
      state.status = REDUX_STATUS.ERROR;
    },
  },
});

export default checkoutSlice.reducer;
