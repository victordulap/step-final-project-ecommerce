const Item = require('../models/Item');
const Brand = require('../models/Brand');
const Category = require('../models/Category');
const mongoose = require('mongoose');
const { ObjectId, Array: MongoArray } = mongoose.Types;

const getFilters = async (queryObj) => {
  const aggregateArr2 = [
    {
      $match: queryObj,
    },
    {
      $lookup: {
        from: 'brands',
        localField: 'brandId',
        foreignField: '_id',
        as: 'brand',
      },
    },
    {
      $unwind: {
        path: '$brand',
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryIds',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: {
        path: '$category',
      },
    },
    {
      $project: {
        _id: 0,
        categories: {
          categoryIds: '$category._id',
          categoryNames: '$category.name',
        },
        sizes: '$sizes',
        colors: '$color',
        brands: {
          brandNames: '$brand.name',
          brandIds: '$brand._id',
        },
      },
    },
  ];

  const filters = await Item.aggregate(aggregateArr2);
  if (filters) {
    const filterKeys = Object.keys(filters[0]).map((key) => [key, []]);
    let finalFilters = Object.fromEntries(filterKeys); // { color: [], brand: [], category: [], size: [] }

    console.log(finalFilters);
    filters.forEach((f) => {
      for (let [k, v] of Object.entries(f)) {
        if (Array.isArray(v)) {
          finalFilters[k].push(...v);
          finalFilters[k] = [...new Set(finalFilters[k])];
        } else if (typeof v === 'object') {
          if (
            !finalFilters[k].find(
              (val) => JSON.stringify(val) === JSON.stringify(v)
            )
          ) {
            finalFilters[k].push(v);
          }
        } else {
          finalFilters[k].push(v);
          finalFilters[k] = [...new Set(finalFilters[k])];
        }
      }
    });

    console.log(finalFilters);
    return finalFilters;
  }

  return null;
};

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
    let { shopTitle, filterFields } = req.query;
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

    const aggregateArr = [
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
      {
        $unwind: {
          path: '$brand',
        },
      },
      {
        $project: {
          _id: 1,
          imgUrl: 1,
          categoryIds: 1,
          sizes: 1,
          available: 1,
          title: 1,
          color: 1,
          price: 1,
          description: 1,
          brandName: '$brand.name',
        },
      },
    ];

    if (fields) {
      let fieldsList = fields.split(','); //.join(' ');
      // const fieldsObject = {fieldsList.map()}
      fieldsList = fieldsList.reduce(
        (prev, curr) => ({ ...prev, [curr]: 1 }),
        {}
      );
      aggregateArr.push({ $project: fieldsList });
    }

    if (filterFields) {
      filterFields = await getFilters(queryObject);
    }

    let result = Item.aggregate(aggregateArr);

    // sort
    if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
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
      filterFields: filterFields ? filterFields : null,
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
