import React from 'react';
import '../style.scss';

const ItemSkeleton = () => {
  return (
    <main
      className="item-details item-skeleton"
      style={{ position: 'relative' }}
    >
      <div className="container">
        <div className="item-image-container"></div>
        <p className="item-title"></p>
        <p className="item-price"></p>
        <p className="item-color"></p>
        <div className="item-description">
          <p className="item-description-header"></p>
          <p className="item-description-text"></p>
        </div>
      </div>
    </main>
  );
};

export default ItemSkeleton;
