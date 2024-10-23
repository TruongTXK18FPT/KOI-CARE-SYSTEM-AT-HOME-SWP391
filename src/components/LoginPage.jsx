import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/LoginPage.css'; // Ensure this path is correct

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null); // State to store the response
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      const response = await axios.post('http://localhost:8080/api/auth/login', payload);
      setResponse(response.data); // Store the response data
      console.log('Login successful:', response.data);

      // Check if the token is present in the response
      if (response.data.token) {
        console.log('Token:', response.data.token); // Debugging statement
        // Store user data in local storage
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userFullName', response.data.fullName);
        localStorage.setItem('token', response.data.token);
        console.log('Token stored in local storage'); // Debugging statement

        // Redirect based on user role
        if (response.data.role === 'admin') {
          navigate('/admin');
          window.location.reload();
        } else if (response.data.role === 'manager') {
          navigate('/manager');
          window.location.reload();
        } else {
          navigate('/');
          window.location.reload();
        }
      } else {
        console.error('Token not found in response'); // Debugging statement
      }
    } catch (error) {
      // Handle different error responses
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password'); // Specific error message for wrong credentials
      } else {
        setError('An error occurred. Please try again.'); // General error message
      }
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <span className="icon"><FontAwesomeIcon icon={faEnvelope} /></span>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <span className="icon"><FontAwesomeIcon icon={faLock} /></span>
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
  );
};

export default LoginPage;


