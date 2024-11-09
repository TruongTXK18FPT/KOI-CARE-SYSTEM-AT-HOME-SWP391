import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
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
    toast.dismiss();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/check-email', { email });
      if (response.data.exists) {
        setEmailExists(true);
        toast.success('Email found. Please enter your new password.');
      } else {
        toast.error('Email not found.');
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Error checking email.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    if (formData.newPassword.length < 1 || formData.newPassword.length > 32) {
      toast.error('Password must be between 1 and 32 characters.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/reset-password', { email, ...formData });
      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/login'); // Redirect to login page after successful password reset
      }, 3000);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Error resetting password.');
    }
  };

  return (
    <div className="forgot-password-container">
      <ToastContainer />
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
    </div>
  );
};

export default ForgotPasswordPage;

