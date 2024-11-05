import React, { useState } from 'react';
import axios from 'axios';
import '../styles/MyOrder.css';

const MyOrder = () => {
  const [formData, setFormData] = useState({
    shippingAddress: '',
    paymentMethod: 'cashOnDelivery',
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get accountId and token from localStorage
    const accountId = localStorage.getItem('accountId');
    const token = localStorage.getItem('token');

    if (!accountId || !token) {
      alert('Please login first');
      // Optionally redirect to login page
      window.location.href = '/login';
      return;
    }

    // Prepare headers with JWT token
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      // Use the correct endpoint from OrderController
      const response = await axios.post(
        `http://localhost:8080/api/orders/checkout/${accountId}`,
        {
          shippingAddress: formData.shippingAddress,
          paymentMethod: formData.paymentMethod
        },
        config
      );

      if (response.status === 200) {
        if (formData.paymentMethod === 'cashOnDelivery') {
          setOrderSuccess(true);
        } else if (formData.paymentMethod === 'vnPay') {
          window.location.href = 'https://vnPay.com'; // Replace with actual vnPay URL
        }
      } else {
        alert(`Order failed: ${response.data.error || response.statusText}`);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Session expired. Please login again.');
        // Redirect to login page
        window.location.href = '/login';
      } else {
        alert(`An error occurred: ${error.response?.data?.error || error.message}`);
      }
    }
  };

  return (
    <div className="my-order-page">
      <h2>Place Your Order</h2>
      {orderSuccess ? (
        <div className="order-success-message">
          <h3>Order Successful!</h3>
          <p>Your order has been placed successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="order-form">
          <div className="order-input-group">
            <label htmlFor="shippingAddress">Shipping Address</label>
            <input
              type="text"
              name="shippingAddress"
              placeholder="Enter your shipping address"
              value={formData.shippingAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="order-input-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="cashOnDelivery">Cash on Delivery</option>
              <option value="vnPay">vnPay</option>
            </select>
          </div>
          <button type="submit" className="order-button">Pay</button>
        </form>
      )}
    </div>
  );
};

export default MyOrder;