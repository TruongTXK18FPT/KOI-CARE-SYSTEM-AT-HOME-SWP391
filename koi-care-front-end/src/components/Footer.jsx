import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MapModal from './MapModal'; // Import the MapModal component
import '../styles/Footer.css';

const Footer = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleMapOpen = () => {
    setIsMapOpen(true);
  };

  const handleMapClose = () => {
    setIsMapOpen(false);
  };

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
            <li><Link to ="/blog">Blog</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li><Link to="/contact">Contact Form</Link></li>
            <li>Email: tranxuantin1234@gmail.com</li>
            <li><span className="address-link" onClick={handleMapOpen}>Koi Care System Company</span></li>
          </ul>
        </div>
      </div>
      <MapModal isOpen={isMapOpen} onClose={handleMapClose} />
    </footer>
  );
};

export default Footer;

