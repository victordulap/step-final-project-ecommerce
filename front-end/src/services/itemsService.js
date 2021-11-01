const { BASE_URL } = require('../utils/constants');
const { request } = require('./index');

const getAllItemsByBrandId = (id) => {
  return request.get(`${BASE_URL}/items?brandIds=${id}`);
};

export const itemsService = {
  getAllItemsByBrandId,
};
