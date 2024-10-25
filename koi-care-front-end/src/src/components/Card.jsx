import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css'; // Import the CSS file for styling

const Card = ({ icon: Icon, title, link }) => {
  return (
    <div className="card">
      <Link to={link} className="card-link">
        <Icon className="card-icon" />
        <h3 className="card-title">{title}</h3>
      </Link>
    </div>
  );
};

export default Card;