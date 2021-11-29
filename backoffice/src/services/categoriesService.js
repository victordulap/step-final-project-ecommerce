const { BASE_URL } = require('../util/constants');
const { request } = require('./Request');

const getAllCategories = () => {
  return request.get(`${BASE_URL}/categories`);
};

const getCategory = (id) => {
  return request.get(`${BASE_URL}/categories/${id}`);
};

const addCategory = (category) => {
  return request.post(`${BASE_URL}/categories`, category);
};

const removeCategory = (id) => {
  return request.delete(`${BASE_URL}/categories/${id}`);
};
export const categoriesService = {
  getAllCategories,
  getCategory,
  addCategory,
  removeCategory,
};
