const express = require('express');
const router = express.Router();

const { getAllCategories } = require('../controllers/category');

router.route('/').get(getAllCategories);

module.exports = router;
