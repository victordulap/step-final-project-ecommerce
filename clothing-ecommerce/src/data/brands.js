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
      'http://www.mmksoccer.com/wp-content/uploads/2015/12/nike-logo-png-download-nike-logo-png-images-transparent-gallery-advertisement-1024.png'
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
  {
    ...new Brand(
      'Reebok',
      'https://logodownload.org/wp-content/uploads/2017/06/reebok-logo-5.png'
    ),
  },
];
