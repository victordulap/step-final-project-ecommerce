const { BASE_URL } = require('../utils/constants');
const { request } = require('./index');

const getItems = (q) => {
  return request.get(`${BASE_URL}/items?${q}`);
};

const getItemById = (id) => {
  return request.get(`${BASE_URL}/items/${id}`);
};

export const itemsService = {
  getItems,
  getItemById,
};
