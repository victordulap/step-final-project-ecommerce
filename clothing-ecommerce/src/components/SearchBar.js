import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './SearchBar.scss';

const SearchBar = () => {
  return (
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
  );
};

export default SearchBar;
