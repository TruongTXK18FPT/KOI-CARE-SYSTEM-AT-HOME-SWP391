import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/check-email', { email });
      if (response.data.exists) {
        setEmailExists(true);
      } else {
        setError('Email not found.');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error checking email.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/reset-password', { email, ...formData });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful password reset
      }, 3000);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error resetting password.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Password</h2>
      {!emailExists ? (
        <form onSubmit={handleEmailSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
          <button type="submit">Check Email</button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <label>
            New Password:
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleFormChange}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleFormChange}
              required
            />
          </label>
          <button type="submit">Reset Password</button>
        </form>
      )}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ForgotPasswordPage;

