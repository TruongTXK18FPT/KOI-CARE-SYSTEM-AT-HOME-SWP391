import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/Cart.css';

const Cart = ({ cartItems, total, onClose, onRemoveItem, onClearCart, loading }) => {
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
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      {loading && <div className="loading">Processing...</div>}

      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {cartItems.map((item) => {
              const price = item.price || 0;
              const quantity = item.quantity || 0;
              const itemTotal = (price * quantity).toFixed(2);

              return (
                <li key={item.productId} className="cart-item">
                  <img 
                    src={item.imageUrl} 
                    alt={item.productName}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.productName}</h3>
                    <p className="cart-item-category">{item.category}</p>
                    <p className="cart-item-price">{price} VND</p>
                    <p className="cart-item-quantity">Quantity: {quantity}</p>
                    <p className="cart-item-total">Total: {itemTotal} VND</p>
                  </div>
                  <button 
                    className="remove-button" 
                    onClick={() => onRemoveItem(item.productId)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="cart-footer">
            <p className="cart-total">Total: {total} VND</p>
            <button className="clear-cart-button" onClick={onClearCart}>
              Clear Cart
            </button>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;