import React from 'react';
import './Button.css';

function Button({ onClick }) {
  return (
    <button type="button" className="load-more-button" onClick={onClick}>
      Load More
    </button>
  );
}

export default Button;
