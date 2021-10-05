import './style.scss';
import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryByName } from '../../features/categoriesSlice';
import { items } from '../../data/items';

const filterItemsByCategory = (categoryFilter) => {
  return items
    .map((item) => {
      if (
        item.categories.find(
          (category) =>
            category.name.toLowerCase() === categoryFilter.toLowerCase()
        )
      )
        return item;
      else return null;
    })
    .filter((item) => item !== null);
};

const Shop = () => {
  const location = useLocation();
  const urlState = location.state;
  const urlSearch = useParams();

  const { brands, categories } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (urlSearch.type === 'categories') {
      // set shop items with categories
      console.log('categories');
      const filteredItems = filterItemsByCategory(urlSearch.name);
      console.log(filteredItems);
    } else if (urlSearch.type === 'brands') {
      // set shop items with brands
      console.log('brands');
    }
  }, []);

  return (
    <main>
      <section className="title">
        <div className="container">
          <h1>{urlSearch.name}</h1>
        </div>
      </section>
    </main>
  );
};

export default Shop;
