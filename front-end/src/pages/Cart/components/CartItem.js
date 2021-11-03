import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CartItem = ({
  cartItemId,
  itemId,
  imgUrl,
  title,
  cartItemPrice,
  color,
  selectedSize,
  count,
  decrementCallback,
  incrementCallback,
  removeCallback,
}) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <div className="cart-item" key={cartItemId}>
      <Link to={`/item/${itemId}`} className="cart-item-img-container">
        <img
          src={imgUrl}
          alt={title}
          className={`${isImgLoaded ? '' : 'img-loading'}`}
          onLoad={() => setIsImgLoaded(true)}
        />
      </Link>
      <div className="cart-item-info-container">
        <p className="cart-item-price">
          <strong>&#36;{cartItemPrice}</strong>
        </p>
        <p className="cart-item-title">{title}</p>
        <div className="cart-item-info">
          <p className="cart-item-color">{color}</p>
          <p className="cart-item-size">{selectedSize}</p>
          <div className="cart-item-quantity">
            <div className="cart-item-quantity-change">
              <button onClick={() => decrementCallback()}>-</button>
            </div>
            <p>Qty: {count}</p>
            <div className="cart-item-quantity-change">
              <button onClick={() => incrementCallback()}>+</button>
            </div>
          </div>
        </div>
      </div>
      <div className="cart-item-remove">
        <button onClick={() => removeCallback()}>
          {<FaTimes className="cart-item-remove-icon" />}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
