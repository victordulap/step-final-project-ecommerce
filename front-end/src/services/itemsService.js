const { BASE_URL } = require('../utils/constants');
const { request } = require('./index');

const getAllItemsByBrandId = (id) => {
  return request.get(`${BASE_URL}/items?brandIds=${id}`);
};

const getAllItemsByCategoryId = (id) => {
  return request.get(`${BASE_URL}/items?categoryIds=${id}`);
};

export const itemsService = {
  getAllItemsByBrandId,
  getAllItemsByCategoryId,
};
