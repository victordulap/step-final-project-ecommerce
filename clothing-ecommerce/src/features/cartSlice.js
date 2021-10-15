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
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
