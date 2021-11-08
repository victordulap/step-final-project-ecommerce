import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import './style.scss';

import { DELIEVERY_PRICE } from '../../utils/constants';
import {
  decrementCount,
  getCartFromLocalStorage,
  incrementCount,
  removeFromCart,
} from '../../features/cartSlice';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import CartItem from './components/CartItem';
import CartEmpty from '../../components/CartEmpty';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const cartTotal = useSelector((state) => state.cart.cartTotal);

  useEffect(() => {
    dispatch(getCartFromLocalStorage());
  }, [dispatch]);

  return (
    <main className="cart">
      <div className="container">
        <section className="header">
          <h1 className="letter-spacing">my bag</h1>
        </section>
        <section className="cart-items">
          {cart.length > 0 ? (
            cart.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                cartItemId={cartItem.id}
                itemId={cartItem.item._id}
                imgUrl={cartItem.item.imgUrl}
                title={cartItem.item.brand[0].name + ' ' + cartItem.item.title}
                cartItemPrice={(cartItem.item.price * cartItem.count).toFixed(
                  2
                )}
                color={cartItem.item.color}
                selectedSize={cartItem.selectedSize}
                count={cartItem.count}
                decrementCallback={() =>
                  dispatch(decrementCount({ id: cartItem.id }))
                }
                incrementCallback={() =>
                  dispatch(incrementCount({ id: cartItem.id }))
                }
                removeCallback={() => {
                  dispatch(
                    removeFromCart({
                      id: cartItem.id,
                    })
                  );
                }}
              />
            ))
          ) : (
            <CartEmpty />
          )}
        </section>
        {cart.length > 0 && (
          <>
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
                <Button
                  dark
                  size="l"
                  block
                  text="CHECKOUT"
                  disabled={cartTotal <= 0}
                  linkTo="/checkout"
                />
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default Cart;
