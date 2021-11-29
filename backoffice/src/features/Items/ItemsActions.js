import { createAsyncThunk } from '@reduxjs/toolkit';
import { itemsService } from '../../services/itemsService';

export const getItems = createAsyncThunk('get/items', async () => {
  const res = await itemsService.getItems();
  console.log(res.data);
  return res.data;
});

export const getItemById = createAsyncThunk('get/itemById', async (id) => {
  const res = await itemsService.getItemById(id);
  console.log(res.data);
  return res.data;
});
