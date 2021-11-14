import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Button from '../../components/Button';
import { addToCart } from '../../features/cartSlice';
import { getItemById } from '../../features/selectedItemSlice';
import ItemSkeleton from './components/ItemSkeleton';
import './style.scss';

const NO_VALUE = 'no value';

const Item = () => {
  const selectedSize = useRef(NO_VALUE);
  const [sizeError, setSizeError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const urlSearch = useParams();
  const itemId = urlSearch.id;

  const dispatch = useDispatch();
  const item = useSelector((state) => state.selectedItem.value);
  const isLoading = useSelector((state) => state.selectedItem.isLoading);

  useEffect(() => {
    dispatch(getItemById(itemId));
  }, [dispatch, itemId]);

  if (isLoading) {
    return <ItemSkeleton />;
  }

  if (!item || !item.title) {
    return (
      <main style={{ position: 'relative' }}>
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
          item: item,
          selectedSize: selectedSize.current,
        })
      );

      // display notification, added to cart
      setAddedToCart((oldState) => (oldState ? 'more' : true));
    }
  };

  return (
    <main className="item-details" style={{ position: 'relative' }}>
      <div className="container item-image-container">
        <img src={item.imgUrl} alt={item.title} className="item-img" />
      </div>
      <div className="container">
        <h1 className="item-title">
          {item.brand[0].name} {item.title}
        </h1>
        <p className="item-price">&#36;{item.price}</p>
        <p className="item-color">
          <strong className="letter-spacing">COLOR:</strong> {item.color}
        </p>
        <div className="item-size">
          {sizeError && <p className="item-size-error">Please select size</p>}
          <p>
            <strong className="letter-spacing">SIZE:</strong>
            <select name="sizes" id="sizes" onChange={handleSizeChange}>
              <option defaultValue value={NO_VALUE}>
                select size
              </option>
              {item.sizes.map((size, index) => (
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
          <p className="item-description-text">{item.description}</p>
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
