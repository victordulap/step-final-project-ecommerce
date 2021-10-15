import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import {
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useWindowDimensions } from '../customHooks/useWindowDimesions';
import SearchBar from './SearchBar';
import { items } from '../data/items';
import { filterItems } from '../utils/data/filterItems';

const SEARCH_AFTER_MS = 1000;

const Navbar = () => {
  const { width } = useWindowDimensions();
  const [isBigScreen, setIsBigScreen] = useState(width > 650);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    setIsBigScreen(width > 650);
  }, [width]);

  const handleSearch = (searchValue) => {
    // filter items by searchValue

    // filter all items
    if (searchValue.length > 2) {
      const filteredItems = filterItems(items, searchValue);
      console.log(filteredItems);
    }

    // set suggestions

    // show suggestions
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          VD Clothes
        </Link>
        {isBigScreen && (
          <SearchBar searchCallback={handleSearch} afterMs={SEARCH_AFTER_MS} />
        )}

        <div className="icons">
          {!isBigScreen && (
            <AiOutlineSearch
              className="icon"
              onClick={() => setShowSearchModal(true)}
            />
          )}
          <Link to="/cart">
            <AiOutlineShoppingCart className="icon" />
          </Link>
        </div>
      </div>
      {showSearchModal && (
        <div className="search-modal">
          <button
            className="close-modal"
            onClick={() => setShowSearchModal(false)}
          >
            <AiOutlineClose />
          </button>
          <div className="container">
            <SearchBar
              searchCallback={handleSearch}
              afterMs={SEARCH_AFTER_MS}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
