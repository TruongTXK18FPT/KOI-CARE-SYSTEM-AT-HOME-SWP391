import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTruck, faBox, faTimes, faSpinner, faArrowLeft, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const accountId = localStorage.getItem('accountId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/history/${accountId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      
      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [accountId, token]);

  useEffect(() => {
    if (accountId && token) {
      fetchOrders();
    }
  }, [accountId, token, fetchOrders]);

  const cancelOrder = async (orderId) => {
    setCancelLoading(orderId);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/orders/${orderId}/status/account/${accountId}`,
        { status: 'cancel' },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      // Update the local state to reflect the cancelled order
      setOrders(orders.map(order => 
        order.orderID === orderId 
          ? { ...order, status: 'cancel' }
          : order
      ));
      
      setSuccessMessage('Order cancelled successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to cancel order. Please try again later.');
    } finally {
      setCancelLoading(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <FontAwesomeIcon icon={faCheck} className="status-icon delivered" />;
      case 'shipped':
        return <FontAwesomeIcon icon={faTruck} className="status-icon shipped" />;
      case 'pending':
        return <FontAwesomeIcon icon={faBox} className="status-icon pending" />;
      case 'cancel':
        return <FontAwesomeIcon icon={faTimes} className="status-icon cancelled" />;
      default:
        return null;
    }
  };

  if (!accountId || !token) {
    return (
      <div className="error-container">
        <p>Please log in to view your order history.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} spin className="loading-spinner" />
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="order-history-wrapper">
      <div className="order-history-container">
        <h1 className="order-history-title">Order History</h1>
        
        {error && (
          <div className="alert alert-error" role="alert">
            <p>{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="alert alert-success" role="alert">
            <p>{successMessage}</p>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="empty-state">
            <FontAwesomeIcon icon={faBox} className="empty-icon" />
            <h3>No orders yet</h3>
            <p>When you make a purchase, it will appear here.</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.orderID} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.orderID}</h3>
                    <p className="order-date">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="order-status">
                    {getStatusIcon(order.status)}
                    <span className="status-text">{order.status.toLowerCase()}</span>
                  </div>
                </div>
                
                <div className="order-details">
                  <div className="detail-group">
                    <label>Shipping Address</label>
                    <p>{order.shippingAddress}</p>
                  </div>
                  <div className="detail-group">
                    <label>Payment Method</label>
                    <p>{order.paymentMethod}</p>
                  </div>
                </div>
                
                <div className="order-footer">
                  <div className="total-amount">
                    <label>Total Amount</label>
                    <p className="amount">{order.totalAmount.toFixed(2)} VND</p>
                  </div>
                  
                  {order.status.toLowerCase() === 'pending' && (
                    <button
                      onClick={() => cancelOrder(order.orderID)}
                      disabled={cancelLoading === order.orderID}
                      className="cancel-button"
                      aria-label="Cancel Order"
                    >
                      {cancelLoading === order.orderID ? (
                        <>
                          <FontAwesomeIcon icon={faSpinner} spin />
                          <span>Cancelling...</span>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faTimes} />
                          <span>Cancel Order</span>
                        </>
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/invoice/${order.orderID}`)}
                    className="invoice-button"
                    aria-label="View Invoice"
                  >
                    <FontAwesomeIcon icon={faFileInvoice} />
                    <span>View Invoice</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate('/shop')}
          className="back-to-shop-button"
          aria-label="Back to Shop"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back to Shop</span>
        </button>
      </div>
    </div>
  );
};

export default OrderHistoryPage;