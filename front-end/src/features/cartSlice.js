import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  value: [],
  cartTotal: 0,
};

const findIndexOfItemById = (items, id) => {
  return items.findIndex((item) => item.id === id);
};

const getCartTotal = (cart) => {
  if (cart.length > 0) {
    return cart.reduce((a, b) => +a + +b.item.price * b.count, 0);
  } else {
    return 0;
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCartFromLocalStorage(state, action) {
      const cart = JSON.parse(localStorage.getItem('vdShopCart')) || [];
      state.value = cart;

      state.cartTotal = getCartTotal(state.value);
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

      state.cartTotal = getCartTotal(state.value);
      localStorage.setItem('vdShopCart', JSON.stringify(state.value));
    },
    removeFromCart(state, action) {
      state.value = state.value.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );

      state.cartTotal = getCartTotal(state.value);
      localStorage.setItem('vdShopCart', JSON.stringify(state.value));
    },
    incrementCount(state, action) {
      const index = findIndexOfItemById(state.value, action.payload.id);
      state.value[index].count++;

      state.cartTotal = getCartTotal(state.value);
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

      state.cartTotal = getCartTotal(state.value);
      localStorage.setItem('vdShopCart', JSON.stringify(state.value));
    },
    clearCart(state, action) {
      state.value = [];

      state.cartTotal = getCartTotal(state.value);
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
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
