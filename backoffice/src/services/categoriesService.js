const { BASE_URL } = require('../util/constants');
const { request } = require('./Request');

const getAllCategories = () => {
  return request.get(`${BASE_URL}/categories`);
};

export const categoriesService = {
  getAllCategories,
};
