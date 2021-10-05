import { createSlice } from '@reduxjs/toolkit';
import { categories } from '../data/categories';
import { items } from '../data/items';

const initialState = {
  value: [],
};

export const shopItemsSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setShopItems: (state, action) => {
      const { title } = action.payload;
      if (title.type === 'categories') {
        // state.value = getCate;
      } else if (title.type === 'brands') {
      } else {
        throw new Error('undefined title: ', title);
      }
    },
  },
});

export const {} = shopItemsSlice.actions;

export default shopItemsSlice.reducer;
