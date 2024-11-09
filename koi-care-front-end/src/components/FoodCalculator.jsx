import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/FoodCalculator.css';

const FoodCalculator = () => {
  const [totalFishWeight, setTotalFishWeight] = useState('');
  const [temperature, setTemperature] = useState('');
  const [foodResult, setFoodResult] = useState(null);

  const handleButtonClick = (value, setState) => {
    setState((prev) => (prev === '0' ? String(value) : prev + value));
  };

  const handleBackspace = (setState) => {
    setState((prev) => prev.slice(0, -1));
  };

  const handleClear = (setState) => {
    setState('');
  };

  const handleCalculateFood = async () => {
    const weight = parseFloat(totalFishWeight);
    const temp = parseFloat(temperature);

    if (weight < 0) {
      toast.error('Total Fish Weight cannot be negative.');
      return;
    }

    if (temp < -40 || temp > 40) {
      toast.error('Temperature must be between -40°C and 40°C.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.post(
        'http://localhost:8080/api/koi/calculateFood',
        {
          totalFishWeight: weight,
          temperature: temp
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
      toast.error('Error calculating food.');
    }
  };

  return (
    <div className="food-calculator-container">
      <ToastContainer />
      <h2>Food Calculator</h2>
      <div className="calculator-body">
        <div className="calculator-screen">
          <input
            type="number"
            placeholder="Total Fish Weight (g)"
            value={totalFishWeight}
            onChange={(e) => setTotalFishWeight(e.target.value)}
          />
        </div>
        <div className="calculator-screen">
          <input
            type="number"
            placeholder="Temperature (°C)"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </div>
        <div className="calculator-keypad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              className="calculator-button"
              onClick={() => handleButtonClick(num, setTemperature)}
            >
              {num}
            </button>
          ))}
          <button className="calculator-button" onClick={() => handleBackspace(setTemperature)}>⌫</button>
          <button className="calculator-button" onClick={() => handleButtonClick(0, setTemperature)}>0</button>
          <button className="calculator-button" onClick={() => handleClear(setTemperature)}>C</button>
          <button className="calculator-button calculate-button" onClick={handleCalculateFood}>
            Calculate
          </button>
        </div>
        {foodResult && (
          <div className="result-container">
            <h3>Calculation Result</h3>
            <p>{foodResult}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodCalculator;