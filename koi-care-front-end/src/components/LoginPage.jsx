import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      const response = await axios.post('http://localhost:8080/api/auth/login', payload);
      setResponse(response.data);

      if (response.data.token) {
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userFullName', response.data.fullName);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('accountId', response.data.accountId);

        if (response.data.role === 'admin') {
          navigate('/admin');
          window.location.reload();
        } else if (response.data.role === 'manager') {
          navigate('/manager');
          window.location.reload();
        } else if (response.data.role === 'supervisor') {
          navigate('/admin');
          window.location.reload();
        } else {
          navigate('/');
          window.location.reload();
        }
      } else {
        console.error('Token not found in response');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
        toast.error('Invalid email or password');
      } else if (error.response && error.response.status === 403) {
        setError('Account is inactive');
        toast.error('Account is inactive');
      } else {
        setError('An error occurred. Please try again.');
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="login-welcome-message">
        <h2>Welcome to Our Koi Care System</h2>
        <p>You can experience it best by logging in!</p>
      </div>
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <span className="login-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-input-group">
            <span className="login-icon"><FontAwesomeIcon icon={faLock} /></span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">
            <FontAwesomeIcon icon={faArrowRight} /> Login
          </button>
        </form>
        <div className="login-links">
          <a href="/register">Register</a> | 
          <a href="/forgotpassword">Forgot Password?</a>
        </div>

        {response && (
          <div className="response">
            <h3>Login Response</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;


