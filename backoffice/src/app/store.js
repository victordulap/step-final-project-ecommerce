import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/AuthSlice';
import itemsReducer from '../features/Items/ItemsSlice';
import brandsReducer from '../features/Brands/BrandsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    brands: brandsReducer,
  },
});
