import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { itemsService } from '../services/itemsService';

export const getAllItemsByBrandId = createAsyncThunk(
  'get/allItemsByBrandId',
  async ({ id, page }) => {
    const res = await itemsService.getAllItemsByBrandId(id, page);
    return res.data;
  }
);

export const getAllItemsByCategoryId = createAsyncThunk(
  'get/allItemsByCategoryId',
  async ({ id, page }) => {
    const res = await itemsService.getAllItemsByCategoryId(id, page);
    return res.data;
  }
);

export const getAllItemsByCategoryIdSortedByPrice = createAsyncThunk(
  'get/allItemsByCategoryIdSorted',
  async ({ id, asc, page }) => {
    const res = await itemsService.getAllItemsByCategoryIdSortedByPrice(
      id,
      asc,
      page
    );
    return res.data;
  }
);

export const getAllItemsByBrandIdSortedByPrice = createAsyncThunk(
  'get/allItemsByBrandIdSorted',
  async ({ id, asc, page }) => {
    const res = await itemsService.getAllItemsByBrandIdSortedByPrice(
      id,
      asc,
      page
    );
    return res.data;
  }
);

const initialState = {
  value: [],
  noMoreToLoad: false,
};

export const shopItemsSlice = createSlice({
  name: 'shopItems',
  initialState,
  reducers: {
    resetState: (state, action) => {
      state.value = [];
      state.shopTitle = '';
      state.noMoreToLoad = false;
    },
  },
  extraReducers: {
    [getAllItemsByBrandId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllItemsByBrandId.fulfilled]: (state, action) => {
      state.value = [...state.value, ...action.payload.items];
      state.noMoreToLoad = action.payload.nbHits < 10;
      state.isLoading = false;
      state.shopTitle = action.payload.shopTitle;
    },
    [getAllItemsByBrandId.rejected]: (state, action) => {
      state.value = [];
      state.isLoading = false;
      state.shopTitle = '';
    },

    [getAllItemsByCategoryId.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllItemsByCategoryId.fulfilled]: (state, action) => {
      state.value = [...state.value, ...action.payload.items];
      state.noMoreToLoad = action.payload.nbHits < 10;
      state.shopTitle = action.payload.shopTitle;
      state.isLoading = false;
    },
    [getAllItemsByCategoryId.rejected]: (state, action) => {
      state.value = [];
      state.shopTitle = '';
      state.isLoading = false;
    },

    [getAllItemsByCategoryIdSortedByPrice.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllItemsByCategoryIdSortedByPrice.fulfilled]: (state, action) => {
      state.value = [...state.value, ...action.payload.items];
      state.noMoreToLoad = action.payload.nbHits < 10;
      state.shopTitle = action.payload.shopTitle;
      state.isLoading = false;
    },
    [getAllItemsByCategoryIdSortedByPrice.rejected]: (state, action) => {
      state.value = [];
      state.shopTitle = '';
      state.isLoading = false;
    },

    [getAllItemsByBrandIdSortedByPrice.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllItemsByBrandIdSortedByPrice.fulfilled]: (state, action) => {
      state.value = [...state.value, ...action.payload.items];
      state.noMoreToLoad = action.payload.nbHits < 10;
      state.shopTitle = action.payload.shopTitle;
      state.isLoading = false;
    },
    [getAllItemsByBrandIdSortedByPrice.rejected]: (state, action) => {
      state.value = [];
      state.shopTitle = '';
      state.isLoading = false;
    },
  },
});

export const { resetState } = shopItemsSlice.actions;

export default shopItemsSlice.reducer;
