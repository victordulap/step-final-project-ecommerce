const { BASE_URL } = require('../util/constants');
const { request } = require('./Request');

const getAllBrands = () => {
  return request.get(`${BASE_URL}/brands`);
};

const getBrand = (id) => {
  return request.get(`${BASE_URL}/brands/${id}`);
};

const addBrand = (brand) => {
  return request.post(`${BASE_URL}/brands`, brand);
};

export const brandsService = {
  getAllBrands,
  getBrand,
  addBrand,
};
