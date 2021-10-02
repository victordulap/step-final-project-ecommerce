import { v4 as uuid } from 'uuid';

class Category {
  constructor(name, imageUrl) {
    this.id = uuid();
    this.name = name;
    this.imageUrl = imageUrl;
  }
}

export const categories = [
  {
    ...new Category(
      'T-Shirts',
      'https://images.asos-media.com/products/nike-training-sport-clash-t-shirt-in-black/23548062-1-grey?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Category(
      'Shoes',
      'https://images.asos-media.com/products/nike-air-force-1-07-trainers-in-white/23939848-1-white?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Category(
      'Trousers',
      'https://images.asos-media.com/products/selected-homme-smart-trousers-in-slim-tapered-fit-with-elasticated-waist-in-black/24337648-1-black?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Category(
      'Jackets',
      'https://images.asos-media.com/products/asos-design-recycled-puffer-jacket-in-black/20736600-1-black?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Category(
      'Hoodies',
      'https://images.asos-media.com/products/adidas-originals-essentials-hoodie-in-blue/23572567-1-blue?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Category(
      'Jeans',
      'https://images.asos-media.com/products/asos-design-relaxed-tapered-jeans-in-less-thirsty-light-wash-with-raw-hem/200291190-1-lightwashblue?$n_640w$&wid=513&fit=constrain'
    ),
  },
  {
    ...new Category(
      'Accesories',
      'https://images.asos-media.com/products/boss-mens-blue-dial-bracelet-watch-in-silver-1513907/201012724-1-silver?$n_640w$&wid=513&fit=constrain'
    ),
  },
];
