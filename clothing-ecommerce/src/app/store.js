import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import brandsReducer from '../features/brandsSlice';
import categoriesReducer from '../features/categoriesSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    brands: brandsReducer,
    categories: categoriesReducer,
  },
});
