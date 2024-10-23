import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faClock, faThermometerHalf, faTint, faFlask, faVial, faLeaf, faCloud, faUtensils, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import '../styles/WaterParameterDetails.css';

const WaterParameterDetails = ({ waterParameters = [] }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/water-parameter');
  };

  return (
    <div className="container">
      <h2>Water Parameter Details</h2>
      <button onClick={handleBack}>Back to Water Parameter</button>
      {waterParameters.length > 0 ? (
        waterParameters.map((param, index) => (
          <div key={index} className="details">
            <p><FontAwesomeIcon icon={faWater} /> Pond ID: {param.pond_id}</p>
            <p><FontAwesomeIcon icon={faClock} /> Date and Time: {param.dateTime}</p>
            <p><FontAwesomeIcon icon={faTint} /> Nitrite (NO2): {param.NO2} mg/l</p>
            <p><FontAwesomeIcon icon={faTint} /> Oxygen (O2): {param.O2} mg/l</p>
            <p><FontAwesomeIcon icon={faTint} /> Nitrate (NO3): {param.NO3} mg/l</p>
            <p><FontAwesomeIcon icon={faThermometerHalf} /> Temperature: {param.temperature} °C</p>
            <p><FontAwesomeIcon icon={faFlask} /> Phosphate (PO4): {param.PO4} mg/l</p>
            <p><FontAwesomeIcon icon={faVial} /> pH-Value: {param.pHValue}</p>
            <p><FontAwesomeIcon icon={faLeaf} /> Ammonium (NH4): {param.NH4} mg/l</p>
            <p><FontAwesomeIcon icon={faFlask} /> KH: {param.KH} mg/l</p>
            <p><FontAwesomeIcon icon={faFlask} /> GH: {param.GH} mg/l</p>
            <p><FontAwesomeIcon icon={faCloud} /> CO2: {param.CO2} mg/l</p>
            <p><FontAwesomeIcon icon={faTint} /> Salt: {param.salt} %</p>
            <p><FontAwesomeIcon icon={faFlask} /> Total Chlorines: {param.totalChlorines} mg/l</p>
            <p><FontAwesomeIcon icon={faThermometerHalf} /> Outdoor Temperature: {param.outdoorTemp} °C</p>
            <p><FontAwesomeIcon icon={faUtensils} /> Amount Fed: {param.amountFed} g</p>
            <p><FontAwesomeIcon icon={faStickyNote} /> Note: {param.note}</p>
          </div>
        ))
      ) : (
        <p>No water parameters available.</p>
      )}
    </div>
  );
};

export default WaterParameterDetails;