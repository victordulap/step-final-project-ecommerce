import React, { useCallback, useEffect, useState } from 'react';
import './Navbar.scss';
import {
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useWindowDimensions } from '../customHooks/useWindowDimesions';
import SearchBar from './SearchBar';
import { request } from '../services';
import { searchService } from '../services/searchService';

const SEARCH_AFTER_MS = 1000;

const Navbar = () => {
  const { width } = useWindowDimensions();
  const [isBigScreen, setIsBigScreen] = useState(width > 650);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState(null);

  useEffect(() => {
    setIsBigScreen(width > 650);
  }, [width]);

  const handleSearch = useCallback(async (searchValue) => {
    if (searchValue.length > 1) {
      // make request to back, save data
      const resp = await searchService.getSearchSuggestions(searchValue);

      // set suggestions to req data
      setSearchSuggestions(resp.data.items);
    } else {
      setSearchSuggestions(null);
    }
  }, []);

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
              searchSuggestions={searchSuggestions}
              searchCallback={handleSearch}
              afterMs={SEARCH_AFTER_MS}
              closeModal={() => {
                setShowSearchModal(false);
                setSearchSuggestions(null);
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
