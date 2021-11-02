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
        title: 'Air Max 97 SE trainers',
        brandId: '617eea31868b5181b26bb737',
        categoryIds: ['617eed4a7cebea8f9b5702f7'],
        sizes: ['40 eu', '41 eu', '42 eu', '43 eu'],
        color: 'red',
        price: 110,
        description: 'Mesh, leather and faux-leather upper',
        imgUrl:
          'https://images.asos-media.com/products/nike-air-max-97-se-trainers-in-red-and-grey/23725088-1-red?$n_640w$&wid=513&fit=constrain',
      },
      {
        title: 'Air Max 95 Essential',
        brandId: '617eea31868b5181b26bb737',
        categoryIds: ['617eed4a7cebea8f9b5702f7'],
        sizes: ['40 eu', '41 eu', '42 eu', '43 eu'],
        color: 'white',
        price: 150,
        description: 'Mesh, ripstop and leather upper',
        imgUrl:
          'https://images.asos-media.com/products/nike-air-max-95-essential-in-white/22730052-1-white?$n_640w$&wid=513&fit=constrain',
      },
      {
        title: 'Cali Star trainers',
        brandId: '617eea31868b5181b26bb739',
        categoryIds: ['617eed4a7cebea8f9b5702f7'],
        sizes: ['40 eu', '41 eu', '42 eu', '43 eu'],
        color: 'pink',
        price: 90,
        description: 'Matte leather upper',
        imgUrl:
          'https://images.asos-media.com/products/puma-cali-star-trainers-in-chalk-and-rose-gold/24253132-1-ivoryglowrosegold?$n_640w$&wid=513&fit=constrain',
      },
      {
        title: 'Cali Star trainers',
        brandId: '617eea31868b5181b26bb739',
        categoryIds: ['617eed4a7cebea8f9b5702f7'],
        sizes: ['40 eu', '41 eu', '42 eu', '43 eu'],
        color: 'white',
        price: 80,
        description: 'Matte leather upper',
        imgUrl:
          'https://images.asos-media.com/products/puma-cali-star-trainers-in-white-silver/201217087-1-white?$n_640w$&wid=513&fit=constrain',
      },
      {
        title: 'Originals NY 90 trainers',
        brandId: '617eea31868b5181b26bb738',
        categoryIds: ['617eed4a7cebea8f9b5702f7'],
        sizes: ['40 eu', '41 eu', '42 eu', '43 eu'],
        color: 'white',
        price: 70,
        description: 'Smooth faux-leather upper',
        imgUrl:
          'https://images.asos-media.com/products/adidas-originals-ny-90-trainers-in-white-with-blue-stripes/24278814-1-white?$n_640w$&wid=513&fit=constrain',
      },
      {
        title: 'Originals Forum Low trainers',
        brandId: '617eea31868b5181b26bb738',
        categoryIds: ['617eed4a7cebea8f9b5702f7'],
        sizes: ['40 eu', '41 eu', '42 eu', '43 eu'],
        color: 'white',
        price: 70,
        description: 'Coated leather upper',
        imgUrl:
          'https://images.asos-media.com/products/adidas-originals-forum-low-trainers-in-white-with-gold-stripes/24280228-1-white?$n_640w$&wid=513&fit=constrain',
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
