import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faClock, faThermometerHalf, faTint, faFlask, faVial, faLeaf, faCloud, faUtensils, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import '../styles/WaterParameter.css';

const WaterParameter = () => {
  const [formData, setFormData] = useState({
    pond_id: '',
    dateTime: '',
    nitrogenDioxide: '',
    oxygen: '',
    nitrate: '',
    temperature: '',
    phosphate: '',
    pHValue: '',
    ammonium: '',
    potassiumHydride: '',
    generalHardness: '',
    carbonDioxide: '',
    salt: '',
    totalChlorines: '',
    outdoorTemp: '',
    amountFed: '',
    note: ''
  });

  const [waterParameters, setWaterParameters] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [ponds, setPonds] = useState([]);
  const navigate = useNavigate();

  const fetchAccountPonds = useCallback(async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        console.error('No token found, redirecting to login');
        navigate('/login'); // Redirect to login if no token found
        return;
      }

      const accountResponse = await axios.get('http://localhost:8080/api/ponds/account/details', {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
        }
      });

      if (accountResponse.status === 200) {
        const accountId = accountResponse.data.accountId;
        const pondsResponse = await axios.get(`http://localhost:8080/api/ponds/account/getByAccountId/${accountId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Include the token for this request as well
          }
        });

        if (pondsResponse.status === 200) {
          setPonds(pondsResponse.data.content); // Set the ponds associated with the account
        }
      }
    } catch (error) {
      console.error('Error fetching ponds:', error.response ? error.response.data : error.message);
    }
  }, [navigate]);

  useEffect(() => {
    fetchAccountPonds();
  }, [fetchAccountPonds]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateWaterParameter();
    } else {
      await addWaterParameter();
    }
    setFormData({
      pond_id: '',
      dateTime: '',
      nitrogenDioxide: '',
      oxygen: '',
      nitrate: '',
      temperature: '',
      phosphate: '',
      pHValue: '',
      ammonium: '',
      potassiumHydride: '',
      generalHardness: '',
      carbonDioxide: '',
      salt: '',
      totalChlorines: '',
      outdoorTemp: '',
      amountFed: '',
      note: ''
    });
    setIsEditing(false);
  };

  const addWaterParameter = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const payload = {
        pond: { id: formData.pond_id }, // Ensure pond_id is nested correctly
        dateTime: new Date(formData.dateTime).toISOString(), // Ensure dateTime is an ISO string
        nitrogenDioxide: formData.nitrogenDioxide ? parseFloat(formData.nitrogenDioxide) : null,
        oxygen: formData.oxygen ? parseFloat(formData.oxygen) : null,
        nitrate: formData.nitrate ? parseFloat(formData.nitrate) : null,
        temperature: formData.temperature ? parseFloat(formData.temperature) : null,
        phosphate: formData.phosphate ? parseFloat(formData.phosphate) : null,
        pHValue: formData.pHValue ? parseFloat(formData.pHValue) : null,
        ammonium: formData.ammonium ? parseFloat(formData.ammonium) : null,
        potassiumHydride: formData.potassiumHydride ? parseFloat(formData.potassiumHydride) : null,
        generalHardness: formData.generalHardness ? parseFloat(formData.generalHardness) : null,
        carbonDioxide: formData.carbonDioxide ? parseFloat(formData.carbonDioxide) : null,
        salt: formData.salt ? parseFloat(formData.salt) : null,
        totalChlorines: formData.totalChlorines ? parseFloat(formData.totalChlorines) : null,
        outdoorTemp: formData.outdoorTemp ? parseFloat(formData.outdoorTemp) : null,
        amountFed: formData.amountFed ? parseFloat(formData.amountFed) : null,
        note: formData.note
      };
      console.log('Request payload:', payload); // Log the request payload
      const response = await axios.post('http://localhost:8080/api/waterparameter/add', payload, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
        }
      });
      setWaterParameters([...waterParameters, response.data]);
    } catch (error) {
      console.error('Error adding water parameter:', error);
    }
  };

  const updateWaterParameter = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const payload = {
        pond: { id: formData.pond_id }, // Ensure pond_id is nested correctly
        dateTime: new Date(formData.dateTime).toISOString(), // Ensure dateTime is an ISO string
        nitrogenDioxide: formData.nitrogenDioxide ? parseFloat(formData.nitrogenDioxide) : null,
        oxygen: formData.oxygen ? parseFloat(formData.oxygen) : null,
        nitrate: formData.nitrate ? parseFloat(formData.nitrate) : null,
        temperature: formData.temperature ? parseFloat(formData.temperature) : null,
        phosphate: formData.phosphate ? parseFloat(formData.phosphate) : null,
        pHValue: formData.pHValue ? parseFloat(formData.pHValue) : null,
        ammonium: formData.ammonium ? parseFloat(formData.ammonium) : null,
        potassiumHydride: formData.potassiumHydride ? parseFloat(formData.potassiumHydride) : null,
        generalHardness: formData.generalHardness ? parseFloat(formData.generalHardness) : null,
        carbonDioxide: formData.carbonDioxide ? parseFloat(formData.carbonDioxide) : null,
        salt: formData.salt ? parseFloat(formData.salt) : null,
        totalChlorines: formData.totalChlorines ? parseFloat(formData.totalChlorines) : null,
        outdoorTemp: formData.outdoorTemp ? parseFloat(formData.outdoorTemp) : null,
        amountFed: formData.amountFed ? parseFloat(formData.amountFed) : null,
        note: formData.note
      };
      console.log('Request payload:', payload); // Log the request payload
      const response = await axios.put('http://localhost:8080/api/waterparameter/update', payload, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
        }
      });
      setWaterParameters(waterParameters.map(param => 
        param.pond_id === formData.pond_id && param.dateTime === formData.dateTime ? response.data : param
      ));
    } catch (error) {
      console.error('Error updating water parameter:', error);
    }
  };

  const viewWaterParameterDetails = () => {
    navigate('/water-parameter-details');
  };

  return (
    <div className="container">
      <h2>{isEditing ? 'Update' : 'Add'} Water Parameter</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <FontAwesomeIcon icon={faWater} /> Pond:
          <select name="pond_id" value={formData.pond_id} onChange={handleChange} required>
            <option value="">Select Pond</option>
            {ponds.map(pond => (
              <option key={pond.id} value={pond.id}>{pond.name}</option>
            ))}
          </select>
        </label>
        <label>
          <FontAwesomeIcon icon={faClock} /> Date and Time:
          <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Nitrite (NO2) mg/l:
          <input type="number" step="0.01" name="nitrogenDioxide" value={formData.nitrogenDioxide} onChange={handleChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Oxygen (O2) mg/l:
          <input type="number" step="0.01" name="oxygen" value={formData.oxygen} onChange={handleChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Nitrate (NO3) mg/l:
          <input type="number" step="0.01" name="nitrate" value={formData.nitrate} onChange={handleChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faThermometerHalf} /> Temperature (°C):
          <input type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faFlask} /> Phosphate (PO4) mg/l:
          <input type="number" step="0.01" name="phosphate" value={formData.phosphate} onChange={handleChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faVial} /> pH-Value:
          <input type="number" step="0.01" name="pHValue" value={formData.pHValue} onChange={handleChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faLeaf} /> Ammonium (NH4) mg/l:
          <input type="number" step="0.01" name="ammonium" value={formData.ammonium} onChange={handleChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faFlask} /> KH (mg/l):
          <input type="number" step="0.01" name="potassiumHydride" value={formData.potassiumHydride} onChange={handleChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faFlask} /> GH (mg/l):
          <input type="number" step="0.01" name="generalHardness" value={formData.generalHardness} onChange={handleChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faCloud} /> CO2 (mg/l):
          <input type="number" step="0.01" name="carbonDioxide" value={formData.carbonDioxide} onChange={handleChange} />
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
        <button type="submit">{isEditing ? 'Update' : 'Submit'}</button>
      </form>

      <button onClick={viewWaterParameterDetails}>View Water Parameter Details</button>

      <h2>Water Parameter Details</h2>
      {waterParameters.map((param, index) => (
        <div key={index} className="details">
          <p>Pond ID: {param.pond.id}</p>
          <p>Date and Time: {param.dateTime}</p>
          <p>Nitrite (NO2): {param.nitrogenDioxide} mg/l</p>
          <p>Oxygen (O2): {param.oxygen} mg/l</p>
          <p>Nitrate (NO3): {param.nitrate} mg/l</p>
          <p>Temperature: {param.temperature} °C</p>
          <p>Phosphate (PO4): {param.phosphate} mg/l</p>
          <p>pH-Value: {param.pHValue}</p>
          <p>Ammonium (NH4): {param.ammonium} mg/l</p>
          <p>KH: {param.potassiumHydride} mg/l</p>
          <p>GH: {param.generalHardness} mg/l</p>
          <p>CO2: {param.carbonDioxide} mg/l</p>
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