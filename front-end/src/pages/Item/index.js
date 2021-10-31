import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Button from '../../components/Button';
import { addToCart } from '../../features/cartSlice';
import { getItemById } from '../../features/shopItemsSlice';
import './style.scss';

const NO_VALUE = 'no value';

const Item = () => {
  const selectedSize = useRef(NO_VALUE);
  const [sizeError, setSizeError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const urlSearch = useParams();
  const itemId = urlSearch.id;

  const dispatch = useDispatch();
  const currentItem = useSelector((state) => state.shopItems.currentItem);

  useEffect(() => {
    dispatch(getItemById({ id: itemId }));
  }, []);

  useEffect(() => {
    // console.log(currentItem);
  }, [currentItem]);

  if (!currentItem || !currentItem.title) {
    return (
      <main>
        <h1 style={{ fontSize: 20, textAlign: 'center', lineHeight: 10 }}>
          Item not found
        </h1>
      </main>
    );
  }

  const handleSizeChange = (event) => {
    selectedSize.current = event.target.value;

    if (selectedSize.current !== NO_VALUE) {
      setSizeError(false);
    }
  };

  const handleAddToCard = () => {
    if (selectedSize.current === NO_VALUE) {
      setSizeError(true);
      setAddedToCart(false);
    } else {
      // add to cart
      dispatch(
        addToCart({
          item: currentItem,
          selectedSize: selectedSize.current,
        })
      );

      // display notification, added to cart
      setAddedToCart((oldState) => (oldState ? 'more' : true));
    }
  };

  return (
    <main style={{ position: 'relative' }}>
      <div className="item-image-container">
        <img
          src={currentItem.imgUrl}
          alt={currentItem.title}
          className="item-img"
        />
      </div>
      <div className="container">
        <h1 className="item-title">
          {currentItem.brand.name} {currentItem.title}
        </h1>
        <p className="item-price">&#36;{currentItem.price}</p>
        <p className="item-color">
          <strong className="letter-spacing">COLOR:</strong> {currentItem.color}
        </p>
        <div className="item-size">
          {sizeError && <p className="item-size-error">Please select size</p>}
          <p>
            <strong className="letter-spacing">SIZE:</strong>
            {/* TODO: add drop box */}
            <select name="sizes" id="sizes" onChange={handleSizeChange}>
              <option defaultValue value={NO_VALUE}>
                select size
              </option>
              {currentItem.sizes.map((size, index) => (
                <option value={size} key={`size-option-${index}`}>
                  {size}
                </option>
              ))}
            </select>
          </p>
        </div>
        <div className="item-description">
          <p className="item-description-header">
            <strong className="letter-spacing">Product details</strong>
          </p>
          <p className="item-description-text">{currentItem.description}</p>
        </div>

        {addedToCart && (
          <div className="added-to-cart-notification">
            {addedToCart === 'more' ? 'Added more to cart' : 'Added to cart'}
          </div>
        )}
        <Button
          onClick={handleAddToCard}
          block
          size={'l'}
          text={addedToCart ? 'ADD MORE' : 'ADD TO CART'}
          dark
        />
      </div>
    </main>
  );
};

export default Item;
