import { BASE_URL } from '../utils/constants';
import axios from 'axios';

const defaultOptions = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const instance = axios.create(defaultOptions);

const get = (url) => instance.get(url);

export const request = {
  get,
};
