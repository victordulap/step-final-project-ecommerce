import { v4 as uuid } from 'uuid';

class Category {
  constructor(name) {
    this.id = uuid();
    this.name = name;
  }
}

export const categories = [
  {
    ...new Category('T-Shirts'),
  },
  {
    ...new Category('Shoes'),
  },
  {
    ...new Category('Trousers'),
  },
  {
    ...new Category('Jackets'),
  },
  {
    ...new Category('Hoodies'),
  },
  {
    ...new Category('Jeans'),
  },
  {
    ...new Category('Accesories'),
  },
];
