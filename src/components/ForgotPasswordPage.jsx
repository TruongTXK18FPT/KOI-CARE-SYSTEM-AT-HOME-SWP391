import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import '../styles/ForgotPasswordPage.css'; // Import the CSS file

const ForgotPasswordPage = () => {
  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form className="forgot-password-form">
        <div className="form-group">
          <label>
            <FaEnvelope /> Email
          </label>
          <input type="email" placeholder="Enter your email" required />
        </div>
        <button type="submit" className="forgot-password-btn">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;

