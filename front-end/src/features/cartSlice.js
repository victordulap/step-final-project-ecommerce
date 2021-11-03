import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  value: [],
};

const findIndexOfItemById = (items, id) => {
  return items.findIndex((item) => item.id === id);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCartFromLocalStorage(state, action) {
      const cart = JSON.parse(localStorage.getItem('vdShopCart')) || [];
      state.value = cart;
    },
    addToCart(state, action) {
      let index = state.value.findIndex(
        (cartItem) =>
          cartItem.item.id === action.payload.item.id &&
          cartItem.selectedSize === action.payload.selectedSize
      );
      // if item exists increment count
      if (index > -1) {
        state.value[index] = {
          ...state.value[index],
          item: action.payload.item,
          selectedSize: action.payload.selectedSize,
          count: state.value[index].count + 1,
        };
      } else {
        state.value.push({
          id: uuid(),
          item: action.payload.item,
          selectedSize: action.payload.selectedSize,
          count: 1,
        });
      }

      localStorage.setItem('vdShopCart', JSON.stringify(state.value));
    },
    removeFromCart(state, action) {
      state.value = state.value.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );

      localStorage.setItem('vdShopCart', JSON.stringify(state.value));
    },
    incrementCount(state, action) {
      const index = findIndexOfItemById(state.value, action.payload.id);
      state.value[index].count++;

      localStorage.setItem('vdShopCart', JSON.stringify(state.value));
    },
    decrementCount(state, action) {
      const index = findIndexOfItemById(state.value, action.payload.id);
      state.value[index].count--;
      if (state.value[index].count === 0) {
        // remove item
        state.value = state.value.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
      }

      localStorage.setItem('vdShopCart', JSON.stringify(state.value));
    },
  },
});

export const {
  getCartFromLocalStorage,
  addToCart,
  removeFromCart,
  incrementCount,
  decrementCount,
} = cartSlice.actions;

export default cartSlice.reducer;
