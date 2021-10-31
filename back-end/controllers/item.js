const Item = require('../models/Item');

const getAllItems = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // if (featured) {
  //   queryObject.featured = featured === 'true' ? true : false;
  // }
  // if (company) {
  //   queryObject.company = company;
  // }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
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

  // if (fields) {
  //   const fieldsList = fields.split(',').join(' ');
  //   result = result.select(fieldsList);
  // }
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;
  // const skip = (page - 1) * limit;
  // result = result.skip(skip).limit(limit);
  // // 23
  //  // 4 7 7 7 2

  const items = await result;
  res.status(200).json({ items, nbHits: items.length });
};

module.exports = {
  getAllItems,
};
