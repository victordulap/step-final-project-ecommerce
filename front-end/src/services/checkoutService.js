const { BASE_URL } = require('../utils/constants');
const { request } = require('./index');

const createOrder = (body) => {
  return request.post(`${BASE_URL}/orders`, body);
};

export const checkoutService = {
  createOrder,
};
