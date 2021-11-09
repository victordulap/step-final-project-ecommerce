const express = require('express');
const router = express.Router();

const { getAllOrders, createOrder } = require('../controllers/order');

router.route('/').get(getAllOrders).post(createOrder);

module.exports = router;