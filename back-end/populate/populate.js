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

    await Item.insertMany([
      {
        title: 'central logo t-shirt',
        brandId: '617eea31868b5181b26bb73a',
        categoryIds: ['617eed4a7cebea8f9b5702f6'],
        sizes: ['s', 'm', 'l', 'xl'],
        color: 'brown',
        price: 35,
        description: 'Soft, breathable jersey',
        imgUrl:
          'https://images.asos-media.com/products/reebok-central-logo-t-shirt-in-taupe-brown-exclusive-to-asos/200567274-1-grey?$n_640w$&wid=513&fit=constrain',
      },
      {
        title: 'central logo t-shirt',
        brandId: '617eea31868b5181b26bb73a',
        categoryIds: ['617eed4a7cebea8f9b5702f6'],
        sizes: ['s', 'm', 'l', 'xl'],
        color: 'beige',
        price: 35,
        description: 'Soft, breathable jersey',
        imgUrl:
          'https://images.asos-media.com/products/reebok-classics-natural-dye-t-shirt-in-sepia/23355219-1-sepia?$n_640w$&wid=513&fit=constrain',
      },
      {
        title: 'three stripe central logo t-shirt',
        brandId: '617eea31868b5181b26bb738',
        categoryIds: ['617eed4a7cebea8f9b5702f6'],
        sizes: ['s', 'm', 'l', 'xl'],
        color: 'white',
        price: 23,
        description: 'Soft, breathable jersey',
        imgUrl:
          'https://images.asos-media.com/products/adidas-originals-three-stripe-central-logo-t-shirt-in-white/13673751-1-wh1white1?$n_640w$&wid=513&fit=constrain',
      },
      {
        title: 'three stripe central logo t-shirt',
        brandId: '617eea31868b5181b26bb738',
        categoryIds: ['617eed4a7cebea8f9b5702f6'],
        sizes: ['s', 'm', 'l', 'xl'],
        color: 'black',
        price: 23,
        description: 'Soft, breathable jersey',
        imgUrl:
          'https://images.asos-media.com/products/adidas-originals-three-stripe-central-logo-t-shirt-in-black/13673748-1-bk1black1?$n_640w$&wid=513&fit=constrain',
      },
    ]);
    console.log('Success!!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
