import { createSlice } from '@reduxjs/toolkit';
import { STATE_STATUSES } from '../../util/constants';
import { addCategory, getAllCategories, getCategory, removeCategory } from './CategoriesActions';

const initialState = {
  value: [],
  category: {},
};

export const CategoriesSlice = createSlice({
  name: 'Brands',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = STATE_STATUSES.IDLE;
    },
  },
  extraReducers: {
    [getAllCategories.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.value = action.payload.categories;
      state.isLoading = false;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.value = [];
      state.isLoading = false;
    },

    [getCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.category = action.payload.category;
      state.isLoading = false;
    },
    [getCategory.rejected]: (state, action) => {
      state.category = {};
      state.isLoading = false;
    },

    [addCategory.pending]: (state, action) => {
      state.isLoading = true;
      state.status = STATE_STATUSES.LOADING;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = STATE_STATUSES.SUCCESS;
    },
    [addCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = STATE_STATUSES.ERROR;
    },

    [removeCategory.pending]: (state, action) => {
      state.isLoading = true;
      state.status = STATE_STATUSES.LOADING;
    },
    [removeCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = STATE_STATUSES.SUCCESS;
    },
    [removeCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = STATE_STATUSES.ERROR;
    },
  },
});

export const categoryActions = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
