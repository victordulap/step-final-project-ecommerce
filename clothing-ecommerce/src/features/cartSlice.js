import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      let index = state.value.findIndex(
        (cartItem) =>
          cartItem.item.id === action.payload.item.id &&
          cartItem.selectedSize === action.payload.selectedSize
      );
      if (index > -1) {
        state.value[index] = {
          item: action.payload.item,
          selectedSize: action.payload.selectedSize,
          count: state.value[index].count + 1,
        };
      } else {
        state.value.push({
          item: action.payload.item,
          selectedSize: action.payload.selectedSize,
          count: 1,
        });
      }
    },
    removeFromCart(state, action) {
      // TODO: add remove from cart to work
      return state.value.filter(
        (cartItem) =>
          cartItem.selectedSize !== action.payload.selectedSize &&
          cartItem.item.id !== action.payload.id
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
