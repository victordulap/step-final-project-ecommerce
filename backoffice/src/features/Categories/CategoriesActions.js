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

export const addCategory = createAsyncThunk('post/category', async ({ name, imgUrl }) => {
  const res = await categoriesService.addCategory({ name, imgUrl });
  return res.data;
});

export const removeCategory = createAsyncThunk('delete/category', async (id) => {
  const res = await categoriesService.removeCategory(id);
  return res.data;
});

export const updateCategory = createAsyncThunk('put/category', async ({ id, editedModel }) => {
  const res = await categoriesService.updateCategory(id, editedModel);
  return res.data;
});
