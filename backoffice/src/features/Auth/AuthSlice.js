import { createSlice } from '@reduxjs/toolkit';
import { STATE_STATUSES } from '../../util/constants';
import { authAction } from './AuthActions';

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    authError: '',
  },
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: {
    [authAction.pending]: (state, action) => {
      state.status = STATE_STATUSES.LOADING;
    },
    [authAction.fulfilled]: (state, action) => {
      state.status = STATE_STATUSES.SUCCESS;
      state.token = action.payload.token;
      state.authError = '';
    },
    [authAction.rejected]: (state, action) => {
      state.status = STATE_STATUSES.ERROR;
      state.authError = action.payload;
    },
  },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice;
