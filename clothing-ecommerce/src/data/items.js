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
      'Club C',
      brands[3],
      [categories[1]],
      ['39eu', '40 eu', '41 eu', '42 eu', '43 eu', '44 eu'],
      'chalk',
      75,
      'Leather upper',
      'https://images.asos-media.com/products/reebok-club-c-trainers-in-chalk/11036007-1-white?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Item(
      'Blazer Low 77 VNTG',
      brands[0],
      [categories[1]],
      ['39eu', '41 eu', '42 eu', '43 eu', '44 eu'],
      'white',
      79,
      'Leather and suede upper',
      'https://images.asos-media.com/products/nike-blazer-low-77-vntg-trainers-in-white-black/22497420-1-whiteblack?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Item(
      'Ozweego',
      brands[1],
      [categories[1]],
      ['41 eu', '42 eu', '43 eu', '44 eu'],
      'beige',
      89,
      'Leather and mesh upper',
      'https://images.asos-media.com/products/adidas-originals-ozweego-trainers-in-beige/21907360-1-beige?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Item(
      'Wild Rider',
      brands[2],
      [categories[1]],
      ['41 eu', '42 eu', '43 eu', '44 eu', '45 eu'],
      'gray',
      79,
      'Textile and faux-suede upper ',
      'https://images.asos-media.com/products/puma-wild-rider-trainers-in-grey-and-white/24211521-1-nimbuscloudgrayvi?$n_640w$&wid=513&fit=constrain'
    ),
  },
];
