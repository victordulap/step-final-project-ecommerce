const { NotFoundError } = require('../errors');
const Category = require('../models/Category');
const Item = require('../models/Item');

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

const addCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ category });
};

const removeCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOneAndDelete({ _id: id });
  if (!category) {
    throw new NotFoundError(`No category with id : ${id}`);
  }

  const { _id: deletedCategoryId } = category;

  const { deletedCount } = await Item.deleteMany({ categoryIds: { $in: [deletedCategoryId] } });

  res.status(200).json({ category, deletedItemsNb: deletedCount });
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    throw new NotFoundError(`No category with id : ${id}`);
  }

  res.status(200).json({ category });
};

module.exports = {
  getAllCategories,
  getCategory,
  addCategory,
  removeCategory,
  updateCategory,
};
