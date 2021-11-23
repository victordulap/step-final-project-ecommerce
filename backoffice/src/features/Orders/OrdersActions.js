import { createAsyncThunk } from '@reduxjs/toolkit';
import { ordersService } from '../../services/ordersService';

export const getAllOrders = createAsyncThunk('get/allOrders', async () => {
  const res = await ordersService.getOrders();
  return res.data;
});
