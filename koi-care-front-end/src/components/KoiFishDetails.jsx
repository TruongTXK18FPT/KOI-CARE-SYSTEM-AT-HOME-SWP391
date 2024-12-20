import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faTimes, faMars, faVenus, faHeart, faSkull, faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/KoiFishDetails.css'; // Import the CSS file for styling

const KoiFishDetails = () => {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom
  const [koiFish, setKoiFish] = useState([]);
  const [selectedKoi, setSelectedKoi] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [ponds, setPonds] = useState([]);
  const [selectedPondId, setSelectedPondId] = useState(''); // Set initial value to an empty string

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
          if (pondsResponse.data.content.length > 0) {
            setSelectedPondId(pondsResponse.data.content[0].id); // Set the first pond as the selected pond
          }
        }
      }
    } catch (error) {
      console.error('Error fetching ponds:', error.response ? error.response.data : error.message);
    }
  }, [navigate]);

  useEffect(() => {
    fetchAccountPonds();
  }, [fetchAccountPonds]);

  useEffect(() => {
    const fetchKoiFish = async () => {
      if (!selectedPondId) {
        console.error('Pond ID is undefined');
        return;
      }
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get(`http://localhost:8080/api/koifish/pond/getByPondId/${selectedPondId}?page=${page}&size=10`, {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the headers
          }
        });
        setKoiFish(response.data.content);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Pond not found:', error.response.data);
        } else {
          console.error('Error fetching koi fish:', error);
        }
      }
    };

    fetchKoiFish();
  }, [selectedPondId, page]);

  const handleUpdateKoi = (koi) => {
    setSelectedKoi(koi);
    setIsEditing(true);
  };

  const handleDeleteKoi = async (fishId) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      await axios.delete(`http://localhost:8080/api/koifish/delete/${fishId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
        }
      });
      setKoiFish(koiFish.filter(koi => koi.fish_id !== fishId));
      toast.success('Koi fish deleted successfully!'); // Show success toast notification
    } catch (error) {
      console.error('Error deleting koi fish:', error);
      toast.error('Failed to delete koi fish.'); // Show error toast notification
    }
  };

  const handleSaveKoi = async () => {
    const { quantity, age, length, weight, physique, variety, breeder, purchasePrice } = selectedKoi;

    // Validation checks
    if (quantity < 0 || quantity > 1000) {
      toast.error('Quantity must be between 0 and 1000.');
      return;
    }
    if (age < 0 || age > 200) {
      toast.error('Age must be between 0 and 200.');
      return;
    }
    if (length < 0 || length > 300) {
      toast.error('Length must be between 0 and 300 cm.');
      return;
    }
    if (weight < 0 || weight > 50) {
      toast.error('Weight must be between 0 and 50 kg.');
      return;
    }
    if (!isNaN(physique)) {
      toast.error('Physique must not be a number.');
      return;
    }
    if (!isNaN(variety)) {
      toast.error('Variety must not be a number.');
      return;
    }
    if (!isNaN(breeder)) {
      toast.error('Breeder must not be a number.');
      return;
    }
    if (purchasePrice <= 0) {
      toast.error('Purchase Price must be greater than 0.');
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      await axios.put(`http://localhost:8080/api/koifish/update/${selectedKoi.fish_id}`, selectedKoi, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
        }
      });
      setKoiFish(koiFish.map(koi => (koi.fish_id === selectedKoi.fish_id ? selectedKoi : koi)));
      setIsEditing(false);
      setSelectedKoi(null);
      toast.success('Koi fish updated successfully!'); // Show success toast notification
    } catch (error) {
      console.error('Error updating koi fish:', error);
      toast.error('Failed to update koi fish.'); // Show error toast notification
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedKoi({ ...selectedKoi, [name]: value });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePondChange = (e) => {
    setSelectedPondId(e.target.value);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
    setSelectedKoi(null);
  };

  return (
    <div className="koifish-details-container">
      <ToastContainer />
      <h2>Existing Koi Fish</h2>
      <label>
        Select Pond:
        <select value={selectedPondId || ''} onChange={handlePondChange}>
          <option value="">Select Pond</option>
          {ponds.map(pond => (
            <option key={pond.id} value={pond.id}>{pond.name}</option>
          ))}
        </select>
      </label>
      <div className="koi-list">
        {koiFish.map(koi => (
          <div key={koi.fish_id} className="koi">
            <div className={`status-icon ${koi.status}`}>
              <FontAwesomeIcon icon={koi.status === 'live' ? faHeart : koi.status === 'deceased' ? faSkull : faThermometerHalf} />
            </div>
            <h3>{koi.nameFish}</h3>
            <p>Pond: {koi.pond ? koi.pond.name : 'N/A'}</p>
            <p>Quantity: {koi.quantity}</p>
            <p>Physique: {koi.physique}</p>
            <p>Age: {koi.age}</p>
            <p>Length: {koi.length} cm</p>
            <p>Weight: {koi.weight} kg</p>
            <p>Sex: {koi.sex === 'MALE' ? <FontAwesomeIcon icon={faMars} /> : <FontAwesomeIcon icon={faVenus} />}</p>
            <p>Variety: {koi.variety}</p>
            <p>In Pond Since: {koi.inPondSince}</p>
            <p>Breeder: {koi.breeder}</p>
            <p>Purchase Price: {koi.purchasePrice} VND</p>
            {koi.imageFish && <img src={koi.imageFish} alt={koi.nameFish} className="koi-image" />}
            <button onClick={() => handleUpdateKoi(koi)} className="update-btn">
              <FontAwesomeIcon icon={faEdit} /> Update
            </button>
            <button onClick={() => handleDeleteKoi(koi.fish_id)} className="delete-btn">
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={index === page ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {isEditing && selectedKoi && (
        <div className="edit-koi-form centered-form">
          <button className="close-btn" onClick={handleCloseForm}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h3>Update Koi Fish</h3>
          <label>
            Koi Name:
            <input type="text" name="nameFish" value={selectedKoi.nameFish} onChange={handleInputChange} placeholder="Koi Name" />
          </label>
          <label>
            Image URL:
            <input type="text" name="imageFish" value={selectedKoi.imageFish} onChange={handleInputChange} placeholder="Image URL" />
          </label>
          <label>
            Quantity:
            <input type="number" name="quantity" value={selectedKoi.quantity} onChange={handleInputChange} placeholder="Quantity (0-1000)" />
          </label>
          <label>
            Physique:
            <input type="text" name="physique" value={selectedKoi.physique} onChange={handleInputChange} placeholder="Physique" />
          </label>
          <label>
            Age:
            <input type="number" name="age" value={selectedKoi.age} onChange={handleInputChange} placeholder="Age (0-200)" />
          </label>
          <label>
            Length:
            <input type="number" name="length" value={selectedKoi.length} onChange={handleInputChange} placeholder="Length (0-300 cm)" />
          </label>
          <label>
            Weight:
            <input type="number" name="weight" value={selectedKoi.weight} onChange={handleInputChange} placeholder="Weight (0-50 kg)" />
          </label>
          <label>
            Sex:
            <select name="sex" value={selectedKoi.sex} onChange={handleInputChange}>
              <option value="">Select Sex</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </label>
          <label>
            Variety:
            <input type="text" name="variety" value={selectedKoi.variety} onChange={handleInputChange} placeholder="Variety" />
          </label>
          <label>
            In Pond Since:
            <input type="date" name="inPondSince" value={selectedKoi.inPondSince} onChange={handleInputChange} />
          </label>
          <label>
            Breeder:
            <input type="text" name="breeder" value={selectedKoi.breeder} onChange={handleInputChange} placeholder="Breeder" />
          </label>
          <label>
            Purchase Price:
            <input type="number" name="purchasePrice" value={selectedKoi.purchasePrice} onChange={handleInputChange} placeholder="Purchase Price" />
          </label>
          <label>
            Status:
            <select name="status" value={selectedKoi.status} onChange={handleInputChange}>
              <option value="live">Live</option>
              <option value="deceased">Deceased</option>
              <option value="sick">Sick</option>
            </select>
          </label>
          <button onClick={handleSaveKoi} className="save-btn">Save</button>
          <button onClick={handleCloseForm} className="cancel-btn">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default KoiFishDetails;