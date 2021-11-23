const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
  const { name } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  let result = Category.find(queryObject);

  const categories = await result;
  res.status(200).json({ categories, nbHits: categories.length });
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  let result = Category.findById(id);
  const category = await result;
  res.status(200).json({ category });
};

module.exports = {
  getAllCategories,
  getCategory,
};
