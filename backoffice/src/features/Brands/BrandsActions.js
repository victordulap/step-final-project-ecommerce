import { createAsyncThunk } from '@reduxjs/toolkit';
import { brandsService } from '../../services/brandsService';

export const getAllBrands = createAsyncThunk('get/allBrands', async () => {
  const res = await brandsService.getAllBrands();
  return res.data;
});
