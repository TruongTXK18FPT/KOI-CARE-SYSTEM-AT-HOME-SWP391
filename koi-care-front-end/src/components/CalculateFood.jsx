import React, { useState } from 'react';
import '../styles/Calculator.css'; // Import the CSS file for styling

const CalculatorFood = () => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleKeyPress = (e) => {
    if (!isNaN(e.key) || e.key === '.') {
      setInput((prev) => prev + e.key);
    }
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = () => {
    // Add your calculation logic here
    alert(`Calculated food amount: ${input}`);
  };

  return (
    <div className="calculator-container" onKeyPress={handleKeyPress} tabIndex="0">
      <h2>Calculate Food Amount</h2>
      <input type="text" value={input} readOnly />
      <div className="calculator-buttons">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].map((num) => (
          <button key={num} onClick={() => handleButtonClick(num.toString())}>{num}</button>
        ))}
        <button onClick={handleClear}>C</button>
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};

export default CalculatorFood;