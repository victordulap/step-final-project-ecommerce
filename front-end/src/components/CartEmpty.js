import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Button from './Button';
import './CartEmpty.scss';

const CartEmpty = () => {
  return (
    <div className="cart-empty-container">
      <div>
        <AiOutlineShoppingCart className="cart-empty-icon" />
      </div>
      <p>Your cart is empty</p>
      <Button linkTo={'/'} size="l" text="Go shopping" />
    </div>
  );
};

export default CartEmpty;
