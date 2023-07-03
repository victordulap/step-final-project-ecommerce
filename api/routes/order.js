const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');

const { getAllOrders, createOrder, getOrder, updateOrder, removeOrder } = require('../controllers/order');

// router.route('/').post(createOrder);
router.route('/').get(getAllOrders).post(createOrder);
router.route('/:id').get(getOrder).patch(authentication, updateOrder).delete(authentication, removeOrder);

module.exports = router;
