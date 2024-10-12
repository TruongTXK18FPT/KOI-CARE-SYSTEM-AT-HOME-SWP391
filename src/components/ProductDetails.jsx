import React from 'react';
import '../styles/ProductDetails.css'; // Import the CSS file for the modal

const ProductDetails = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{product.name}</h2>
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;



