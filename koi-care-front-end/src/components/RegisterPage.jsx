import React, { useState } from 'react';
import axios from 'axios';
import { FaEnvelope, FaLock, FaUser, FaPhone, FaAddressCard, FaBirthdayCake, FaVenusMars } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    // Validation checks
    const { email, birthday, phone, address, password, confirmPassword } = formData;

    if (!email.endsWith('@gmail.com')) {
      toast.error('Email must end with @gmail.com');
      return;
    }

    const birthYear = new Date(birthday).getFullYear();
    if (birthYear >= 2024 || new Date().getFullYear() - birthYear < 10) {
      toast.error('Birthday must be before 2024 and you must be at least 10 years old');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error('Phone number must have 10 digits');
      return;
    }

    if (!address) {
      toast.error('Address cannot be empty');
      return;
    }

    if (password.length < 1 || password.length > 32) {
      toast.error('Password must be between 1 and 32 characters');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      if (response.status === 201) {
        toast.success('Registration successful!');
        // Optionally, redirect to login page or another page
      } else {
        toast.error(`Registration failed: ${response.statusText}`);
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="register-page">
      <ToastContainer />
      <div className="register-welcome-message">
        <h2>Welcome to the Koi Care System!</h2>
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

