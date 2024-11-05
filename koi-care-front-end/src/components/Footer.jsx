import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaFacebook, FaPhone, FaInstagram } from 'react-icons/fa';
import MapModal from './MapModal'; // Ensure this path is correct
import '../styles/Footer.css'; // Ensure this path is correct

const Footer = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleMapOpen = () => {
    setIsMapOpen(true);
  };

  const handleMapClose = () => {
    setIsMapOpen(false);
  };

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Koi Care System is dedicated to providing the best care for your koi fish. Our system ensures your pond is always in optimal condition.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li><Link to="/contact">Contact Form</Link></li>
            <li><FaEnvelope /> Email: tranxuantin1234@gmail.com</li>
            <li><FaFacebook /> Facebook: Tran Xuan Truong</li>
            <li><FaPhone /> Phone: 0931430662</li>
            <li><FaInstagram /> Instagram: tr91104</li>
            <li><span className="address-link" onClick={handleMapOpen}>Koi Care System Company</span></li>
          </ul>
        </div>
      </div>
      <MapModal isOpen={isMapOpen} onClose={handleMapClose} />
    </footer>
  );
};

export default Footer;

