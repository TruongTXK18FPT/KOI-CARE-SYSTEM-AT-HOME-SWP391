/*import React, { useState } from 'react';
import '../styles/LoginPage.css'; // Import the updated CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Import icons

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accountName: email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // Store user data in localStorage
        localStorage.setItem('userRole', data.role); // Store user role
        localStorage.setItem('userFullName', data.fullName); // Store user's full name
  
        // Redirect the user to the homepage
        window.location.replace('/');
      } else {
        // Handle login failure
        setError('Invalid credentials');
      }
    } catch (error) {
      // Handle any other errors
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <FontAwesomeIcon icon={faLock} /> Password
          </label>
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
    </div>
  );
};

export default LoginPage;*/
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/LoginPage.css'; // Ensure this path is correct

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null); // State to store the response

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email, password };
      const response = await axios.post('http://localhost:8080/api/auth/login', payload);
      setResponse(response.data); // Store the response data
      console.log('Login successful:', response.data);
      // Handle successful login, e.g., redirect or store user data in local storage
      localStorage.setItem('userRole', response.data.roleDB);
      localStorage.setItem('userFullName', response.data.fullName);
      window.location.href = '/'; // Redirect to homepage
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



