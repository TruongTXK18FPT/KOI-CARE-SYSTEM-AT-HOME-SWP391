import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSignInAlt, faStore, faCogs, faNewspaper, faUser, faFish, faCalculator, faSignOutAlt, faUserShield, faUserTie } from '@fortawesome/free-solid-svg-icons';
import '../styles/NavBar.css'; // Import the CSS file for styling
import LogoWeb from '../assets/LogoWeb.jpg'; // Import the logo

const NavBar = () => {
  const [userRole, setUserRole] = useState('guest'); // Default role is 'guest'

  // Check user role from localStorage when the component mounts
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole); // Set the role from localStorage
    }
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-title">
        <img src={LogoWeb} alt="Logo" className="navbar-logo" />
        Koi Care System
      </Link>
      <div className="nav-links">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        {userRole === 'guest' ? (
          <>
            <Link to="/login">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
            <Link to="/shop">
              <FontAwesomeIcon icon={faStore} /> Shop
            </Link>
            <Link to="/features">
              <FontAwesomeIcon icon={faCogs} /> Features
            </Link>
            <Link to="/blog">
              <FontAwesomeIcon icon={faNewspaper} /> Blog
            </Link>
          </>
        ) : userRole === 'admin' ? (
          <>
            <Link to="/admin">
              <FontAwesomeIcon icon={faUserShield} /> Admin
            </Link>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} /> User Profile
            </Link>
            <Link to="/selection">
              <FontAwesomeIcon icon={faFish} /> My Pond
            </Link>
            <Link to="/calculator">
              <FontAwesomeIcon icon={faCalculator} /> Calculator
            </Link>
            <Link to="/shop">
              <FontAwesomeIcon icon={faStore} /> Shop
            </Link>
            <Link to="/blog">
              <FontAwesomeIcon icon={faNewspaper} /> Blog
            </Link>
            <Link to="/logout">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </>
        ) : userRole === 'manager' ? (
          <>
            <Link to="/manager">
              <FontAwesomeIcon icon={faUserTie} /> Manager
            </Link>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} /> User Profile
            </Link>
            <Link to="/selection">
              <FontAwesomeIcon icon={faFish} /> My Pond
            </Link>
            <Link to="/calculator">
              <FontAwesomeIcon icon={faCalculator} /> Calculator
            </Link>
            <Link to="/shop">
              <FontAwesomeIcon icon={faStore} /> Shop
            </Link>
            <Link to="/blog">
              <FontAwesomeIcon icon={faNewspaper} /> Blog
            </Link>
            <Link to="/logout">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} /> User Profile
            </Link>
            <Link to="/selection">
              <FontAwesomeIcon icon={faFish} /> My Pond
            </Link>
            <Link to="/calculator">
              <FontAwesomeIcon icon={faCalculator} /> Calculator
            </Link>
            <Link to="/shop">
              <FontAwesomeIcon icon={faStore} /> Shop
            </Link>
            <Link to="/blog">
              <FontAwesomeIcon icon={faNewspaper} /> Blog
            </Link>
            <Link to="/logout">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;



