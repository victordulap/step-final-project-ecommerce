import axios from 'axios';
import defaultOptions from './interceptors';
import {
  interceptorRequest,
  interceptorRequestError,
  interceptorResponse,
  interceptorResponseError,
} from './interceptors';

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(interceptorRequest, interceptorRequestError);

instance.interceptors.response.use(
  interceptorResponse,
  interceptorResponseError
);

const get = (url) => instance.get(url);

const post = (url, body) => instance.post(url, body);

const _delete = (url) => instance.delete(url);

export const request = {
  get,
  post,
  delete: _delete,
};
