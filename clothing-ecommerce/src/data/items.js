import { v4 as uuid } from 'uuid';
import { brands } from './brands';
import { categories } from './categories';

class Item {
  constructor(
    title,
    brand,
    categories,
    sizes,
    color,
    price,
    description,
    imgUrl
  ) {
    this.id = uuid();
    this.title = title;
    this.brand = brand;
    this.categories = categories;
    this.sizes = sizes;
    this.color = color;
    this.price = price.toFixed(2);
    this.description = description;
    this.imgUrl = imgUrl;
  }
}

export const items = [
  {
    ...new Item(
      'Air Force 1',
      brands[0],
      [categories[1]],
      ['40 eu', '41 eu', '42 eu', '43 eu', '44 eu', '45 eu'],
      'white',
      89,
      'Matte leather upper',
      'https://images.asos-media.com/products/nike-air-force-1-07-in-white/23916587-1-white?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Item(
      'Air Force 1',
      brands[0],
      [categories[1]],
      ['40 eu', '41 eu', '42 eu', '43 eu', '44 eu', '45 eu'],
      'white',
      199,
      'Matte leather upper',
      'https://images.asos-media.com/products/nike-air-force-1-07-in-white/23916587-1-white?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Item(
      'Air Force 1',
      brands[0],
      [categories[1]],
      ['40 eu', '41 eu', '42 eu', '43 eu', '44 eu', '45 eu'],
      'white',
      99,
      'Matte leather upper',
      'https://images.asos-media.com/products/nike-air-force-1-07-in-white/23916587-1-white?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Item(
      'Air Force 1',
      brands[0],
      [categories[1]],
      ['40 eu', '41 eu', '42 eu', '43 eu', '44 eu', '45 eu'],
      'white',
      99,
      'Matte leather upper',
      'https://images.asos-media.com/products/nike-air-force-1-07-in-white/23916587-1-white?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Item(
      'Air Force 1',
      brands[0],
      [categories[1]],
      ['40 eu', '41 eu', '42 eu', '43 eu', '44 eu', '45 eu'],
      'white',
      99,
      'Matte leather upper',
      'https://images.asos-media.com/products/nike-air-force-1-07-in-white/23916587-1-white?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Item(
      'Air Force 1',
      brands[0],
      [categories[1]],
      ['40 eu', '41 eu', '42 eu', '43 eu', '44 eu', '45 eu'],
      'white',
      99,
      'Matte leather upper',
      'https://images.asos-media.com/products/nike-air-force-1-07-in-white/23916587-1-white?$n_640w$&wid=513&fit=constrain'
    ),
  },
];
