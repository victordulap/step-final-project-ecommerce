import { createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesService } from '../../services/categoriesService';

export const getAllCategories = createAsyncThunk('get/allCategories', async () => {
  const res = await categoriesService.getAllCategories();
  return res.data;
});

export const getCategory = createAsyncThunk('get/categoryById', async (id) => {
  const res = await categoriesService.getCategory(id);
  return res.data;
});
