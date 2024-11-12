import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSkullCrossbones, faTint, faThermometerHalf, faCloudSun, faUtensils, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/WaterParameterHistory.css'; // Import the CSS file for styling

const WaterParameterHistory = () => {
  const { pondId } = useParams(); // Get pondId from URL parameters
  const [waterParameters, setWaterParameters] = useState([]);
  const [ponds, setPonds] = useState([]); // Initialize with an empty array
  const [selectedPondId, setSelectedPondId] = useState(pondId || ''); // Initialize with pondId from URL or empty string
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
          if (pondsResponse.data.content.length > 0 && !selectedPondId) {
            setSelectedPondId(pondsResponse.data.content[0].id); // Set the first pond as the selected pond if none is selected
          }
        }
      }
    } catch (error) {
      console.error('Error fetching ponds:', error.response ? error.response.data : error.message);
    }
  }, [navigate, selectedPondId]);

  useEffect(() => {
    fetchAccountPonds();
  }, [fetchAccountPonds]);

  useEffect(() => {
    if (selectedPondId) {
      const fetchWaterParameters = async () => {
        try {
          const token = localStorage.getItem('token'); // Get the token from localStorage
          const response = await axios.get(`http://localhost:8080/api/waterparameter/byPondId/${selectedPondId}`, {
            headers: {
              Authorization: `Bearer ${token}` // Include the token in the headers
            }
          });
          setWaterParameters(response.data || []); // Ensure waterParameters is an array
        } catch (error) {
          console.error('Error fetching water parameters:', error);
          toast.error('Failed to fetch water parameters.');
        }
      };

      fetchWaterParameters();
    }
  }, [selectedPondId]);

  const handlePondChange = (e) => {
    setSelectedPondId(e.target.value);
  };

  return (
    <div className="water-parameter-history-container">
      <ToastContainer />
      <h2>Water Parameter History</h2>
      <label>
        Select Pond:
        <select value={selectedPondId} onChange={handlePondChange}>
          <option value="">Select Pond</option>
          {ponds.map(pond => (
            <option key={pond.id} value={pond.id}>{pond.name}</option>
          ))}
        </select>
      </label>
      <div className="water-parameter-list">
        {waterParameters.map(param => (
          <div key={param.id} className="water-parameter">
            <h4>Date and Time: {param.dateTime}</h4>
            <p><FontAwesomeIcon icon={faSkullCrossbones} /> Nitrite (NO2): {param.nitrogenDioxide} mg/l</p>
            <p><FontAwesomeIcon icon={faTint} /> Oxygen (O2): {param.oxygen} mg/l</p>
            <p><FontAwesomeIcon icon={faTint} /> Nitrate (NO3): {param.nitrate} mg/l</p>
            <p><FontAwesomeIcon icon={faThermometerHalf} /> Temperature: {param.temperature} °C</p>
            <p><FontAwesomeIcon icon={faTint} /> Phosphate (PO4): {param.phosphate} mg/l</p>
            <p><FontAwesomeIcon icon={faTint} /> pH-Value: {param.pHValue}</p>
            <p><FontAwesomeIcon icon={faTint} /> Ammonium (NH4): {param.ammonium} mg/l</p>
            <p><FontAwesomeIcon icon={faTint} /> KH: {param.potassiumHydride} °dH</p>
            <p><FontAwesomeIcon icon={faTint} /> GH: {param.generalHardness} °dH</p>
            <p><FontAwesomeIcon icon={faTint} /> CO2: {param.carbonDioxide} mg/l</p>
            <p><FontAwesomeIcon icon={faTint} /> Salt: {param.salt} %</p>
            <p><FontAwesomeIcon icon={faTint} /> Total Chlorines: {param.totalChlorines} mg/l</p>
            <p><FontAwesomeIcon icon={faCloudSun} /> Outdoor Temperature: {param.outdoorTemp} °C</p>
            <p><FontAwesomeIcon icon={faUtensils} /> Amount Fed: {param.amountFed} g</p>
            <p><FontAwesomeIcon icon={faStickyNote} /> Note: {param.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterParameterHistory;