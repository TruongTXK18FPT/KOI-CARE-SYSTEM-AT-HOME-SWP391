import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FoodCalculator.css';

const FoodCalculator = () => {
  const [totalFishWeight, setTotalFishWeight] = useState('');
  const [temperature, setTemperature] = useState('');
  const [foodResult, setFoodResult] = useState(null);

  const handleCalculateFood = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.post(
        'http://localhost:8080/api/koi/calculateFood',
        {
          totalFishWeight: parseFloat(totalFishWeight),
          temperature: parseFloat(temperature)
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the headers
          }
        }
      );
      setFoodResult(response.data);
    } catch (error) {
      console.error('Error calculating food:', error);
    }
  };

  return (
    <div className="food-calculator-container">
      <h2>Food Calculator</h2>
      <input
        type="number"
        placeholder="Total Fish Weight (g)"
        value={totalFishWeight}
        onChange={(e) => setTotalFishWeight(e.target.value)}
      />
      <input
        type="number"
        placeholder="Temperature (°C)"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
      />
      <button onClick={handleCalculateFood}>Calculate</button>
      {foodResult && (
        <div className="result-container">
          <h3>Calculation Result</h3>
          <p>{foodResult}</p>
        </div>
      )}
    </div>
  );
};

export default FoodCalculator;