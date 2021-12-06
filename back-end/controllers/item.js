const Item = require('../models/Item');
const Brand = require('../models/Brand');
const Category = require('../models/Category');
const mongoose = require('mongoose');
const { validate } = require('../models/Item');
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
          id: '$category._id',
          name: '$category.name',
        },
        sizes: '$sizes',
        colors: '$color',
        brands: {
          name: '$brand.name',
          id: '$brand._id',
        },
      },
    },
  ];

  const filters = await Item.aggregate(aggregateArr2);
  if (filters && filters.length > 0) {
    const filterKeys = Object.keys(filters[0]).map((key) => [key, []]);
    let finalFilters = Object.fromEntries(filterKeys); // { color: [], brand: [], category: [], size: [] }

    filters.forEach((f) => {
      for (let [k, v] of Object.entries(f)) {
        if (Array.isArray(v)) {
          if (!finalFilters[k].some((curr) => v.includes(curr.name))) finalFilters[k].push(...v.map((val) => ({ name: val })));
        } else if (typeof v === 'object') {
          if (!finalFilters[k].find((val) => JSON.stringify(val) === JSON.stringify(v))) {
            finalFilters[k].push(v);
          }
        } else {
          if (!finalFilters[k].some((curr) => v.includes(curr.name))) finalFilters[k].push({ name: v });
        }
      }
    });

    return finalFilters;
  }

  return null;
};

const getAllItems = async (req, res) => {
  try {
    const { title, brandIds, categoryIds, colors, sizes, sort, fields, numericFilters, search, all } = req.query;
    let { shopTitle, filterFields } = req.query;
    const queryObject = {
      available: true,
    };

    shopTitleArr = [];

    if (all) {
      const items = await Item.aggregate([
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
      ]);
      return res.status(200).json({
        items,
        nbHits: items.length,
      });
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
    if (colors) {
      const filter = colors.split(',');
      queryObject.color = { $in: filter };
    }
    if (sizes) {
      const filter = sizes.split(',');
      queryObject.sizes = { $in: filter };
    }
    if (search) {
      queryObject.title = { $regex: search, $options: 'i' };
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
      fieldsList = fieldsList.reduce((prev, curr) => ({ ...prev, [curr]: 1 }), {});
      aggregateArr.push({ $project: fieldsList });
    }

    let result = Item.aggregate(aggregateArr);

    // sort
    if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    }

    if (filterFields) {
      filterFields = await getFilters(queryObject);
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
  ]);

  res.status(200).json({ item: item[0] });
};

const addItem = async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json({ item });
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    throw new NotFoundError(`No item with id : ${id}`);
  }

  res.status(200).json({ item });
};

module.exports = {
  getAllItems,
  getItemById,
  addItem,
  updateItem,
};
