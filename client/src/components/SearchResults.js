import React from 'react';
import './SearchResults.css';

const SearchResults = ({ results, selectedImages, onImageSelect, searchTerm, loading }) => {
  const downloadImage = async (imageUrl, imageId) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `unsplash-image-${imageId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  const downloadSelectedImages = async () => {
    if (selectedImages.length === 0) return;
    
    for (const imageId of selectedImages) {
      const image = results.find(img => img.id === imageId);
      if (image) {
        await downloadImage(image.urls.regular, imageId);
        // Small delay to avoid overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  };

  if (loading) {
    return <ImageSkeleton count={12} />;
  }

  if (!results || results.length === 0) {
    return null;
  }

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="search-results-container">
      <div className="container">
        <div className="results-header">
          <h2>You searched for "{searchTerm}" — {results.length} results</h2>
          <div className="results-actions">
            <div className="selected-counter">
              Selected: {selectedImages.length} images
            </div>
            {selectedImages.length > 0 && (
              <button 
                onClick={downloadSelectedImages}
                className="download-btn"
                title="Download selected images"
              >
                ⬇️ Download Selected ({selectedImages.length})
              </button>
            )}
          </div>
        </div>
        
        <div className="images-grid">
          {results.map((image) => (
            <div 
              key={image.id} 
              className={`image-card ${selectedImages.includes(image.id) ? 'selected' : ''}`}
            >
              <img 
                src={image.urls.small} 
                alt={image.alt_description || 'Unsplash image'} 
                loading="lazy"
              />
              <div className="image-overlay">
                <div 
                  className="checkbox"
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageSelect(image.id);
                  }}
                >
                  {selectedImages.includes(image.id) ? '✓' : ''}
                </div>
                <div className="image-actions">
                  <button 
                    className="action-btn download-single-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(image.urls.regular, image.id);
                    }}
                    title="Download this image"
                  >
                    ⬇️
                  </button>
                  <a 
                    href={image.links.html} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="action-btn view-original-btn"
                    onClick={(e) => e.stopPropagation()}
                    title="View on Unsplash"
                  >
                    🔗
                  </a>
                </div>
              </div>
              <div className="image-info">
                <p className="image-author">By {image.user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;