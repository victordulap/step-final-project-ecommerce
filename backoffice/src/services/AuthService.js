import { BASE_URL } from '../util/constants';
import { request } from './Request';

const login = ({ username, password }) => {
  return request.post(`${BASE_URL}/auth/login`, { username, password });
};

export const authService = {
  login,
};
