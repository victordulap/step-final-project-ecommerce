import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { v4 as uuid } from 'uuid';
import { items } from '../../data/items';
import './style.scss';

import { FaTimes } from 'react-icons/fa';
import { DELIEVERY_PRICE } from '../../utils/constants';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);

  const [cartTotal, setCartTotal] = useState(0);

  const getCartTotal = () => {
    if (cart.length > 0) {
      return cart.reduce((a, b) => +a + +b.item.price * b.count, 0);
    } else {
      return 0;
    }
  };

  useEffect(() => {
    setCartTotal(getCartTotal());
  }, []);

  return (
    <main className="cart">
      <div className="container">
        <section className="header">
          <h1 className="letter-spacing">my bag</h1>
        </section>
        <section className="cart-items">
          {cart.map((cartItem) => (
            <div className="cart-item" key={`cart-item-${uuid()}`}>
              <div className="cart-item-img-container">
                <img src={cartItem.item.imgUrl} alt={cartItem.item.title} />
              </div>
              <div className="cart-item-info-container">
                <p className="cart-item-price">
                  <strong>
                    &#36;{(cartItem.item.price * cartItem.count).toFixed(2)}
                  </strong>
                </p>
                <p className="cart-item-title">
                  {cartItem.item.brand.name} {cartItem.item.title}
                </p>
                <div className="cart-item-info">
                  <p className="cart-item-color">{cartItem.item.color}</p>
                  <p className="cart-item-size">{cartItem.selectedSize}</p>
                  <p className="cart-item-quantity">Qty: {cartItem.count}</p>
                </div>
              </div>
              <div className="cart-item-remove">
                <button>{<FaTimes className="cart-item-remove-icon" />}</button>
              </div>
            </div>
          ))}
        </section>
        <section className="total">
          <p>
            <strong>
              <span className="letter-spacing">sub-total:</span> &#36;
              {cartTotal.toFixed(2)}
            </strong>
          </p>
        </section>
        <section className="checkout">
          <h2 className="letter-spacing">
            <strong>
              total: &#36;{(cartTotal + DELIEVERY_PRICE).toFixed(2)}
            </strong>
          </h2>
          <div className="checkout-price">
            <p className="letter-spacing">
              <strong>sub-total</strong>
            </p>
            <p className="price">&#36;{cartTotal.toFixed(2)}</p>
          </div>
          <div className="checkout-price">
            <p className="letter-spacing">
              <strong>delievery</strong>
            </p>
            <p className="price">&#36;{DELIEVERY_PRICE.toFixed(2)}</p>
          </div>
          <div
            className="checkout-btn
          "
          >
            <Button dark size="l" block text="CHECKOUT" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Cart;
