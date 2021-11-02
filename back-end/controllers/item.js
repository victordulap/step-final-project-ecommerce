const Item = require('../models/Item');
const Brand = require('../models/Brand');
const Category = require('../models/Category');
const mongoose = require('mongoose');
const { ObjectId, Array: MongoArray } = mongoose.Types;

const getAllItems = async (req, res) => {
  try {
    const {
      title,
      brandIds,
      categoryIds,
      colors,
      sort,
      fields,
      numericFilters,
      search,
    } = req.query;
    let { shopTitle } = req.query;
    const queryObject = {
      available: true,
    };

    shopTitleArr = [];

    if (colors) {
      const filter = colors.split(',');
      queryObject.color = { $in: filter };
    }
    if (brandIds) {
      let filter = brandIds.split(',');
      filter = filter.map((f) => ObjectId(f));
      filter = MongoArray(filter);
      queryObject.brandId = { $in: filter };

      if (shopTitle) {
        const brands = await Brand.find({ _id: { $in: filter } });
        const brandNames = brands.map((b) => b.name);
        shopTitleArr.push(...brandNames);
      }
    }
    if (categoryIds) {
      let filter = categoryIds.split(',');
      filter = filter.map((f) => ObjectId(f));
      filter = MongoArray(filter);
      queryObject.categoryIds = { $in: filter };

      if (shopTitle) {
        const categories = await Category.find({ _id: { $in: filter } });
        const categoryNames = categories.map((c) => c.name);
        shopTitleArr.push(...categoryNames);
      }
    }
    if (title) {
      queryObject.title = { $regex: title, $options: 'i' };
    }
    if (search) {
      queryObject.title = { $regex: search, $options: 'i' };

      // let searchedBrandIds = await Brand.find({
      //   name: { $regex: search, $options: 'i' },
      // }).select('_id');
      // if (searchedBrandIds) {
      //   searchedBrandIds = searchedBrandIds.map((id) => id._id);
      //   console.log(searchedBrandIds);
      //   queryObject.brandId = { $in: searchedBrandIds };
      // }

      // let searchedCategoryIds = await Category.find({
      //   name: { $regex: search, $options: 'i' },
      // }).select('_id');
      // if (searchedCategoryIds) {
      //   searchedCategoryIds = searchedCategoryIds.map((id) => id._id);
      //   console.log(searchedCategoryIds);
      //   queryObject.categoryIds = { $in: searchedCategoryIds };
      // }
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

    let result = Item.aggregate([
      {
        $match: queryObject,
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
    res.status(200).json({
      shopTitle: shopTitleArr ? shopTitleArr.join(' ') : 'n/a',
      items,
      nbHits: items.length,
    });
  } catch (err) {
    console.log(err);
  }
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

  res.status(200).json({ item: item[0] });
};

module.exports = {
  getAllItems,
  getItemById,
};
