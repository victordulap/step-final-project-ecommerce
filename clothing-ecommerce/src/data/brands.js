import { v4 as uuid } from 'uuid';

class Brand {
  constructor(name, imageUrl) {
    this.id = uuid();
    this.name = name;
    this.imageUrl = imageUrl;
  }
}

export const brands = [
  {
    ...new Brand(
      'Nike',
      'https://www.pittwatergolfcentre.com.au/wp-content/uploads/2014/11/nike-logo-square.png'
    ),
  },
  {
    ...new Brand(
      'Adidas',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png'
    ),
  },
  {
    ...new Brand(
      'Puma',
      'https://www.step.org.uk/app/uploads/2018/07/Puma-logo-PNG-Transparent-Background.png'
    ),
  },
];
