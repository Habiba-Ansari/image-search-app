import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { searchAPI } from '../services/api';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import TopSearches from '../components/TopSearches';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import SearchHistory from '../components/SearchHistory';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (term) => {
    if (!term.trim()) return;
    
    setLoading(true);
    setSearchTerm(term);
    setSelectedImages([]);
    
    try {
      const response = await searchAPI.search(term);
      if (response.data && response.data.results) {
        setSearchResults(response.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      if (error.response?.status === 401) {
        alert('Please log in again.');
      } else {
        alert('Failed to search images. Please check your connection and try again.');
      }
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchFromHistory = (term) => {
    handleSearch(term);
  };

  const handleImageSelect = (imageId) => {
    setSelectedImages(prev => {
      if (prev.includes(imageId)) {
        return prev.filter(id => id !== imageId);
      } else {
        return [...prev, imageId];
      }
    });
  };

  const handleSelectAll = () => {
    if (searchResults.length > 0) {
      const allImageIds = searchResults.map(image => image.id);
      setSelectedImages(allImageIds);
    }
  };

  const handleClearSelection = () => {
    setSelectedImages([]);
  };

  const handleDownloadSelected = () => {
    // This will be triggered by the keyboard shortcut
    // The actual download happens in SearchResults component
    console.log('Download triggered via keyboard shortcut');
  };

  // Use keyboard shortcuts
  useKeyboardShortcuts({
    onClearSelection: handleClearSelection,
    onSelectAll: handleSelectAll,
    onDownloadSelected: handleDownloadSelected,
    selectedCount: selectedImages.length,
    hasResults: searchResults.length > 0
  });

  return (
    <div className="dashboard">
      <TopSearches />
      
      <header className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <h1>Image Search</h1>
            <div className="header-actions">
              <SearchHistory onSearchFromHistory={handleSearchFromHistory} />
              <div className="keyboard-shortcuts-info">
                <span title="Keyboard Shortcuts">⌨️</span>
                <div className="shortcuts-tooltip">
                  <strong>Keyboard Shortcuts:</strong><br/>
                  Ctrl+A: Select all<br/>
                  Escape: Clear selection<br/>
                  Ctrl+D: Download selected
                </div>
              </div>
              <div className="user-info">
                <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                <span>Welcome, {user?.name}</span>
                <button onClick={logout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <SearchBar onSearch={handleSearch} loading={loading} />
        
        {searchResults.length > 0 && (
          <>
            <div className="selection-actions">
              <div className="container">
                <div className="selection-buttons">
                  <button 
                    onClick={handleSelectAll}
                    className="selection-btn select-all-btn"
                  >
                    📋 Select All ({searchResults.length})
                  </button>
                  <button 
                    onClick={handleClearSelection}
                    disabled={selectedImages.length === 0}
                    className="selection-btn clear-selection-btn"
                  >
                    🗑️ Clear Selection
                  </button>
                </div>
              </div>
            </div>
            <SearchResults 
              results={searchResults}
              selectedImages={selectedImages}
              onImageSelect={handleImageSelect}
              searchTerm={searchTerm}
            />
          </>
        )}

        {!loading && searchResults.length === 0 && searchTerm && (
          <div className="no-results">
            <div className="container">
              <p>No images found for "{searchTerm}". Try a different search term.</p>
            </div>
          </div>
        )}

        {!searchTerm && (
          <div className="welcome-message">
            <div className="container">
              <h2>Welcome to Image Search!</h2>
              <p>Start by searching for images using the search bar above.</p>
              <div className="feature-highlights">
                <div className="feature">
                  <h3>🎯 Multi-Select</h3>
                  <p>Click images or use Ctrl+A to select all</p>
                </div>
                <div className="feature">
                  <h3>⬇️ Download</h3>
                  <p>Download single images or selected batches</p>
                </div>
                <div className="feature">
                  <h3>⌨️ Shortcuts</h3>
                  <p>Ctrl+A, Escape, Ctrl+D for quick actions</p>
                </div>
                <div className="feature">
                  <h3>📝 History</h3>
                  <p>Quickly access your recent searches</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;