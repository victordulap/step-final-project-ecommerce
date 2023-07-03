const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');

const { getAllCategories, getCategory, addCategory, removeCategory, updateCategory } = require('../controllers/category');

router.route('/').get(getAllCategories);//.post(authentication, addCategory);
router.route('/:id').get(getCategory);//.delete(authentication, removeCategory).put(authentication, updateCategory);

module.exports = router;
