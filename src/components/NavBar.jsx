/*import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // Import the CSS file for styling
import LogoWeb from '../assets/LogoWeb.jpg'; // Import the logo

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-title">
        <img src={LogoWeb} alt="Logo" className="navbar-logo" />
        Koi Care System
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/login">Login</Link>
        <Link to="/features">Features</Link>
        <Link to="/pond">Pond</Link>
        <Link to="/calculator">Calculator</Link>
        <Link to="/profile">User Profile</Link>
      </div>
    </nav>
  );
};

export default NavBar;*/
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/">Home</Link>
        {userRole === 'guest' ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/features">Features</Link>
            <Link to="/blog">Blog</Link> {/* Ensure this points to /blog */}
          </>
        ) : (
          <>
            <Link to="/profile">User Profile</Link>
            <Link to="/pond">Pond</Link>
            <Link to="/calculator">Calculator</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/blog">Blog</Link> {/* Ensure this points to /blog */}
            <Link to="/logout">Logout</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;



