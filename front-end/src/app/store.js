import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import brandsReducer from '../features/brandsSlice';
import categoriesReducer from '../features/categoriesSlice';
import shopItemsReducer from '../features/shopItemsSlice';
import selectedItemReducer from '../features/selectedItemSlice';
import checkoutReducer from '../features/checkoutSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    brands: brandsReducer,
    categories: categoriesReducer,
    shopItems: shopItemsReducer,
    selectedItem: selectedItemReducer,
    checkout: checkoutReducer,
  },
});
