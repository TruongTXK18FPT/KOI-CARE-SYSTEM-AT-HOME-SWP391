import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTruck, faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons';
import '../styles/OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [filters, setFilters] = useState({
    searchKeyword: '',
    sortOrder: 'newest',
    statusFilter: ''
  });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const token = localStorage.getItem('token');
  const accountId = localStorage.getItem('accountId'); // Retrieve accountId from local storage

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let url = 'http://localhost:8080/api/orders';
      let params = {};

      if (filters.searchKeyword) {
        url += '/search';
        params.keyword = filters.searchKeyword;
      } else if (filters.statusFilter) {
        url += '/filter';
        params.status = filters.statusFilter;
      } else if (filters.sortOrder) {
        url += '/sort';
        params.sortOrder = filters.sortOrder;
      }

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          ...params,
          page,
          size: 10
        }
      });

      setOrders(response.data.content || response.data);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters, page]);

  const updateOrderStatus = async (orderId, status) => {
    setUpdateLoading(orderId);
    try {
      const response = await axios.put(
        `http://localhost:8080/api/orders/${orderId}/status/account/${accountId}`,
        { status },
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

  const handleFiltersChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const handleSortChange = (e) => {
    handleFiltersChange({ sortOrder: e.target.value });
  };

  const handleSearchChange = (e) => {
    handleFiltersChange({ searchKeyword: e.target.value });
  };

  const handleStatusFilterChange = (e) => {
    handleFiltersChange({ statusFilter: e.target.value });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FontAwesomeIcon icon={faClock} className="status-icon pending" />;
      case 'shipped':
        return <FontAwesomeIcon icon={faTruck} className="status-icon shipped" />;
      case 'delivered':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon delivered" />;
      case 'cancel':
        return <FontAwesomeIcon icon={faBan} className="status-icon cancel" />;
      default:
        return null;
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

      <div className="filters">
        <input
          type="text"
          placeholder="Search by customer name..."
          value={filters.searchKeyword}
          onChange={handleSearchChange}
        />
        <select value={filters.sortOrder} onChange={handleSortChange}>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
          <option value="a-z">A to Z</option>
          <option value="z-a">Z to A</option>
        </select>
        <select value={filters.statusFilter} onChange={handleStatusFilterChange}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancel">Cancel</option>
        </select>
      </div>

      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Customer Phone</th>
            <th>Customer Address</th>
            <th>Pay method</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderID}>
              <td>{order.orderID}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.customerFullName}</td>
              <td>{order.customerPhone}</td>
              <td>{order.customerAddress}</td>
              <td>{order.paymentMethod}</td>
              <td>{getStatusIcon(order.status)} {order.status}</td>
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

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={index === page ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;