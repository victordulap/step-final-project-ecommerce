const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');

const { getAllItems, getItemById } = require('../controllers/item');

router.route('/').get(getAllItems); //.post(authentication, addItem);
router.route('/:id').get(getItemById);

module.exports = router;
