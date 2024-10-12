import React from 'react';
import '../styles/FeaturesPage.css'; // Import the CSS file

const FeaturePage = () => {
  return (
    <div className="feature-container">
      <h2>Website Features</h2>
      <div className="feature-item">
        <h3>Automatic Pond Monitoring</h3>
        <p>Our system helps monitor water parameters to ensure a healthy environment for your koi fish.</p>
      </div>
      <div className="feature-item">
        <h3>Koi Fish Health Tracking</h3>
        <p>Track the health and growth of your koi fish with our integrated system.</p>
      </div>
      <div className="feature-item">
        <h3>Online Store</h3>
        <p>Purchase recommended products for your koi fish, including food and pond accessories.</p>
      </div>
    </div>
  );
};

export default FeaturePage;
