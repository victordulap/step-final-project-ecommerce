import './style.scss';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllItemsByBrandId,
  getAllItemsByBrandIdSortedByPrice,
  getAllItemsByCategoryId,
  getAllItemsByCategoryIdSortedByPrice,
  resetState,
} from '../../features/shopItemsSlice';
import { Link } from 'react-router-dom';
import { SORT_OPTIONS } from '../../utils/constants';
import Button from '../../components/Button';

const Shop = () => {
  const urlSearch = useParams();

  const shopItems = useSelector((state) => state.shopItems.value);
  const shopTitle = useSelector((state) => state.shopItems.shopTitle);
  const noMoreToLoad = useSelector((state) => state.shopItems.noMoreToLoad);
  const dispatch = useDispatch();

  const page = useRef(1);

  useEffect(() => {
    window.scrollTo(0, 0);

    const searchBy = urlSearch.type;

    if (searchBy === 'brands') {
      dispatch(getAllItemsByBrandId({ id: urlSearch.id }));
    } else if (searchBy === 'categories') {
      dispatch(getAllItemsByCategoryId({ id: urlSearch.id }));
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, urlSearch]);

  const handleSortSelect = (event) => {
    const searchBy = urlSearch.type;
    const selectedOption = event.target.value;
    if (selectedOption === SORT_OPTIONS.none) {
      if (searchBy === 'brands') {
        dispatch(getAllItemsByBrandId(urlSearch.id));
      } else if (searchBy === 'categories') {
        dispatch(getAllItemsByCategoryId(urlSearch.id));
      }
      return;
    }

    const asc = selectedOption === SORT_OPTIONS.lowUp;

    if (searchBy === 'brands') {
      dispatch(getAllItemsByBrandIdSortedByPrice({ id: urlSearch.id, asc }));
    } else if (searchBy === 'categories') {
      dispatch(getAllItemsByCategoryIdSortedByPrice({ id: urlSearch.id, asc }));
    }
  };

  const loadMore = () => {
    const searchBy = urlSearch.type;

    page.current = page.current + 1;

    if (searchBy === 'brands') {
      dispatch(getAllItemsByBrandId({ id: urlSearch.id, page: page.current }));
    } else if (searchBy === 'categories') {
      dispatch(
        getAllItemsByCategoryId({ id: urlSearch.id, page: page.current })
      );
    }
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
            {shopItems.length === 0 && '0 items found'}
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
          <div className="load-more-btn">
            {noMoreToLoad ? (
              shopItems.length > 0 && <p>{shopItems.length} items above</p>
            ) : (
              <Button onClick={loadMore} text="LOAD MORE" size="l" />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
