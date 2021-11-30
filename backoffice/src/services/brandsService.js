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

const removeBrand = (id) => {
  return request.delete(`${BASE_URL}/brands/${id}`);
};

const editBrand = (id, editedBrand) => {
  return request.put(`${BASE_URL}/brands/${id}`, editedBrand);
};

export const brandsService = {
  getAllBrands,
  getBrand,
  addBrand,
  removeBrand,
  editBrand,
};
