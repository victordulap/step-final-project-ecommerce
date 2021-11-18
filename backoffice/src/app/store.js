import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/AuthSlice';
import itemsReducer from '../features/Items/ItemsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
  },
});
