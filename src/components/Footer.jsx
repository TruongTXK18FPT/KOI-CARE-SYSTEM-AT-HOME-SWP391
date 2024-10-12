import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Koi Care System is dedicated to providing the best care for your koi fish. Our system ensures your pond is always in optimal condition.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/calculator">Calculator</Link></li>
            <li><Link to="/profile">User Profile</Link></li>
            <li><Link to="/pond">Pond</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/manager">Manager</Link></li>
            <li><Link to = "/water-parameter">Water Parameter</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li><Link to="/contact">Contact Form</Link></li>
            <li>Email: tranxuantin1234@gmail.com</li>
            <li>Phone: 0931430662</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Koi Care System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;


