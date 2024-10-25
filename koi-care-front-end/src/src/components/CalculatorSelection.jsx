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
      <div className="calculator-cards">
        <div className="calculator-card" onClick={() => handleSelection('food')}>
          <h3>Calculate Food Amount</h3>
          <p>Determine the amount of food needed for your fish based on their weight and pond temperature.</p>
          <div className="calculator-keyboard">
            <div className="mini-button">1</div>
            <div className="mini-button">2</div>
            <div className="mini-button">3</div>
            <div className="mini-button">C</div>
            <div className="mini-button">4</div>
            <div className="mini-button">5</div>
            <div className="mini-button">6</div>
            <div className="mini-button">7</div>
            <div className="mini-button">8</div>
            <div className="mini-button">9</div>
            <div className="mini-button">0</div>
            <div className="mini-button">.</div>
            <div className="mini-button">+</div>
            <div className="mini-button">-</div>
            <div className="mini-button">*</div>
            <div className="mini-button">/</div>
            <div className="mini-button">=</div>
          </div>
        </div>
        
        <div className="calculator-card" onClick={() => handleSelection('salt')}>
          <h3>Calculate Salt Amount</h3>
          <p>Calculate the amount of salt required for your pond based on its volume.</p>
          <div className="calculator-keyboard">
            <div className="mini-button">1</div>
            <div className="mini-button">2</div>
            <div className="mini-button">3</div>
            <div className="mini-button">C</div>
            <div className="mini-button">4</div>
            <div className="mini-button">5</div>
            <div className="mini-button">6</div>
            <div className="mini-button">7</div>
            <div className="mini-button">8</div>
            <div className="mini-button">9</div>
            <div className="mini-button">0</div>
            <div className="mini-button">.</div>
            <div className="mini-button">+</div>
            <div className="mini-button">-</div>
            <div className="mini-button">*</div>
            <div className="mini-button">/</div>
            <div className="mini-button">=</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorSelection;

