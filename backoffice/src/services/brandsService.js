const { BASE_URL } = require('../util/constants');
const { request } = require('./Request');

const getAllBrands = () => {
  return request.get(`${BASE_URL}/brands`);
};

export const brandsService = {
  getAllBrands,
};
