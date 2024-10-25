import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import '../styles/SearchBar.css';
const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search blogs..." />
      <button className="search-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <button className="filter-button">
        <FontAwesomeIcon icon={faFilter} />
      </button>
    </div>
  );
};

export default SearchBar;