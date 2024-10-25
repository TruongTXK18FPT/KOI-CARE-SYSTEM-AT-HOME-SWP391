import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFish, faImage, faSortNumericUp, faRulerVertical, faCalendarAlt, faWeight, faVenusMars, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import '../styles/KoiFish.css'; // Import the CSS file for styling

const KoiFish = () => {
  const [newKoi, setNewKoi] = useState({
    fish_id: '',
    nameFish: '',
    imageFish: '',
    quantity: '',
    physique: '',
    age: '',
    length: '',
    weight: '',
    sex: '',
    variety: '',
    inPondSince: '',
    breeder: '',
    purchasePrice: ''
  });
  const [ponds, setPonds] = useState([]);
  const [selectedPond, setSelectedPond] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewKoi({ ...newKoi, [name]: value });
  };

  const handleAddKoi = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        console.error('No token found, redirecting to login');
        navigate('/login'); // Redirect to login if no token found
        return;
      }

      const payload = { ...newKoi, pond: { id: selectedPond } };
      console.log('Request payload:', payload); // Log the request payload

      const response = await axios.post('http://localhost:8080/api/koifish/add', payload, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
        }
      });
        
      console.log('Koi fish added successfully:', response.data);
      setNewKoi({
        fish_id: '',
        nameFish: '',
        imageFish: '',
        quantity: '',
        physique: '',
        age: '',
        length: '',
        weight: '',
        sex: '',
        variety: '',
        inPondSince: '',
        breeder: '',
        purchasePrice: ''
      });
      setSuccessMessage('Koi fish added successfully!'); // Set success message
    } catch (error) {
      console.error('Error adding koi fish:', error.response ? error.response.data : error.message);
    }
  };

  const handleViewKoiFish = () => {
    navigate('/koi-fish-details');
  };

  return (
    <div className="koifish-container">
      <h2>Koi Fish Management</h2>
      <button onClick={handleViewKoiFish} className="view-koi-btn">
        <FontAwesomeIcon icon={faEye} /> View Existing Koi Fish
      </button>
      
      {/* Display success message */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="add-koi-form">
        <h3>Add New Koi Fish</h3>
        <label>
          <FontAwesomeIcon icon={faFish} className="icon" /> Pond:
          <select value={selectedPond} onChange={(e) => setSelectedPond(e.target.value)}>
            <option value="">Select Pond</option>
            {ponds.map(pond => (
              <option key={pond.id} value={pond.id}>{pond.name}</option>
            ))}
          </select>
        </label>
        <label>
          <FontAwesomeIcon icon={faFish} className="icon" /> Koi Name:
          <input type="text" name="nameFish" placeholder="Koi Name" value={newKoi.nameFish} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faImage} className="icon" /> Image URL:
          <input type="text" name="imageFish" placeholder="Image URL" value={newKoi.imageFish} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faSortNumericUp} className="icon" /> Quantity:
          <input type="number" name="quantity" placeholder="Quantity" value={newKoi.quantity} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faRulerVertical} className="icon" /> Physique:
          <input type="text" name="physique" placeholder="Physique" value={newKoi.physique} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" /> Age:
          <input type="number" name="age" placeholder="Age" value={newKoi.age} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faRulerVertical} className="icon" /> Length:
          <input type="number" name="length" placeholder="Length" value={newKoi.length} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faWeight} className="icon" /> Weight:
          <input type="number" name="weight" placeholder="Weight" value={newKoi.weight} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faVenusMars} className="icon" /> Sex:
          <select name="sex" value={newKoi.sex} onChange={handleInputChange}>
            <option value="">Select Sex</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label>
          <FontAwesomeIcon icon={faFish} className="icon" /> Variety:
          <input type="text" name="variety" placeholder="Variety" value={newKoi.variety} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" /> In Pond Since:
          <input type="date" name="inPondSince" value={newKoi.inPondSince} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faFish} className="icon" /> Breeder:
          <input type="text" name="breeder" placeholder="Breeder" value={newKoi.breeder} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faDollarSign} className="icon" /> Purchase Price:
          <input type="number" name="purchasePrice" placeholder="Purchase Price" value={newKoi.purchasePrice} onChange={handleInputChange} />
        </label>
        <button onClick={handleAddKoi}>Add Koi</button>
      </div>
    </div>
  );
};

export default KoiFish;


