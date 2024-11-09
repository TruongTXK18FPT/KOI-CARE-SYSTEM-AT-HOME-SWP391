import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../styles/Invoice.css';

const Invoice = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/orderdetails/order/${orderId}`, {
        params: { accountId: localStorage.getItem('accountId') },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('API Response:', response.data); // Debugging: Log the API response

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setOrderDetails(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch order details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  fetchOrderDetails();
}, [orderId]);

useEffect(() => {
  console.log('Order Details State:', orderDetails); // Debugging: Log the state
}, [orderDetails]);

if (loading) {
  return <p>Loading...</p>;
}

if (error) {
  return <p>{error}</p>;
}

// Calculate the total order amount
const totalOrderAmount = orderDetails.reduce((total, detail) => total + (detail.unitPrice * detail.quantity), 0);

return (
  <div className="invoice-wrapper">
    <button onClick={() => navigate(-1)} className="back-button">
      <FontAwesomeIcon icon={faArrowLeft} />
      <span>Back</span>
    </button>
    <h1>Invoice for Order #{orderId}</h1>
    <div className="invoice-details">
      {orderDetails.length === 0 ? (
        <p>No order details available.</p>
      ) : (
        orderDetails.map((detail) => (
          <div key={detail.orderDetailID} className="invoice-item">
            {detail.product ? (
              <>
                <img src={detail.product.imageUrl} alt={detail.product.productName} />
                <div className="item-info">
                  <h3>{detail.product.productName}</h3>
                  <p>Category: {detail.product.category}</p>
                  <p>Price: {detail.unitPrice.toFixed(2)} VND</p>
                  <p>Quantity: {detail.quantity}</p>
                  <p>Total: {(detail.unitPrice * detail.quantity).toFixed(2)} VND</p>
                </div>
              </>
            ) : (
              <p>Product details not available.</p>
            )}
          </div>
        ))
      )}
    </div>
    <div className="total-order-amount">
      <h2>Total Order Amount: {totalOrderAmount.toFixed(2)} VND</h2>
    </div>
  </div>
);
};

export default Invoice;