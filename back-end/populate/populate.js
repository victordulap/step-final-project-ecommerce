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
    // await Item.deleteMany();
    // await Item.create(jsonItems);

    await Item.create({
      title: 'Retro logo premium oversized t-shirt',
      brandId: '617eea31868b5181b26bb737',
      categoryIds: ['617eed4a7cebea8f9b5702f6'],
      sizes: ['s', 'm', 'l', 'xl'],
      color: 'green',
      price: 75,
      description: 'Soft, breathable jersey',
      imgUrl:
        'https://images.asos-media.com/products/nike-retro-logo-premium-oversized-t-shirt-in-noble-green/200304312-1-green?$n_640w$&wid=513&fit=constrain',
    });
    console.log('Success!!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
