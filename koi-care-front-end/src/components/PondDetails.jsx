import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faWater, faRulerVertical, faFish, faTint, faThermometerHalf, faClock, faSkullCrossbones, faCloudSun, faUtensils, faStickyNote } from '@fortawesome/free-solid-svg-icons';
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

        // Fetch total koi fish and water parameters for each pond
        const pondsWithDetails = await Promise.all(
          pondsData.map(async (pond) => {
            try {
              const totalKoiResponse = await axios.get(`http://localhost:8080/api/ponds/getTotalKoi/${pond.id}`, {
                headers: {
                  Authorization: `Bearer ${token}` // Include the token in the headers
                }
              });

              const waterParametersResponse = await axios.get(`http://localhost:8080/api/waterparameter/byPondId/${pond.id}`, {
                headers: {
                  Authorization: `Bearer ${token}` // Include the token in the headers
                }
              });

              return { ...pond, totalKoi: totalKoiResponse.data, waterParameters: waterParametersResponse.data };
            } catch (error) {
              console.error(`Error fetching details for pond ${pond.id}:`, error.response ? error.response.data : error.message);
              return { ...pond, totalKoi: 'Error fetching total koi', waterParameters: [] };
            }
          })
        );

        setPonds(pondsWithDetails);
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
            <p><FontAwesomeIcon icon={faWater} /> Volume: {pond.volume}</p>
            <p><FontAwesomeIcon icon={faRulerVertical} /> Drain Count: {pond.drainCount}</p>
            <p><FontAwesomeIcon icon={faRulerVertical} /> Depth: {pond.depth}</p>
            <p><FontAwesomeIcon icon={faTint} /> Skimmer Count: {pond.skimmerCount}</p>
            <p><FontAwesomeIcon icon={faFish} /> Total Koi Fish: {pond.totalKoi}</p> {/* Display total koi fish */}
            {pond.image && <img src={pond.image} alt={pond.name} className="pond-image" />}
            <button onClick={() => handleUpdatePond(pond)} className="update-btn">
              <FontAwesomeIcon icon={faEdit} /> Update
            </button>
            <button onClick={() => handleDeletePond(pond.id)} className="delete-btn">
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            <div className="water-parameters">
              <h4>Water Parameters</h4>
              {pond.waterParameters.length > 0 ? (
                pond.waterParameters.map((param, index) => (
                  <div key={index} className="water-parameter">
                    <p><FontAwesomeIcon icon={faClock} /> Date and Time: {param.dateTime}</p>
                    <p><FontAwesomeIcon icon={faSkullCrossbones} /> Nitrite (NO2): {param.nitrogenDioxide} mg/l</p>
                    <p><FontAwesomeIcon icon={faTint} /> Oxygen (O2): {param.oxygen} mg/l</p>
                    <p><FontAwesomeIcon icon={faTint} /> Nitrate (NO3): {param.nitrate} mg/l</p>
                    <p><FontAwesomeIcon icon={faThermometerHalf} /> Temperature: {param.temperature} °C</p>
                    <p><FontAwesomeIcon icon={faTint} /> Phosphate (PO4): {param.phosphate} mg/l</p>
                    <p><FontAwesomeIcon icon={faTint} /> pH-Value: {param.pHValue}</p>
                    <p><FontAwesomeIcon icon={faTint} /> Ammonium (NH4): {param.ammonium} mg/l</p>
                    <p><FontAwesomeIcon icon={faTint} /> KH: {param.potassiumHydride} mg/l</p>
                    <p><FontAwesomeIcon icon={faTint} /> GH: {param.generalHardness} mg/l</p>
                    <p><FontAwesomeIcon icon={faTint} /> CO2: {param.carbonDioxide} mg/l</p>
                    <p><FontAwesomeIcon icon={faTint} /> Salt: {param.salt} %</p>
                    <p><FontAwesomeIcon icon={faTint} /> Total Chlorines: {param.totalChlorines} mg/l</p>
                    <p><FontAwesomeIcon icon={faCloudSun} /> Outdoor Temperature: {param.outdoorTemp} °C</p>
                    <p><FontAwesomeIcon icon={faUtensils} /> Amount Fed: {param.amountFed} g</p>
                    <p><FontAwesomeIcon icon={faStickyNote} /> Note: {param.note}</p>
                  </div>
                ))
              ) : (
                <p>No water parameters found for this pond.</p>
              )}
            </div>
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


