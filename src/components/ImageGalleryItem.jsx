import React from 'react';
import './ImageGalleryItem.css';

function ImageGalleryItem({ image, onClick }) {
  return (
    <li className="gallery-item" onClick={() => onClick(image)}>
      <img src={image.webformatURL} alt={image.tags} />
    </li>
  );
}

export default ImageGalleryItem;
