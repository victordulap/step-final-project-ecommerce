const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');

const { getAllBrands, getBrand, addBrand, removeBrand, updateBrand } = require('../controllers/brand');

router.route('/').get(getAllBrands);//.post(authentication, addBrand);
router.route('/:id').get(getBrand);//.delete(authentication, removeBrand).put(authentication, updateBrand);

module.exports = router;
