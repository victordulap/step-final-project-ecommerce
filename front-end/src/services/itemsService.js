const { BASE_URL } = require('../utils/constants');
const { request } = require('./index');

const getAllItemsByBrandId = (id) => {
  return request.get(`${BASE_URL}/items?brandIds=${id}&shopTitle=true`);
};

const getAllItemsByCategoryId = (id) => {
  return request.get(`${BASE_URL}/items?categoryIds=${id}&shopTitle=true`);
};

const getAllItemsByCategoryIdSortedByPrice = (id, asc) => {
  return request.get(
    `${BASE_URL}/items?categoryIds=${id}&shopTitle=true&sort=${
      asc ? 'price' : '-price'
    }`
  );
};

const getAllItemsByBrandIdSortedByPrice = (id, asc) => {
  return request.get(
    `${BASE_URL}/items?brandIds=${id}&shopTitle=true&sort=${
      asc ? 'price' : '-price'
    }`
  );
};

const getItemById = (id) => {
  return request.get(`${BASE_URL}/items/${id}`);
};

export const itemsService = {
  getAllItemsByBrandId,
  getAllItemsByCategoryId,
  getItemById,
  getAllItemsByCategoryIdSortedByPrice,
  getAllItemsByBrandIdSortedByPrice,
};
