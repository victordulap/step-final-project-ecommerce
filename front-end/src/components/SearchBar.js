import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './SearchBar.scss';

const SearchBar = ({ searchCallback, afterMs }) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchCallback(searchValue);
    }, afterMs);

    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  return (
    <div className="search-bar">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search for items"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button className="search-icon">
        <AiOutlineSearch className="icon" />
      </button>
    </div>
  );
};

export default SearchBar;
