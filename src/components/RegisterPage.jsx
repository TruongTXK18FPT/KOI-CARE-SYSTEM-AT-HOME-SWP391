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
        const data = response.data;
        alert('Registration successful!');
        console.log(data);
      } else {
        const contentType = response.headers['content-type'];
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const errorData = response.data;
          alert(`Registration failed: ${errorData.message}`);
        } else {
          const errorText = response.statusText;
          alert(`Registration failed: ${errorText}`);
        }
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        alert(`An error occurred: ${error.response.data.message || error.message}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('No response received from the server.');
      } else {
        console.error('Error message:', error.message);
        alert(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <FaEnvelope /> Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          <FaBirthdayCake /> Birthday:
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
        </label>
        <label>
          <FaPhone /> Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>
        <label>
          <FaAddressCard /> Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          <FaVenusMars /> Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          <FaUser /> Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </label>
        <label>
          <FaLock /> Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <label>
          <FaLock /> Confirm Password:
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
