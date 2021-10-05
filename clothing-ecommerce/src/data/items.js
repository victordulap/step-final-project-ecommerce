import { v4 as uuid } from 'uuid';
import { brands } from './brands';
import { categories } from './categories';

class Item {
  constructor(title, brand, categories) {
    this.id = uuid();
    this.title = title;
    this.brand = brand;
    this.categories = categories;
  }
}

export const items = [
  {
    ...new Item('Air Force 1', brands[0], [categories[1]]),
  },
  {
    ...new Item('Air Force 1', brands[0], [categories[1]]),
  },
  {
    ...new Item('Air Force 1', brands[0], [categories[1]]),
  },
];
