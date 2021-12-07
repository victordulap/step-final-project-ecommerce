import { BASE_URL } from '../../util/constants';

const defaultOptions = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const interceptorRequest = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }

  return config;
};

const interceptorRequestError = (error) => Promise.reject(error);
const interceptorResponse = (response) => response;

const interceptorResponseError = (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return Promise.reject(error);
};

export { interceptorRequest, interceptorRequestError, interceptorResponse, interceptorResponseError };

export default defaultOptions;
