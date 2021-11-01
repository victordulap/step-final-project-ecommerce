const { BASE_URL } = require('../utils/constants');
const { request } = require('./index');

const getAllCategories = () => {
  return request.get(`${BASE_URL}/categories`);
};

export const categoriesService = {
  getAllCategories,
};
