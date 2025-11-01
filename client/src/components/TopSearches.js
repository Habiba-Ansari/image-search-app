import React, { useState, useEffect } from 'react';
import { searchAPI } from '../services/api';
import './TopSearches.css';

const TopSearches = () => {
  const [topSearches, setTopSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopSearches();
  }, []);

  const fetchTopSearches = async () => {
    try {
      const response = await searchAPI.getTopSearches();
      setTopSearches(response.data);
    } catch (error) {
      console.error('Error fetching top searches:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="top-searches-loading">Loading trends...</div>;
  }

  if (topSearches.length === 0) {
    return null; // Don't show anything if no searches yet
  }

  return (
    <div className="top-searches-banner">
      <div className="container">
        <span className="trending-label">🔥 Trending:</span>
        <div className="search-terms">
          {topSearches.map((item, index) => (
            <span key={index} className="search-term">
              {item.term} <span className="search-count">({item.count})</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSearches;