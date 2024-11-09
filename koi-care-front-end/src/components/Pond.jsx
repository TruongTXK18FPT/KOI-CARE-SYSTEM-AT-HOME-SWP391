import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faRulerVertical, faTint, faSkull, faImage, faEye } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Pond.css'; // Import the CSS file for styling

const Pond = () => {
  const [newPond, setNewPond] = useState({
    id: '',
    name: '',
    volume: '',
    drainCount: '',
    depth: '',
    skimmerCount: '',
    image: '',
    totalKoi: 0,
    accountId: '' // Initialize accountId
  });

  const navigate = useNavigate();

  // Fetch account details and store accountId in the state
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get('http://localhost:8080/api/ponds/account/details', {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the headers
          }
        });
        const { accountId } = response.data;
        setNewPond((prevPond) => ({ ...prevPond, accountId })); // Set the accountId in the state
      } catch (error) {
        console.error('Error fetching account details:', error);
      }
    };

    fetchAccountDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPond({ ...newPond, [name]: value });
  };

  const handleAddPond = async (e) => {
    e.preventDefault();

    // Validation checks for negative numbers
    const { volume, drainCount, depth, skimmerCount } = newPond;
    if (volume < 0 || drainCount < 0 || depth < 0 || skimmerCount < 0) {
      toast.error('Values cannot be negative.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const { id, accountId, ...pondData } = newPond; // Exclude id but include accountId

      const response = await axios.post(`http://localhost:8080/api/ponds/add`, {
        ...pondData,
        account: { accountId: newPond.accountId }, // Send accountId as part of account object
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Pond added:', response.data);
      setNewPond({
        id: '',
        name: '',
        volume: '',
        drainCount: '',
        depth: '',
        skimmerCount: '',
        image: '',
        totalKoi: 0,
        accountId: newPond.accountId,
      });
      toast.success('Pond added successfully!'); // Show success toast notification
    } catch (error) {
      console.error('Error adding pond:', error);
      toast.error('Failed to add pond.'); // Show error toast notification
    }
  };

  const handleViewPonds = () => {
    navigate('/pond-details');
  };

  return (
    <div className="pond-container">
      <ToastContainer />
      <button onClick={handleViewPonds} className="view-ponds-btn">
        <FontAwesomeIcon icon={faEye} /> View Existing Ponds
      </button>
      <h2>Add New Pond</h2>
      <form onSubmit={handleAddPond} className="add-pond-form">
        <label>
          <FontAwesomeIcon icon={faWater} className="icon" /> Pond Name:
          <input type="text" name="name" placeholder="Pond Name" value={newPond.name} onChange={handleInputChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faRulerVertical} className="icon" /> Volume(l):
          <input type="number" name="volume" placeholder="Volume" value={newPond.volume} onChange={handleInputChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} className="icon" /> Drain Count:
          <input type="number" name="drainCount" placeholder="Drain Count" value={newPond.drainCount} onChange={handleInputChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faRulerVertical} className="icon" /> Depth(m):
          <input type="number" name="depth" placeholder="Depth" value={newPond.depth} onChange={handleInputChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faSkull} className="icon" /> Skimmer Count:
          <input type="number" name="skimmerCount" placeholder="Skimmer Count" value={newPond.skimmerCount} onChange={handleInputChange} required />
        </label>
        <label>
          <FontAwesomeIcon icon={faImage} className="icon" /> Image URL:
          <input type="text" name="image" placeholder="Image URL" value={newPond.image} onChange={handleInputChange} required />
        </label>
        <button type="submit">Add Pond</button>
      </form>
    </div>
  );
};

export default Pond;
