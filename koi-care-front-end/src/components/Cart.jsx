import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Cart.css'; // Ensure this path is correct

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    const userRole = localStorage.getItem('userRole') || 'guest';
    if (userRole === 'guest') {
      navigate('/login');
    } else {
      navigate('/my-order');
    }
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <ul className="cart-items-list">
        {cartItems.map((item, index) => (
          <li key={index} className="cart-item">
            <img src={item.imageUrl} alt={item.productName} className="cart-item-image" />
            <div className="cart-item-details">
              <h3 className="cart-item-name">{item.productName}</h3>
              <p className="cart-item-description">{item.description}</p>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
              <p className="cart-item-category">Category: {item.category}</p>
              <button onClick={() => removeFromCart(index)} className="remove-btn">
                <FontAwesomeIcon icon={faTrashAlt} /> Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout} className="checkout-btn">
        Checkout
      </button>
    </div>
  );
};

export default Cart;