const { BASE_URL } = require('../utils/constants');
const { request } = require('./index');

const getAllBrands = () => {
  return request.get(`${BASE_URL}/brands`);
};

export const brandsService = {
  getAllBrands,
};
