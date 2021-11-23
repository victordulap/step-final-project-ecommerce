const express = require('express');
const router = express.Router();

const { getAllOrders, createOrder, getOrder } = require('../controllers/order');

router.route('/').get(getAllOrders).post(createOrder);
router.route('/:id').get(getOrder);

module.exports = router;
