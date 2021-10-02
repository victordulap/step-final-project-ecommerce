import { v4 as uuid } from 'uuid';

class Brand {
  constructor(name) {
    this.id = uuid();
    this.name = name;
  }
}

export const brands = [
  {
    ...new Brand('Nike'),
  },
  {
    ...new Brand('Adidas'),
  },
  {
    ...new Brand('Puma'),
  },
];
