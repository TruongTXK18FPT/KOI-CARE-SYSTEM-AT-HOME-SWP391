import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaUser, FaBirthdayCake, FaPhone, FaVenusMars, FaUserTag, FaImage, FaMars, FaVenus } from 'react-icons/fa';
import axios from 'axios';
import '../styles/UserProfile.css'; // Ensure this path is correct

const UserProfile = () => {
  const [profile, setProfile] = useState({
    email: '',
    fullName: '',
    birthday: '',
    phone: '',
    gender: '',
    role: '',
    profilePicture: '', // Updated to match the backend field name
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Auth Token:', token); // Debugging statement
        if (token) {
          const response = await axios.get('http://localhost:8080/api/auth/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('Fetched profile:', response.data); // Debugging statement
          const userProfile = response.data;

          // Format the birthday to "yyyy-MM-dd"
          if (userProfile.birthday) {
            userProfile.birthday = new Date(userProfile.birthday).toISOString().split('T')[0];
          }

          // Update the state with the fetched profile data
          setProfile({
            email: userProfile.email,
            fullName: userProfile.fullName,
            birthday: userProfile.birthday,
            phone: userProfile.phone,
            gender: userProfile.gender,
            role: userProfile.role,
            profilePicture: userProfile.accountImg, // Ensure this matches the backend field name
          });
        } else {
          console.error('No auth token found');
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log('Auth Token on Submit:', token); // Debugging statement
      if (token) {
        await axios.put('http://localhost:8080/api/auth/update', {
          email: profile.email,
          fullName: profile.fullName,
          birthDay: profile.birthday,
          phone: profile.phone,
          gender: profile.gender,
          role: profile.role,
          accountImg: profile.profilePicture,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        alert('Profile updated successfully');
      } else {
        console.error('No auth token found');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {profile.profilePicture && (
        <img src={profile.profilePicture} alt="Profile" className="profile-picture" />
      )}
      <form className="user-profile-form" onSubmit={handleSubmit}>
        <div className="user-profile-form-group">
          <label htmlFor="email">
            <FaEnvelope /> Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div className="user-profile-form-group">
          <label htmlFor="fullName">
            <FaUser /> Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={profile.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className="user-profile-form-group">
          <label htmlFor="birthday">
            <FaBirthdayCake /> Birthday:
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={profile.birthday || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className="user-profile-form-group">
          <label htmlFor="phone">
            <FaPhone /> Phone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="user-profile-form-group">
          <label htmlFor="gender">
            <FaVenusMars /> Gender:
          </label>
          <select
            id="gender"
            name="gender"
            value={profile.gender}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            <option value="male"><FaMars /> Male</option>
            <option value="female"><FaVenus /> Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="user-profile-form-group">
          <label htmlFor="role">
            <FaUserTag /> Role:
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={profile.role}
            onChange={handleInputChange}
          />
        </div>
        <div className="user-profile-form-group">
          <label htmlFor="profilePicture">
            <FaImage /> Profile Picture URL:
          </label>
          <input
            type="text"
            id="profilePicture"
            name="profilePicture"
            value={profile.profilePicture}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="save-btn">Save</button>
      </form>
    </div>
  );
};


export default UserProfile;