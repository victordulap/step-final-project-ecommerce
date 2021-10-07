import './style.scss';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryByName } from '../../features/categoriesSlice';
import { items } from '../../data/items';

const filterItemsByCategoryOrBrand = (filter) => {
  return items
    .map((item) => {
      if (
        item.brand.name.toLowerCase() === filter.toLowerCase() ||
        item.categories.find(
          (category) => category.name.toLowerCase() === filter.toLowerCase()
        )
      )
        return item;
      else return null;
    })
    .filter((item) => item !== null);
};

const Shop = () => {
  const urlSearch = useParams();

  const { brands, categories } = useSelector((state) => state);
  const [shopItems, setShopItems] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const filteredItems = filterItemsByCategoryOrBrand(urlSearch.name);
    setShopItems(filteredItems);
    // console.log(filteredItems);
  }, []);

  return (
    <main>
      <header className="header">
        <div className="container">
          <h1 className="title">{urlSearch.name}</h1>
        </div>
        <div className="filter-sort-section">
          <button>Sort</button>
          <button>Filter</button>
        </div>
      </header>
      <section className="items">
        <div className="container">
          <p className="items-found">10 items found</p>
          <div className="item-cards-container">
            {shopItems.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-card-image-container">
                  <img src={item.imgUrl} alt={item.title} />
                </div>
                <h3 className="item-card-title">
                  {item.brand.name} {item.title}
                </h3>
                <p className="item-card-color">{item.color}</p>
                <p className="item-card-price">${item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
