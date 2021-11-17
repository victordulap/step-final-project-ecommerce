import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../service/AuthService';

export const authAction = createAsyncThunk(
  'auth/authAction',
  async (user, { rejectWithValue }) => {
    try {
      const result = await authService.login(user);
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('user', JSON.stringify(result.data.user));
      return result.data;
    } catch (err) {
      let error = err;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data.title);
    }
  }
);
