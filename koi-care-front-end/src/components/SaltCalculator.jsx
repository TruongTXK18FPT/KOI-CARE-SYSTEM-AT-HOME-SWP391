import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SaltCalculator.css';

const SaltCalculator = () => {
  const [pondVolume, setPondVolume] = useState('');
  const [saltResult, setSaltResult] = useState(null);

  const handleCalculateSalt = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.post(
        'http://localhost:8080/api/koi/calculateSalt',
        {
          pondVolume: parseFloat(pondVolume)
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the headers
          }
        }
      );
      setSaltResult(response.data);
    } catch (error) {
      console.error('Error calculating salt:', error);
    }
  };

  return (
    <div className="salt-calculator-container">
      <h2>Salt Calculator</h2>
      <input
        type="number"
        placeholder="Pond Volume (L)"
        value={pondVolume}
        onChange={(e) => setPondVolume(e.target.value)}
      />
      <button onClick={handleCalculateSalt}>Calculate</button>
      {saltResult !== null && (
        <div className="result-container">
          <h3>Calculation Result</h3>
          <p>Required Salt Amount: {saltResult} kg</p>
        </div>
      )}
    </div>
  );
};

export default SaltCalculator;