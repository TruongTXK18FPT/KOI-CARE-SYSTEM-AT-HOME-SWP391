import React, { useState } from 'react';
import { FaEnvelope, FaUser, FaBirthdayCake, FaPhone, FaVenusMars, FaUserTag, FaImage } from 'react-icons/fa';
import '../styles/UserProfile.css'; // Ensure this path is correct

const UserProfile = () => {
  const [profile, setProfile] = useState({
    email: '',
    fullName: '',
    birthday: '',
    phone: '',
    gender: '',
    role: '',
    profilePicture: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(profile);
  };

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      {profile.profilePicture && (
        <img src={profile.profilePicture} alt="Profile" className="profile-picture" />
      )}
      <form className="user-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope /> Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="birthday">
            <FaBirthdayCake /> Birthday:
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={profile.birthday}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
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
        <div className="form-group">
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
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="profilePicture">
            <FaImage /> Profile Picture:
          </label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="save-btn">Save</button>
      </form>
    </div>
  );
};

export default UserProfile;