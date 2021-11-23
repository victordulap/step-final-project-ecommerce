const express = require('express');
const router = express.Router();

const { getAllBrands, getBrand } = require('../controllers/brand');

router.route('/').get(getAllBrands);
router.route('/:id').get(getBrand);

module.exports = router;
