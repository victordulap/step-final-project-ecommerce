const express = require('express');
const router = express.Router();

const { getAllCategories, getCategory } = require('../controllers/category');

router.route('/').get(getAllCategories);
router.route('/:id').get(getCategory);

module.exports = router;
