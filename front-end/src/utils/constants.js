export const DELIEVERY_PRICE = 9.99;

export const SORT_OPTIONS = {
  none: {
    param: 'none',
    text: 'sort',
  },
  asc: {
    param: 'price',
    text: 'price asc',
  },
  desc: {
    param: '-price',
    text: 'price desc',
  },
};

export const BASE_URL = process.env.REACT_API_BASE_URL || 'http://localhost:5000/api';

export const REDUX_STATUS = {
  IDLE: 'idle',
  SUCCESS: 'success',
  LOADING: 'loading',
  ERROR: 'error',
};
