import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faClock, faThermometerHalf, faTint, faFlask, faVial, faLeaf, faCloud, faUtensils, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import '../styles/WaterParameter.css';

const WaterParameter = () => {
  const [formData, setFormData] = useState({
    pond_id: '',
    dateTime: '',
    NO2: '',
    O2: '',
    NO3: '',
    temperature: '',
    PO4: '',
    pHValue: '',
    NH4: '',
    KH: '',
    GH: '',
    CO2: '',
    salt: '',
    totalChlorines: '',
    outdoorTemp: '',
    amountFed: '',
    note: ''
  });

  const [waterParameters, setWaterParameters] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setWaterParameters([...waterParameters, formData]);
    setFormData({
      pond_id: '',
      dateTime: '',
      NO2: '',
      O2: '',
      NO3: '',
      temperature: '',
      PO4: '',
      pHValue: '',
      NH4: '',
      KH: '',
      GH: '',
      CO2: '',
      salt: '',
      totalChlorines: '',
      outdoorTemp: '',
      amountFed: '',
      note: ''
    });
  };

  return (
    <div className="container">
      <h2>Add Water Parameter</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <FontAwesomeIcon icon={faWater} /> Pond ID:
          <input type="number" name="pond_id" value={formData.pond_id} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faClock} /> Date and Time:
          <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Nitrite (NO2) mg/l:
          <input type="number" step="0.01" name="NO2" value={formData.NO2} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Oxygen (O2) mg/l:
          <input type="number" step="0.01" name="O2" value={formData.O2} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Nitrate (NO3) mg/l:
          <input type="number" step="0.01" name="NO3" value={formData.NO3} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faThermometerHalf} /> Temperature (°C):
          <input type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faFlask} /> Phosphate (PO4) mg/l:
          <input type="number" step="0.01" name="PO4" value={formData.PO4} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faVial} /> pH-Value:
          <input type="number" step="0.01" name="pHValue" value={formData.pHValue} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faLeaf} /> Ammonium (NH4) mg/l:
          <input type="number" step="0.01" name="NH4" value={formData.NH4} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faFlask} /> KH (mg/l):
          <input type="number" step="0.01" name="KH" value={formData.KH} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faFlask} /> GH (mg/l):
          <input type="number" step="0.01" name="GH" value={formData.GH} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faCloud} /> CO2 (mg/l):
          <input type="number" step="0.01" name="CO2" value={formData.CO2} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Salt (%):
          <input type="number" step="0.01" name="salt" value={formData.salt} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faFlask} /> Total Chlorines (mg/l):
          <input type="number" step="0.01" name="totalChlorines" value={formData.totalChlorines} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faThermometerHalf} /> Outdoor Temperature (°C):
          <input type="number" step="0.1" name="outdoorTemp" value={formData.outdoorTemp} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faUtensils} /> Amount Fed (g):
          <input type="number" step="0.1" name="amountFed" value={formData.amountFed} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faStickyNote} /> Note:
          <textarea name="note" value={formData.note} onChange={handleChange}></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>

      <h2>Water Parameter Details</h2>
      {waterParameters.map((param, index) => (
        <div key={index} className="details">
          <p>Pond ID: {param.pond_id}</p>
          <p>Date and Time: {param.dateTime}</p>
          <p>Nitrite (NO2): {param.NO2} mg/l</p>
          <p>Oxygen (O2): {param.O2} mg/l</p>
          <p>Nitrate (NO3): {param.NO3} mg/l</p>
          <p>Temperature: {param.temperature} °C</p>
          <p>Phosphate (PO4): {param.PO4} mg/l</p>
          <p>pH-Value: {param.pHValue}</p>
          <p>Ammonium (NH4): {param.NH4} mg/l</p>
          <p>KH: {param.KH} mg/l</p>
          <p>GH: {param.GH} mg/l</p>
          <p>CO2: {param.CO2} mg/l</p>
          <p>Salt: {param.salt} %</p>
          <p>Total Chlorines: {param.totalChlorines} mg/l</p>
          <p>Outdoor Temperature: {param.outdoorTemp} °C</p>
          <p>Amount Fed: {param.amountFed} g</p>
          <p>Note: {param.note}</p>
        </div>
      ))}
    </div>
  );
};

export default WaterParameter;