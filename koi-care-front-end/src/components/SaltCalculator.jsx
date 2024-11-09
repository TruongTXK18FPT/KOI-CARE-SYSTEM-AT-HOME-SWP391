import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/SaltCalculator.css';

const SaltCalculator = () => {
  const [pondVolume, setPondVolume] = useState('');
  const [saltResult, setSaltResult] = useState(null);

  const handleButtonClick = (value) => {
    setPondVolume((prev) => (prev === '0' ? String(value) : prev + value));
  };

  const handleBackspace = () => {
    setPondVolume((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setPondVolume('');
  };
  const handleDecimals = () => {
    setPondVolume((prev) => prev + '.');
  }

  const handleCalculateSalt = async () => {
    const volume = parseFloat(pondVolume);

    if (volume < 0) {
      toast.error('Pond Volume cannot be negative.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/api/koi/calculateSalt',
        { pondVolume: volume },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaltResult(response.data);
    } catch (error) {
      console.error('Error calculating salt:', error);
      toast.error('Error calculating salt.');
    }
  };

  return (
    <div className="salt-calculator-container">
      <ToastContainer />
      <div className="calculator-body">
        <div className="calculator-screen">
          {pondVolume || '0'}
        </div>
        <div className="calculator-keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              className="calculator-button"
              onClick={() => handleButtonClick(num)}
            >
              {num}
            </button>
          ))}
          <button className="calculator-button" onClick={handleBackspace}>⌫</button>
          <button className="calculator-button" onClick={() => handleButtonClick(0)}>0</button>
          <button className="calculator-button" onClick={handleClear}>C</button>
          <button className="calculator-button" onClick={handleDecimals}>.</button>
          <button className="calculator-button calculate-button" onClick={handleCalculateSalt}>
            Calculate
          </button>
        </div>
        {saltResult !== null && (
          <div className="result-container">
            <h3>Calculation Result</h3>
            <p>Required Salt Amount: {saltResult} kg</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaltCalculator;
