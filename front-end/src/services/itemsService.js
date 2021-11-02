const { BASE_URL } = require('../utils/constants');
const { request } = require('./index');

const getAllItemsByBrandId = (id) => {
  return request.get(`${BASE_URL}/items?brandIds=${id}&shopTitle=true`);
};

const getAllItemsByCategoryId = (id) => {
  return request.get(`${BASE_URL}/items?categoryIds=${id}&shopTitle=true`);
};

const getItemById = (id) => {
  return request.get(`${BASE_URL}/items/${id}`);
};

export const itemsService = {
  getAllItemsByBrandId,
  getAllItemsByCategoryId,
  getItemById,
};
