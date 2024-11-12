import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UnauthorizedPage.css';;

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1 className="error-code">401</h1>
        <h2 className="error-title">Unauthorized Access</h2>
        <p className="error-message">
          Sorry, you don't have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <div className="button-container">
          <button
            onClick={() => navigate('/')}
            className="unauthorized-button home-button"
            aria-label="Go to home page"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="unauthorized-button back-button"
            aria-label="Go back to previous page"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;