import { createAsyncThunk } from '@reduxjs/toolkit';
import { itemsService } from '../../services/itemsService';

export const getItems = createAsyncThunk('get/items', async () => {
  const res = await itemsService.getItems();
  return res.data;
});

export const getItemById = createAsyncThunk('get/itemById', async (id) => {
  const res = await itemsService.getItemById(id);
  return res.data;
});

export const addItem = createAsyncThunk('post/item', async (item) => {
  const res = await itemsService.addItem(item);
  return res.data;
});
