import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faWater, faRulerVertical, faFish, faTint, faThermometerHalf, faClock, faSkullCrossbones, faCloudSun, faUtensils, faStickyNote, faEye } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/PondDetails.css'; // Import the CSS file for styling

const PondDetails = () => {
  const [ponds, setPonds] = useState([]);
  const [selectedPond, setSelectedPond] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [accountId, setAccountId] = useState(null); // Store accountId
  const [showWaterParameters, setShowWaterParameters] = useState({}); // Track visibility of water parameters
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
          console.log('Account details response:', response.data); // Add this log
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
        console.log('Fetching ponds for accountId:', accountId); // Add this log
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

              const waterParameters = waterParametersResponse.data;
              const recentWaterParameter = waterParameters.length > 0
                ? waterParameters.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))[0]
                : null;

              return { ...pond, totalKoi: totalKoiResponse.data, recentWaterParameter };
            } catch (error) {
              console.error(`Error fetching details for pond ${pond.id}:`, error.response ? error.response.data : error.message);
              return { ...pond, totalKoi: 'Error fetching total koi', recentWaterParameter: null };
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
      toast.success('Pond deleted successfully!'); // Show success toast notification
    } catch (error) {
      console.error('Error deleting pond:', error);
      toast.error('Failed to delete pond.'); // Show error toast notification
    }
  };

  const handleSavePond = async () => {
    const { volume, drainCount, depth, skimmerCount } = selectedPond;
    if (volume < 0 || drainCount < 0 || depth < 0 || skimmerCount < 0) {
      toast.error('Values cannot be negative.');
      return;
    }

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
      toast.success('Pond updated successfully!'); // Show success toast notification
    } catch (error) {
      console.error('Error updating pond:', error);
      toast.error('Failed to update pond.'); // Show error toast notification
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

  const toggleWaterParameters = (pondId) => {
    setShowWaterParameters(prevState => ({
      ...prevState,
      [pondId]: !prevState[pondId]
    }));
  };

  const handleViewKoiFish = (pondId) => {
    navigate('/koi-fish-details');
  };

  const handleViewWaterParameterHistory = (pondId) => {
    navigate(`/water-parameter-history`);
  };

  return (
    <div className="pond-details-container">
      <ToastContainer />
      <h2>Existing Ponds</h2>
      <button onClick={handleAddNewPond} className="add-pond-btn">Add New Pond</button>
      <div className="pond-list">
        {ponds.map(pond => (
          <div key={pond.id} className="pond">
            <h3>{pond.name}</h3>
            <p><FontAwesomeIcon icon={faWater} /> Volume: {pond.volume} l</p>
            <p><FontAwesomeIcon icon={faRulerVertical} /> Drain Count: {pond.drainCount}</p>
            <p><FontAwesomeIcon icon={faRulerVertical} /> Depth: {pond.depth} m</p>
            <p><FontAwesomeIcon icon={faTint} /> Skimmer Count: {pond.skimmerCount}</p>
            <p><FontAwesomeIcon icon={faFish} /> Total Koi Fish: {pond.totalKoi} Koi fish</p> {/* Display total koi fish */}
            {pond.image && <img src={pond.image} alt={pond.name} className="pond-image" />}
            <button onClick={() => handleUpdatePond(pond)} className="update-btn">
              <FontAwesomeIcon icon={faEdit} /> Update
            </button>
            <button onClick={() => handleDeletePond(pond.id)} className="delete-btn">
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
            <button onClick={() => toggleWaterParameters(pond.id)} className="view-water-parameters-btn">
              <FontAwesomeIcon icon={faEye} /> {showWaterParameters[pond.id] ? 'Hide' : 'View'} Water Parameters
            </button>
            <button onClick={() => handleViewKoiFish(pond.id)} className="view-koi-fish-btn">
              <FontAwesomeIcon icon={faFish} /> View Koi Fish
            </button>
            <button onClick={() => handleViewWaterParameterHistory(pond.id)} className="view-water-parameter-history-btn">
              <FontAwesomeIcon icon={faClock} /> View Water Parameter History
            </button>
            {showWaterParameters[pond.id] && pond.recentWaterParameter && (
              <div className="water-parameters">
                <h4>Recent Water Parameter</h4>
                <p><FontAwesomeIcon icon={faClock} /> Date and Time: {pond.recentWaterParameter.dateTime}</p>
                <p><FontAwesomeIcon icon={faSkullCrossbones} /> Nitrite (NO2): {pond.recentWaterParameter.nitrogenDioxide} mg/l</p>
                <p><FontAwesomeIcon icon={faTint} /> Oxygen (O2): {pond.recentWaterParameter.oxygen} mg/l</p>
                <p><FontAwesomeIcon icon={faTint} /> Nitrate (NO3): {pond.recentWaterParameter.nitrate} mg/l</p>
                <p><FontAwesomeIcon icon={faThermometerHalf} /> Temperature: {pond.recentWaterParameter.temperature} °C</p>
                <p><FontAwesomeIcon icon={faTint} /> Phosphate (PO4): {pond.recentWaterParameter.phosphate} mg/l</p>
                <p><FontAwesomeIcon icon={faTint} /> pH-Value: {pond.recentWaterParameter.pHValue}</p>
                <p><FontAwesomeIcon icon={faTint} /> Ammonium (NH4): {pond.recentWaterParameter.ammonium} mg/l</p>
                <p><FontAwesomeIcon icon={faTint} /> KH: {pond.recentWaterParameter.potassiumHydride} °dH</p>
                <p><FontAwesomeIcon icon={faTint} /> GH: {pond.recentWaterParameter.generalHardness} °dH</p>
                <p><FontAwesomeIcon icon={faTint} /> CO2: {pond.recentWaterParameter.carbonDioxide} mg/l</p>
                <p><FontAwesomeIcon icon={faTint} /> Salt: {pond.recentWaterParameter.salt} %</p>
                <p><FontAwesomeIcon icon={faTint} /> Total Chlorines: {pond.recentWaterParameter.totalChlorines} mg/l</p>
                <p><FontAwesomeIcon icon={faCloudSun} /> Outdoor Temperature: {pond.recentWaterParameter.outdoorTemp} °C</p>
                <p><FontAwesomeIcon icon={faUtensils} /> Amount Fed: {pond.recentWaterParameter.amountFed} g</p>
                <p><FontAwesomeIcon icon={faStickyNote} /> Note: {pond.recentWaterParameter.note}</p>
              </div>
            )}
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
            <input type="number" name="volume" value={selectedPond.volume} onChange={handleInputChange} />
          </label>
          <label>
            Drain Count:
            <input type="number" name="drainCount" value={selectedPond.drainCount} onChange={handleInputChange} />
          </label>
          <label>
            Depth:
            <input type="number" name="depth" value={selectedPond.depth} onChange={handleInputChange} />
          </label>
          <label>
            Skimmer Count:
            <input type="number" name="skimmerCount" value={selectedPond.skimmerCount} onChange={handleInputChange} />
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