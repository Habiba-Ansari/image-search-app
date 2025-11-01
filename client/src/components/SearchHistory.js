import React, { useState, useEffect } from 'react';
import { searchAPI } from '../services/api';
import './SearchHistory.css';

const SearchHistory = ({ onSearchFromHistory }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await searchAPI.getHistory();
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleHistoryClick = (term) => {
    onSearchFromHistory(term);
    setIsVisible(false);
  };

  const clearHistory = async () => {
    // Note: We'll need to implement a clear history endpoint
    alert('Clear history feature coming soon!');
  };

  if (loading) {
    return (
      <div className="search-history">
        <button className="history-toggle" disabled>
          📝 Loading history...
        </button>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="search-history">
        <button className="history-toggle" onClick={() => setIsVisible(!isVisible)}>
          📝 Search History (Empty)
        </button>
        {isVisible && (
          <div className="history-panel">
            <div className="history-header">
              <h3>Search History</h3>
              <button onClick={() => setIsVisible(false)} className="close-btn">
                ✕
              </button>
            </div>
            <div className="empty-history">
              <p>No search history yet.</p>
              <p>Your searches will appear here!</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="search-history">
      <button 
        className="history-toggle" 
        onClick={() => setIsVisible(!isVisible)}
      >
        📝 Search History ({history.length})
      </button>
      
      {isVisible && (
        <div className="history-panel">
          <div className="history-header">
            <h3>Recent Searches</h3>
            <div className="history-actions">
              <button onClick={clearHistory} className="clear-btn" title="Clear history">
                🗑️ Clear
              </button>
              <button onClick={() => setIsVisible(false)} className="close-btn">
                ✕
              </button>
            </div>
          </div>
          
          <div className="history-list">
            {history.map((item, index) => (
              <div 
                key={index} 
                className="history-item"
                onClick={() => handleHistoryClick(item.term)}
              >
                <span className="history-term">"{item.term}"</span>
                <span className="history-time">{formatDate(item.timestamp)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHistory;