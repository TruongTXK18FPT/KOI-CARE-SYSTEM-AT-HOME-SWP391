import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { FaChartBar, FaChartLine, FaFileAlt, FaNewspaper, FaComments, FaClipboardList, FaBoxOpen } from 'react-icons/fa';
import ReportGeneration from './ReportGeneration';
import PostManagement from './PostManagement';
import FeedbackManagement from './FeedbackManagement';
import OrderManagement from './OrderManagement';
import ProductManagement from './ProductManagement';
import Card from './Card';
import '../styles/ManagerPage.css'; // Import the CSS file for styling

const ManagerPage = () => {
  return (
    <div className="manager-page">
      <div className="grid-container">
        <Card icon={FaFileAlt} title="Report Generation" link="report-generation" />
        <Card icon={FaNewspaper} title="Post Management" link="post-management" />
        <Card icon={FaComments} title="Feedback Management" link="feedback-management" />
        <Card icon={FaClipboardList} title="Order Management" link="order-management" />
        <Card icon={FaBoxOpen} title="Product Management" link="product-management" />
      </div>
      <div className="content">
        <Routes>
          <Route path="report-generation" element={<ReportGeneration />} />
          <Route path="post-management/*" element={<PostManagement />} />
          <Route path="feedback-management/*" element={<FeedbackManagement />} />
          <Route path="order-management/*" element={<OrderManagement />} />
          <Route path="product-management/*" element={<ProductManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default ManagerPage;