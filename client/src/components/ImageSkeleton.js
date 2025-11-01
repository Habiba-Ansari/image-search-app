import React from 'react';
import './ImageSkeleton.css';

const ImageSkeleton = ({ count = 12 }) => {
  return (
    <div className="skeleton-container">
      <div className="images-grid">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-info">
              <div className="skeleton-text"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSkeleton;