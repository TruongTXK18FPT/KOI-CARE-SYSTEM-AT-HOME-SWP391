import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CalculatorSelection.css'; // Import the CSS file for styling

const CalculatorSelection = () => {
  const navigate = useNavigate();

  const handleSelection = (option) => {
    if (option === 'food') {
      navigate('/calculate-food');
    } else if (option === 'salt') {
      navigate('/calculate-salt');
    }
  };

  return (
    <div className="calculator-selection-container">
      <h2>Select Calculation Type</h2>
      <button onClick={() => handleSelection('food')}>Calculate Food Amount</button>
      <button onClick={() => handleSelection('salt')}>Calculate Salt Amount</button>
    </div>
  );
};

export default CalculatorSelection;