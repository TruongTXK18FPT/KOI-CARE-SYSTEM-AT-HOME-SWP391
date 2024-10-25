import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaAddressCard, FaBirthdayCake, FaVenusMars } from 'react-icons/fa';
import '../styles/RegisterPage.css'; // Ensure this path is correct

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    birthday: '',
    phone: '',
    address: '',
    gender: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', dataToSubmit);
      if (response.status === 201) {
        alert('Registration successful!');
      } else {
        alert(`Registration failed: ${response.statusText}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="register-page">
      <div className="welcome-message">
        <h1>Welcome to the Koi Care System!</h1>
        <p>Please fill out the form below to create your account.</p>
      </div>
      <div className="register-container">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-input-group">
            <span className="register-icon"><FaEnvelope /></span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-input-group">
            <span className="register-icon"><FaBirthdayCake /></span>
            <input
              type="date"
              name="birthday"
              placeholder="Birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-input-group">
            <span className="register-icon"><FaPhone /></span>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-input-group">
            <span className="register-icon"><FaAddressCard /></span>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-input-group">
            <span className="register-icon"><FaVenusMars /></span>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="register-input-group">
            <span className="register-icon"><FaUser /></span>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-input-group">
            <span className="register-icon"><FaLock /></span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="register-input-group">
            <span className="register-icon"><FaLock /></span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

