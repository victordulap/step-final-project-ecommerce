import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './SearchBar.scss';

const SearchBar = ({
  searchSuggestions,
  closeModal,
  searchCallback,
  afterMs,
}) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchCallback(searchValue);
    }, afterMs);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, searchCallback, afterMs]);

  useEffect(() => {
    console.log('search suggestions: ', searchSuggestions);
  }, [searchSuggestions]);

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for items"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          autoFocus
        />
        <button className="search-icon">
          <AiOutlineSearch className="icon" />
        </button>
      </div>
      <div className="search-bar-suggestions">
        {searchSuggestions &&
          searchSuggestions.map((suggestion) => (
            <Link
              onClick={closeModal}
              className="search-suggestion"
              key={`search-suggestion-${suggestion._id}`}
              to={`/item/${suggestion._id}`}
            >
              {suggestion.brand[0].name} {suggestion.title} ({suggestion.color})
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
