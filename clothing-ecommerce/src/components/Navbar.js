import React from 'react';
import './Navbar.scss';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">VD Clothes</div>
        <div className="search-bar">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for items"
          />
          <button className="search-icon">
            <AiOutlineSearch className="icon" />
          </button>
        </div>
        <div className="icons">
          <AiOutlineShoppingCart className="icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
