import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FaChartBar, FaChartLine, FaFileAlt, FaNewspaper, FaComments, FaClipboardList, FaBoxOpen } from 'react-icons/fa';
import OrderDashboard from './OrderDashboard';
import OrderManagement from './OrderManagement';
import ProductManagement from './ProductManagement';
import Card from './Card';
import '../styles/ManagerPage.css'; // Import the CSS file for styling

const ManagerPage = () => {
  return (
    <div className="manager-page">
      <div className="grid-container">
        <Card icon={FaFileAlt} title="Report Generation" link="order-dashboard" />
        <Card icon={FaClipboardList} title="Order Management" link="order-management" />
        <Card icon={FaBoxOpen} title="Product Management" link="product-management" />
      </div>
      <div className="content">
        <Routes>
          <Route path="order-dashboard" element={<OrderDashboard />} />
          <Route path="order-management/*" element={<OrderManagement />} />
          <Route path="product-management/*" element={<ProductManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default ManagerPage;