const express = require('express');
const router = express.Router();

const { getAllItems, getItemById } = require('../controllers/item');

router.route('/').get(getAllItems);
router.route('/:id').get(getItemById);

module.exports = router;
