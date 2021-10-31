require('dotenv').config();

const connectDB = require('../db/connect');
const Brand = require('../models/Brand');
const Category = require('../models/Category');
const Item = require('../models/Item');

const jsonBrands = require('./brands.json');
const jsonCategories = require('./categories.json');
const jsonItems = require('./items.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    // await Brand.deleteMany();
    // await Brand.create(jsonBrands);
    // await Category.deleteMany();
    // await Category.create(jsonCategories);
    await Item.deleteMany();
    await Item.create(jsonItems);
    console.log('Success!!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
