const CustomAPIError = require('../errors/custom-api');
const NotFoundError = require('../errors/not-found');
const Brand = require('../models/Brand');
const Item = require('../models/Item');

const getAllBrands = async (req, res) => {
  const { name } = req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = name;
  }

  let result = Brand.find(queryObject);

  const brands = await result;
  res.status(200).json({ brands, nbHits: brands.length });
};

const getBrand = async (req, res) => {
  const { id } = req.params;
  let result = Brand.findById(id);
  const brand = await result;
  res.status(200).json({ brand });
};

const addBrand = async (req, res) => {
  const brand = await Brand.create(req.body);
  res.status(201).json({ brand });
};

const removeBrand = async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findOneAndDelete({ _id: id });
  if (!brand) {
    throw new NotFoundError(`No brand with id : ${id}`);
  }

  const { _id: deletedBrandId } = brand;

  const { deletedCount } = await Item.deleteMany({ brandId: deletedBrandId });

  res.status(200).json({ brand, deletedItemsNb: deletedCount });
};

const updateBrand = async (req, res) => {
  const { id } = req.params;
  const brand = await Brand.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!brand) {
    throw new NotFoundError(`No brand with id : ${id}`);
  }

  res.status(200).json({ brand });
};

module.exports = {
  getAllBrands,
  getBrand,
  addBrand,
  removeBrand,
  updateBrand,
};
