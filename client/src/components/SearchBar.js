import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && !loading) {
      onSearch(searchTerm.trim());
    }
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for images... (e.g., mountains, cats, beaches)"
            className="search-input"
            disabled={loading}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-btn"
              disabled={loading}
            >
              ✕
            </button>
          )}
          <button 
            type="submit" 
            className="search-btn"
            disabled={!searchTerm.trim() || loading}
          >
            {loading ? '🔍 Searching...' : '🔍 Search'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;