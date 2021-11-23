const { BASE_URL } = require('../util/constants');
const { request } = require('./Request');

const getAllCategories = () => {
  return request.get(`${BASE_URL}/categories`);
};

const getCategory = (id) => {
  return request.get(`${BASE_URL}/categories/${id}`);
};

export const categoriesService = {
  getAllCategories,
  getCategory,
};
