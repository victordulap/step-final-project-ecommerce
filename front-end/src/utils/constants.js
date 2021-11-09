export const DELIEVERY_PRICE = 9.99;

export const SORT_OPTIONS = {
  none: {
    param: 'none',
    text: 'sort',
  },
  asc: {
    param: 'price',
    text: 'price low -> up',
  },
  desc: {
    param: '-price',
    text: 'price up -> low',
  },
};

export const BASE_URL = 'http://localhost:5000/api/v1';

export const REDUX_STATUS = {
  IDLE: 'idle',
  SUCCESS: 'success',
  LOADING: 'loading',
  ERROR: 'error',
};
