const { BASE_URL } = require('../utils/constants');
const { request } = require('./index');

const getAllItemsByBrandId = (id, page = 1) => {
  return request.get(
    `${BASE_URL}/items?brandIds=${id}&page=${page}&shopTitle=true`
  );
};

const getAllItemsByCategoryId = (id, page = 1) => {
  return request.get(
    `${BASE_URL}/items?categoryIds=${id}&page=${page}&shopTitle=true`
  );
};

const getAllItemsByCategoryIdSortedByPrice = (id, asc, page = 1) => {
  return request.get(
    `${BASE_URL}/items?categoryIds=${id}&page=${page}&shopTitle=true&sort=${
      asc ? 'price' : '-price'
    }`
  );
};

const getAllItemsByBrandIdSortedByPrice = (id, asc, page = 1) => {
  return request.get(
    `${BASE_URL}/items?brandIds=${id}&page=${page}&shopTitle=true&sort=${
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
