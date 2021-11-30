import { createAsyncThunk } from '@reduxjs/toolkit';
import { brandsService } from '../../services/brandsService';

export const getAllBrands = createAsyncThunk('get/allBrands', async () => {
  const res = await brandsService.getAllBrands();
  return res.data;
});

export const getBrand = createAsyncThunk('get/brandById', async (id) => {
  const res = await brandsService.getBrand(id);
  return res.data;
});

export const addBrand = createAsyncThunk('post/brand', async ({ name, imgUrl }) => {
  const res = await brandsService.addBrand({ name, imgUrl });
  return res.data;
});

export const removeBrand = createAsyncThunk('delete/brand', async (id) => {
  const res = await brandsService.removeBrand(id);
  return res.data;
});

export const editBrand = createAsyncThunk('put/brand', async ({ id, editedModel }) => {
  const res = await brandsService.editBrand(id, editedModel);
  return res.data;
});
