const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
  const { name } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = name;
  }

  let result = Category.find(queryObject);

  const categories = await result;
  res.status(200).json({ products: categories, nbHits: categories.length });
};

module.exports = {
  getAllCategories,
};
