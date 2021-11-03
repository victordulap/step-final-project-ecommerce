import React from 'react';
import './ShopItemCard.scss';

const ShopItemCardSkeleton = () => {
  return (
    <div className="item-card item-card-loading">
      <div className="item-card-image-container"></div>
      <p className="item-card-title"></p>
      <p className="item-card-color"></p>
      <p className="item-card-price"></p>
    </div>
  );
};

export default ShopItemCardSkeleton;
