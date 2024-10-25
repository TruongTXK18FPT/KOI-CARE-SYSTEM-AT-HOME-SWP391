import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SelectionPage.css'; // Import the CSS file for styling

const SelectionPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="selection-page">
      <h1>Welcome to the Management Dashboard</h1>
      <div className="card-container">
        <div className="card" onClick={() => handleNavigation('/pond-details')}>
          <h2>Pond Management</h2>
          <p>Manage your ponds efficiently.</p>
        </div>
        <div className="card" onClick={() => handleNavigation('/koi-fish')}>
          <h2>Add New Koi Fish</h2>
          <p>Add and manage your koi fish.</p>
        </div>
        <div className="card" onClick={() => handleNavigation('/water-parameter')}>
          <h2>Water Parameter</h2>
          <p>Monitor and manage water parameters.</p>
        </div>
      </div>
    </div>
  );
};

export default SelectionPage;