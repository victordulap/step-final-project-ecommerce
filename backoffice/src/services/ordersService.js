const { BASE_URL } = require('../util/constants');
const { request } = require('./Request');

const getOrders = () => {
  return request.get(`${BASE_URL}/orders`);
};

const getOrderById = (id) => {
  return request.get(`${BASE_URL}/orders/${id}`);
};

const deleteOrder = (id) => {
  return request.delete(`${BASE_URL}/orders/${id}`);
};

const updateOrder = (id, body) => {
  return request.patch(`${BASE_URL}/orders/${id}`, body);
};

export const ordersService = {
  getOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
};
