const { BASE_URL } = require('../util/constants');
const { request } = require('./Request');

const getOrders = () => {
  return request.get(`${BASE_URL}/orders`);
};

const getOrderById = (id) => {
  return request.get(`${BASE_URL}/orders/${id}`);
};

export const ordersService = {
  getOrders,
  getOrderById,
};
