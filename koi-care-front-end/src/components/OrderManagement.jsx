import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const token = localStorage.getItem('token');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/manager/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    setUpdateLoading(orderId);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/manager/update',
        { orderID: orderId, status },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Update the local state to reflect the updated order status
      setOrders(orders.map(order => 
        order.orderID === orderId 
          ? { ...order, status }
          : order
      ));
      
      setSuccessMessage('Order status updated successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
      setError(null);
    } catch (err) {
      setError('Failed to update order status. Please try again later.');
    } finally {
      setUpdateLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="order-management-container">
      <h1 className="order-management-title">Order Management</h1>
      
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

      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderID}>
              <td>{order.orderID}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.customerName}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.orderID, e.target.value)}
                  disabled={updateLoading === order.orderID}
                >
                  <option value="pending">Pending</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancel">Cancel</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;