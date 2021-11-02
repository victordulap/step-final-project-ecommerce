import './style.scss';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllItemsByBrandId,
  getAllItemsByCategoryId,
  resetState,
} from '../../features/shopItemsSlice';
import { Link } from 'react-router-dom';
import { SORT_OPTIONS } from '../../utils/constants';

const Shop = () => {
  const urlSearch = useParams();

  const shopItems = useSelector((state) => state.shopItems.value);
  const shopTitle = useSelector((state) => state.shopItems.shopTitle);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    const searchBy = urlSearch.type;

    if (searchBy === 'brands') {
      dispatch(getAllItemsByBrandId(urlSearch.id));
    } else if (searchBy === 'categories') {
      dispatch(getAllItemsByCategoryId(urlSearch.id));
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, urlSearch]);

  const handleSortSelect = (event) => {
    // const selectedOption = event.target.value;
    // sort
    // dispatch(sortShopItems({ sortOption: selectedOption }));
  };

  return (
    <main>
      <header className="header">
        <div className="container">
          <h1 className="title">{shopTitle}</h1>
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
              <Link
                to={`/item/${item._id}`}
                key={item._id}
                className="item-card"
              >
                <div className="item-card-image-container">
                  <img src={item.imgUrl} alt={item.title} />
                </div>
                <h3 className="item-card-title">
                  {item.brand[0].name} {item.title}
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
