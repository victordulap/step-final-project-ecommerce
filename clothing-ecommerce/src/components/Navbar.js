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

const Navbar = () => {
  const { width } = useWindowDimensions();
  const [isBigScreen, setIsBigScreen] = useState(width > 650);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    setIsBigScreen(width > 650);
  }, [width]);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          VD Clothes
        </Link>
        {isBigScreen && <SearchBar />}

        <div className="icons">
          {!isBigScreen && (
            <AiOutlineSearch
              className="icon"
              onClick={() => setShowSearchModal(true)}
            />
          )}
          <AiOutlineShoppingCart className="icon" />
        </div>
      </div>
      {showSearchModal && (
        <div class="search-modal">
          <button
            className="close-modal"
            onClick={() => setShowSearchModal(false)}
          >
            <AiOutlineClose />
          </button>
          <div className="container">
            <SearchBar />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
