const Order = require('../models/Order');

const getAllOrders = async (req, res) => {
  let result = Order.find({});

  const orders = await result;
  res.status(200).json({ orders, nbHits: orders.length });
};

const createOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json({ order });
};

module.exports = {
  getAllOrders,
  createOrder,
};
