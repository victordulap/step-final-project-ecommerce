const express = require('express');
const router = express.Router();

const { getAllBrands } = require('../controllers/brand');

router.route('/').get(getAllBrands);

module.exports = router;
