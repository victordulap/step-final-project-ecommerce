import { BASE_URL } from '../util/constants';
import { request } from './Request';

const baseURL = process.env.BASE_URL || BASE_URL;

const login = ({ username, password }) => {
  return request.post(`${baseURL}/auth/login`, { username, password });
};

export const authService = {
  login,
};
