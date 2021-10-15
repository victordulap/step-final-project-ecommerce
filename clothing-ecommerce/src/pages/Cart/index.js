import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import { items } from '../../data/items';
import './style.scss';

import { FaTimes } from 'react-icons/fa';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <main>
      <div className="container">
        <section className="header">
          <h1 className="letter-spacing">my bag</h1>
        </section>
        <section className="cart-items">
          <div className="cart-item">
            <div className="cart-item-img-container">
              <img src={items[0].imgUrl} alt={items[0].title} />
            </div>
            <div className="cart-item-info-container">
              <p className="cart-item-price">
                <strong>&#36;{items[0].price}</strong>
              </p>
              <p className="cart-item-title">
                {items[0].brand.name} {items[0].title}
              </p>
              <div className="cart-item-info">
                <p className="cart-item-color">{items[0].color}</p>
                <p className="cart-item-size">{'40 eu'}</p>
                <p className="cart-item-quantity">Qty: {1}</p>
              </div>
            </div>
            <div className="cart-item-remove">
              <button>{<FaTimes className="cart-item-remove-icon" />}</button>
            </div>
          </div>
          <div className="cart-item">
            <div className="cart-item-img-container">
              <img src={items[0].imgUrl} alt={items[0].title} />
            </div>
            <div className="cart-item-info-container">
              <p className="cart-item-price">
                <strong>&#36;{items[0].price}</strong>
              </p>
              <p className="cart-item-title">
                {items[0].brand.name} {items[0].title}
              </p>
              <div className="cart-item-info">
                <p className="cart-item-color">{items[0].color}</p>
                <p className="cart-item-size">{'40 eu'}</p>
                <p className="cart-item-quantity">Qty: {1}</p>
              </div>
            </div>
            <div className="cart-item-remove">
              <button>{<FaTimes className="cart-item-remove-icon" />}</button>
            </div>
          </div>
        </section>
        <section className="total">
          <p>
            <strong>
              <span className="letter-spacing">sub-total:</span> &#36;99.99
            </strong>
          </p>
        </section>
        <section className="checkout">
          <h2 className="letter-spacing">
            <strong>total: &#36;109.99</strong>
          </h2>
          <div className="checkout-price">
            <p className="letter-spacing">
              <strong>sub-total</strong>
            </p>
            <p className="price">&#36;99.99</p>
          </div>
          <div className="checkout-price">
            <p className="letter-spacing">
              <strong>delievery</strong>
            </p>
            <p className="price">&#36;10.00</p>
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
