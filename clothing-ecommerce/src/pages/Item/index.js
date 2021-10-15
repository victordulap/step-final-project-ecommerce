import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Button from '../../components/Button';
import { getItemById } from '../../features/shopItemsSlice';
import './style.scss';

const Item = () => {
  const urlSearch = useParams();
  const itemId = urlSearch.id;

  const dispatch = useDispatch();
  const currentItem = useSelector((state) => state.shopItems.currentItem);

  useEffect(() => {
    dispatch(getItemById({ id: itemId }));
  }, []);

  useEffect(() => {
    console.log(currentItem);
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

  return (
    <main>
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
          <strong>COLOR:</strong> {currentItem.color}
        </p>
        <div className="item-size">
          <p>
            <strong>SIZE:</strong>
            {/* TODO: add drop box */}
            <select name="sizes" id="sizes">
              <option defaultValue value={null}>
                select size
              </option>
              {currentItem.sizes.map((size) => (
                <option value={size}>{size}</option>
              ))}
            </select>
          </p>
        </div>
        <div className="item-description">
          <p className="item-description-header">
            <strong>Product details</strong>
          </p>
          <p className="item-description-text">{currentItem.description}</p>
        </div>
        <Button block size={'l'} text={'ADD TO CART'} />
      </div>
    </main>
  );
};

export default Item;
