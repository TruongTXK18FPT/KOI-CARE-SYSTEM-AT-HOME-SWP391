import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/PondDetails.css'; // Import the CSS file for styling

const PondDetails = () => {
  const [ponds, setPonds] = useState([]);
  const [selectedPond, setSelectedPond] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [accountId, setAccountId] = useState(null); // Store accountId
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountId = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:8080/api/ponds/account/details', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setAccountId(response.data.accountId);
        } catch (error) {
          console.error('Error fetching account details:', error);
        }
      }
    };

    fetchAccountId();
  }, []);

  useEffect(() => {
    const fetchPonds = async () => {
      if (!accountId) {
        return;
      }
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const response = await axios.get(`http://localhost:8080/api/ponds/account/getByAccountId/${accountId}?page=${page}&size=10`, {
          headers: {
            Authorization: `Bearer ${token}` // Include the token in the headers
          }
        });
        const pondsData = response.data.content;

        // Fetch total koi fish for each pond
        const pondsWithTotalKoi = await Promise.all(
          pondsData.map(async (pond) => {
            try {
              const totalKoiResponse = await axios.get(`http://localhost:8080/api/ponds/getTotalKoi/${pond.id}`, {
                headers: {
                  Authorization: `Bearer ${token}` // Include the token in the headers
                }
              });
              return { ...pond, totalKoi: totalKoiResponse.data };
            } catch (error) {
              console.error(`Error fetching total koi for pond ${pond.id}:`, error.response ? error.response.data : error.message);
              return { ...pond, totalKoi: 'Error fetching total koi' };
            }
          })
        );

        setPonds(pondsWithTotalKoi);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching ponds:', error.response ? error.response.data : error.message);
      }
    };

    fetchPonds();
  }, [accountId, page]);

  const handleUpdatePond = (pond) => {
    setSelectedPond(pond);
    setIsEditing(true);
  };

  const handleDeletePond = async (pondId) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      await axios.delete(`http://localhost:8080/api/ponds/delete/${pondId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
        }
      });
      setPonds(ponds.filter(pond => pond.id !== pondId));
    } catch (error) {
      console.error('Error deleting pond:', error);
    }
  };

  const handleSavePond = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      await axios.put(`http://localhost:8080/api/ponds/update/${selectedPond.id}`, selectedPond, {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the headers
        }
      });
      setPonds(ponds.map(pond => (pond.id === selectedPond.id ? selectedPond : pond)));
      setIsEditing(false);
      setSelectedPond(null); // Fixed typo here, was `setSelectedPpond`
    } catch (error) {
      console.error('Error updating pond:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPond({ ...selectedPond, [name]: value });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAddNewPond = () => {
    navigate('/pond');
  };

  return (
    <div className="pond-details-container">
      <h2>Existing Ponds</h2>
      <button onClick={handleAddNewPond} className="add-pond-btn">Add New Pond</button>
      <div className="pond-list">
        {ponds.map(pond => (
          <div key={pond.id} className="pond">
            <h3>{pond.name}</h3>
            <p>Volume: {pond.volume}</p>
            <p>Drain Count: {pond.drainCount}</p>
            <p>Depth: {pond.depth}</p>
            <p>Skimmer Count: {pond.skimmerCount}</p>
            <p>Total Koi Fish: {pond.totalKoi}</p> {/* Display total koi fish */}
            {pond.image && <img src={pond.image} alt={pond.name} className="pond-image" />}
            <button onClick={() => handleUpdatePond(pond)} className="update-btn">
              <FontAwesomeIcon icon={faEdit} /> Update
            </button>
            <button onClick={() => handleDeletePond(pond.id)} className="delete-btn">
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

      {isEditing && selectedPond && (
        <div className="edit-pond-form">
          <h3>Update Pond</h3>
          <label>
            Pond Name:
            <input type="text" name="name" value={selectedPond.name} onChange={handleInputChange} />
          </label>
          <label>
            Volume:
            <input type="text" name="volume" value={selectedPond.volume} onChange={handleInputChange} />
          </label>
          <label>
            Drain Count:
            <input type="text" name="drainCount" value={selectedPond.drainCount} onChange={handleInputChange} />
          </label>
          <label>
            Depth:
            <input type="text" name="depth" value={selectedPond.depth} onChange={handleInputChange} />
          </label>
          <label>
            Skimmer Count:
            <input type="text" name="skimmerCount" value={selectedPond.skimmerCount} onChange={handleInputChange} />
          </label>
          <label>
            Image URL:
            <input type="text" name="image" value={selectedPond.image} onChange={handleInputChange} />
          </label>
          <button onClick={handleSavePond} className="save-btn">Save</button>
        </div>
      )}
    </div>
  );
};

export default PondDetails;


