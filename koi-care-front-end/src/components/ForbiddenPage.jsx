import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ForbiddenPage.css';

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="forbidden-container">
      <div className="forbidden-content">
        <h1 className="error-code">403</h1>
        <h2 className="error-title">Access Forbidden</h2>
        <p className="error-message">
          Sorry, you don't have permission to access this page. This area is restricted to authorized personnel only.
        </p>
        <div className="button-container">
          <button
            onClick={() => navigate('/')}
            className="forbidden-button home-button"
            aria-label="Go to home page"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="forbidden-button back-button"
            aria-label="Go back to previous page"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;