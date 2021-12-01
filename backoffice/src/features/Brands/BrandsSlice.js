import { createSlice } from '@reduxjs/toolkit';
import { STATE_STATUSES } from '../../util/constants';
import { addBrand, editBrand, getAllBrands, getBrand, removeBrand } from './BrandsActions';

const initialState = {
  value: [],
  brand: {},
};

export const BrandSlice = createSlice({
  name: 'Brands',
  initialState,
  reducers: {
    resetStatus(state) {
      state.status = STATE_STATUSES.IDLE;
    },
  },
  extraReducers: {
    [getAllBrands.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllBrands.fulfilled]: (state, action) => {
      state.value = action.payload.brands;
      state.isLoading = false;
    },
    [getAllBrands.rejected]: (state, action) => {
      state.value = [];
      state.isLoading = false;
    },

    [getBrand.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getBrand.fulfilled]: (state, action) => {
      state.brand = action.payload.brand;
      state.isLoading = false;
    },
    [getBrand.rejected]: (state, action) => {
      state.brand = [];
      state.isLoading = false;
    },

    [addBrand.pending]: (state, action) => {
      state.isLoading = true;
      state.status = STATE_STATUSES.LOADING;
    },
    [addBrand.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = STATE_STATUSES.SUCCESS;
    },
    [addBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = STATE_STATUSES.ERROR;
    },

    [removeBrand.pending]: (state, action) => {
      state.isLoading = true;
      state.status = STATE_STATUSES.LOADING;
    },
    [removeBrand.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = STATE_STATUSES.SUCCESS;
    },
    [removeBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = STATE_STATUSES.ERROR;
    },

    [editBrand.pending]: (state, action) => {
      state.isLoading = true;
      state.status = STATE_STATUSES.LOADING;
    },
    [editBrand.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.status = STATE_STATUSES.SUCCESS;
    },
    [editBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.status = STATE_STATUSES.ERROR;
    },
  },
});

export const brandActions = BrandSlice.actions;

export default BrandSlice.reducer;
