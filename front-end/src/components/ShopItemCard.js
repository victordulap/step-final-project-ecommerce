import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ShopItemCard = ({ id, imgUrl, title, color, price }) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <Link to={`/item/${id}`} key={id} className="item-card">
      <div className="item-card-image-container">
        <img
          src={imgUrl}
          alt={title}
          className={`${isImgLoaded ? '' : 'img-loading'}`}
          onLoad={() => setIsImgLoaded(true)}
        />
      </div>
      <h3 className="item-card-title">{title}</h3>
      <p className="item-card-color">{color}</p>
      <p className="item-card-price">&#36;{price}</p>
    </Link>
  );
};

export default ShopItemCard;
