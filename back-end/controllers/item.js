const Item = require('../models/Item');
const Brand = require('../models/Brand');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getAllItems = async (req, res) => {
  const { title, brandIds, categoryIds, colors, sort, fields, numericFilters } =
    req.query;
  const queryObject = {
    available: true,
  };

  if (colors) {
    const filter = colors.split(',');
    queryObject.color = { $in: filter };
  }
  if (brandIds) {
    const filter = brandIds.split(',');
    queryObject.brandId = filter;
  }
  if (categoryIds) {
    const filter = categoryIds.split(',');
    queryObject.categoryIds = filter;
  }
  if (title) {
    queryObject.title = { $regex: title, $options: 'i' };
  }

  // if (numericFilters) {
  //   const operatorMap = {
  //     '>': '$gt',
  //     '>=': '$gte',
  //     '=': '$eq',
  //     '<': '$lt',
  //     '<=': '$lte',
  //   };
  //   const regEx = /\b(<|>|>=|=|<|<=)\b/g;
  //   let filters = numericFilters.replace(
  //     regEx,
  //     (match) => `-${operatorMap[match]}-`
  //   );
  //   const options = ['price', 'rating'];
  //   filters = filters.split(',').forEach((item) => {
  //     const [field, operator, value] = item.split('-');
  //     if (options.includes(field)) {
  //       queryObject[field] = { [operator]: Number(value) };
  //     }
  //   });
  // }

  let result = Item.find(queryObject);
  // // sort
  // if (sort) {
  //   const sortList = sort.split(',').join(' ');
  //   result = result.sort(sortList);
  // } else {
  //   result = result.sort('createdAt');
  // }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  // 23 items
  // 4 pages
  // items per page - 7 7 7 2

  const items = await result;
  res.status(200).json({ items, nbHits: items.length });
};

const getItemById = async (req, res) => {
  const { id } = req.params;

  const item = await Item.aggregate([
    {
      $match: { _id: ObjectId(id) },
    },
    {
      $limit: 1,
    },
    {
      $lookup: {
        from: 'brands',
        localField: 'brandId',
        foreignField: '_id',
        as: 'brand',
      },
    },
  ]);

  res.status(200).json({ item });
};

module.exports = {
  getAllItems,
  getItemById,
};
