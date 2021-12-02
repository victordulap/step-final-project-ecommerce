const { BASE_URL } = require('../util/constants');
const { request } = require('./Request');

const getItems = () => {
  return request.get(`${BASE_URL}/items?all=true`);
};

const getItemById = (id) => {
  return request.get(`${BASE_URL}/items/${id}`);
};

const addItem = (item) => {
  return request.post(`${BASE_URL}/items`, item);
};

export const itemsService = {
  getItems,
  getItemById,
  addItem,
};
