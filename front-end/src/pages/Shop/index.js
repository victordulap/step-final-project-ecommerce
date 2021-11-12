import './style.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getItems, resetState } from '../../features/shopItemsSlice';
import { SORT_OPTIONS } from '../../utils/constants';
import Button from '../../components/Button';
import ShopItemCard from '../../components/ShopItemCard';
import ShopItemCardSkeleton from '../../components/ShopItemCardSkeleton';
import queryString from 'query-string';
import { useLocation, useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import FilterModal from './components/FilterModal';

const initialFilterOptions = [
  {
    title: 'Categories',
    options: ['shoes', 't-shirts'],
    show: false,
  },
  {
    title: 'Brands',
    options: ['nike', 'adidas'],
    show: false,
  },
];

const Shop = () => {
  const shopItems = useSelector((state) => state.shopItems.value);
  const filterFields = useSelector((state) => state.shopItems.filterFields);
  const isLoading = useSelector((state) => state.shopItems.isLoading);
  const shopTitle = useSelector((state) => state.shopItems.shopTitle);
  const noMoreToLoad = useSelector((state) => state.shopItems.noMoreToLoad);
  const dispatch = useDispatch();

  const history = useHistory();
  const urlSearch = useParams();
  const { search } = useLocation();

  const page = useRef(1);
  const [query, setQuery] = useState(queryString.parse(search));
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.none.param);
  const [filterOptions, setFilterOptions] = useState([]);

  const getDefaultUrlParams = useCallback(() => {
    const queryObj = {};

    queryObj.shopTitle = true;
    queryObj.filterFields = true;
    queryObj.page = 1;
    if (urlSearch.type === 'brands') {
      queryObj.brandIds = urlSearch.id;
    } else if (urlSearch.type === 'categories') {
      queryObj.categoryIds = urlSearch.id;
    }

    return queryObj;
  }, [urlSearch.id, urlSearch.type]);

  useEffect(() => {
    // window.scrollTo(0, 0);
    page.current = 1;
    let queryObj = queryString.parse(search);
    setSortOption(queryObj.sort || SORT_OPTIONS.none.param);

    // default params for api call
    queryObj = { ...queryObj, ...getDefaultUrlParams() };

    const q = Object.entries(queryObj)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    console.log(q);

    // make api req
    dispatch(getItems(q));

    return () => {
      dispatch(resetState());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const searchQuery = Object.entries(query)
      .map((val) => (val[1] ? `${val[0]}=${val[1]}` : null))
      .filter((val) => val !== null)
      .join('&');

    const newUrl = `/${urlSearch.type}/${urlSearch.id}?${searchQuery}`;
    if (searchQuery) {
      history.push(newUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleSortSelect = (event) => {
    setSortOption(event.target.value);
    // set url to sort
    const selectedOption = event.target.value;
    if (
      selectedOption === SORT_OPTIONS.asc.param ||
      selectedOption === SORT_OPTIONS.desc.param
    ) {
      setQuery((old) => ({
        ...old,
        sort: selectedOption,
      }));
    } else {
      setQuery((old) => ({ ...old, sort: 'none' }));
    }
  };

  const loadMore = () => {
    page.current = page.current + 1;

    let queryObj = queryString.parse(search);
    queryObj = { ...queryObj, ...getDefaultUrlParams(), page: page.current };
    const q = Object.entries(queryObj)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    dispatch(getItems(q));
  };

  const showFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  return (
    <main className={isFilterModalOpen ? 'modal-open' : ''}>
      {isFilterModalOpen && (
        <FilterModal
          options={filterFields}
          closeModal={() => setIsFilterModalOpen(false)}
          updateFilterOptions={setFilterOptions}
        />
      )}
      <header className="header">
        <div className="container">
          <h1 className="title">{shopTitle}</h1>
        </div>
        <div className="filter-sort-section">
          <div className="sort">
            <select name="sort" value={sortOption} onChange={handleSortSelect}>
              {Object.keys(SORT_OPTIONS).map((key) => (
                <option
                  key={`sort-option-${key}`}
                  value={SORT_OPTIONS[key].param}
                >
                  {SORT_OPTIONS[key].text}
                </option>
              ))}
            </select>
          </div>
          <button onClick={showFilterModal} className="filter">
            Filter
          </button>
        </div>
      </header>
      <section className="items">
        <div className="container">
          <p className="items-found">
            {!isLoading && shopItems.length === 0 && '0 items found'}
          </p>
          <div className="item-cards-container">
            {isLoading ? (
              <>
                <ShopItemCardSkeleton />
                <ShopItemCardSkeleton />
                <ShopItemCardSkeleton />
                <ShopItemCardSkeleton />
                <ShopItemCardSkeleton />
                <ShopItemCardSkeleton />
                <ShopItemCardSkeleton />
                <ShopItemCardSkeleton />
              </>
            ) : (
              shopItems.map((item) => (
                <ShopItemCard
                  id={item._id}
                  key={item._id + uuid()}
                  color={item.color}
                  imgUrl={item.imgUrl}
                  price={item.price}
                  title={item.brandName + ' ' + item.title}
                />
              ))
            )}
          </div>
          <div className="load-more-btn">
            {noMoreToLoad ? (
              shopItems.length > 0 && <p>{shopItems.length} items above</p>
            ) : (
              <Button
                loading={isLoading}
                onClick={loadMore}
                text="LOAD MORE"
                size="l"
              />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
