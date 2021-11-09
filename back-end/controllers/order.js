const Order = require('../models/Order');

const getAllOrders = async (req, res) => {
  let result = Order.find({});

  const orders = await result;
  res.status(200).json({ orders, nbHits: orders.length });
};

const createOrder = async (req, res) => {
  console.log(req.body);
  // req.body.createdBy = req.user.userId;
  // const job = await Job.create(req.body);
  res.status(201).json({ test: 'created order' });
};

module.exports = {
  getAllOrders,
  createOrder,
};
