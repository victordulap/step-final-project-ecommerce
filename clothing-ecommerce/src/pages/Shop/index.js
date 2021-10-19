import './style.scss';
import React, { useEffect, useState } from 'react';
import { Redirect, useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryByName } from '../../features/categoriesSlice';
import { items } from '../../data/items';
import { setShopItems, sortShopItems } from '../../features/shopItemsSlice';
import { filterItemsByCategoryOrBrandExact } from '../../utils/data/filterItems';
import { Link } from 'react-router-dom';
import { SORT_OPTIONS } from '../../utils/constants';

const Shop = () => {
  const urlSearch = useParams();

  const shopItems = useSelector((state) => state.shopItems.value);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    const filteredItems = filterItemsByCategoryOrBrandExact(
      items,
      urlSearch.name
    );
    dispatch(setShopItems(filteredItems));
  }, []);

  const handleSortSelect = (event) => {
    const selectedOption = event.target.value;

    dispatch(sortShopItems({ sortOption: selectedOption }));
  };

  return (
    <main>
      <header className="header">
        <div className="container">
          <h1 className="title">{urlSearch.name}</h1>
        </div>
        <div className="filter-sort-section">
          <div className="sort">
            <select name="sort" onChange={handleSortSelect}>
              {Object.keys(SORT_OPTIONS).map((key) => (
                <option key={`sort-option-${key}`} value={SORT_OPTIONS[key]}>
                  {SORT_OPTIONS[key]}
                </option>
              ))}
            </select>
          </div>
          <button className="filter">Filter</button>
        </div>
      </header>
      <section className="items">
        <div className="container">
          <p className="items-found">
            {shopItems.length} item{shopItems.length === 1 || 's'} found
          </p>
          <div className="item-cards-container">
            {shopItems.map((item) => (
              <Link to={`/item/${item.id}`} key={item.id} className="item-card">
                <div className="item-card-image-container">
                  <img src={item.imgUrl} alt={item.title} />
                </div>
                <h3 className="item-card-title">
                  {item.brand.name} {item.title}
                </h3>
                <p className="item-card-color">{item.color}</p>
                <p className="item-card-price">&#36;{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
