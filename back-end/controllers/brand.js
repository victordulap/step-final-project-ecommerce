const Brand = require('../models/Brand');

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

module.exports = {
  getAllBrands,
};
