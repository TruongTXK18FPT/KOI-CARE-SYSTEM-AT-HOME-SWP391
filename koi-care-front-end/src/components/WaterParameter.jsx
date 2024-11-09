import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater, faClock, faThermometerHalf, faTint, faFlask, faVial, faCloud, faUtensils, faStickyNote, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/WaterParameter.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
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

  const validateFormData = () => {
    const {
      nitrogenDioxide,
      oxygen,
      nitrate,
      temperature,
      phosphate,
      pHValue,
      ammonium,
      potassiumHydride,
      generalHardness,
      carbonDioxide,
      salt,
      totalChlorines,
      outdoorTemp
    } = formData;

    if (nitrogenDioxide < 0 || nitrogenDioxide > 0.1) {
      toast.error('Nitrite (NO2) must be between 0 and 0.1 mg/l');
      return false;
    }
    if (oxygen <= 6.5) {
      toast.error('Oxygen (O2) must be greater than 6.5 mg/l');
      return false;
    }
    if (nitrate < 0 || nitrate > 20) {
      toast.error('Nitrate (NO3) must be between 0 and 20 mg/l');
      return false;
    }
    if (temperature < 5 || temperature > 26) {
      toast.error('Temperature must be between 5 and 26 °C');
      return false;
    }
    if (phosphate < 0 || phosphate > 0.035) {
      toast.error('Phosphate (PO4) must be between 0 and 0.035 mg/l');
      return false;
    }
    if (pHValue < 6.9 || pHValue > 8) {
      toast.error('pH-Value must be between 6.9 and 8');
      return false;
    }
    if (ammonium < 0 || ammonium > 0.1) {
      toast.error('Ammonium (NH4) must be between 0 and 0.1 mg/l');
      return false;
    }
    if (potassiumHydride < 4) {
      toast.error('Carbonate Hardness (KH) must be greater than or equal to 4 °dH');
      return false;
    }
    if (generalHardness < 0 || generalHardness > 21) {
      toast.error('General Hardness (GH) must be between 0 and 21 °dH');
      return false;
    }
    if (carbonDioxide < 5 || carbonDioxide > 35) {
      toast.error('CO2 must be between 5 and 35 mg/l');
      return false;
    }
    if (salt < 0 || salt > 0.1) {
      toast.error('Salt must be between 0 and 0.1%');
      return false;
    }
    if (totalChlorines < 0 || totalChlorines > 0.001) {
      toast.error('Total Chlorines must be between 0 and 0.001 mg/l');
      return false;
    }
    if (outdoorTemp < -40 || outdoorTemp > 40) {
      toast.error('Outdoor Temperature must be between -40 and 40 °C');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormData()) {
      return;
    }
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
    toast.success('Water parameter added successfully!');
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
      toast.error('Failed to add water parameter.');
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
        param.pond.id === formData.pond_id && param.dateTime === formData.dateTime ? response.data : param
      ));
      toast.success('Water parameter updated successfully!');
    } catch (error) {
      console.error('Error updating water parameter:', error);
      toast.error('Failed to update water parameter.');
    }
  };

  const openModal = (content) => {
    setModalContent(content);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalContent('');
  };

  const recommendations = {
    nitrogenDioxide: "Optimal range: 0-0.1 mg/l\nThe nitrite value can only be kept low by a sufficiently large biofilter and a high circulation rate of the pond water volume (0.5-1.0 times per hour) via the filter. If the value is very high in the short term, the pond can be salinated to a salt content of 0.3% to reduce the toxicity.",
    oxygen: "Optimal range: > 6.5 mg/l\nAn increase of the oxygen content is possible by means of aerator pumps.",
    nitrate: "Optimal range: 0-20 mg/l\nThe nitrate value can be positively influenced by large water changes.",
    temperature: "Optimal range: 5-26 °C\nWhen a temperature below 4 °C has been reached, heat the pond slightly. When the temperature exceeds 29 °C, allow a permanent water inflow to stop further heating.",
    phosphate: "Optimal range: 0-0.035 mg/l\nThe phosphate value can be positively influenced by large water changes. If the value is very high in the short term, perform several small partial water changes (5% of the water volume daily) and reduce the amount of food.",
    pHValue: "Optimal range: 6.9-8\nTo stabilise the pH value, it is important to have a carbonate hardness of at least 4 °dH.",
    ammonium: "Optimal range: 0-0.1 mg/l\nThe ammonium value can only be kept low by a sufficiently large biofilter and a high circulation rate of the pond water volume (0.5-1.0 times per hour) via the filter.",
    potassiumHydride: "Optimal range: >= 4 °dH\nTo achieve a carbonate hardness (KH) of at least 4 °dH, water changes are necessary. Use tap water for this! Also measure the KH value of the water coming from the tap. If this is also too low, the water must be artificially hardened using calcium carbonate or sodium hydrogen carbonate.",
    generalHardness: "Optimal range: 0-21 °dH\nFor the overall water hardness a value between 0 and 21 °dH is fine and is not of great importance for keeping koi.",
    carbonDioxide: "Optimal range: 5-35 mg/l\nThe CO2 concentration in the water depends on both the pH value and the carbonate hardness (KH). Thus, CO2 does not need to be measured and can be calculated automatically by KoiControl. If the pH value and the KH value are good, then this is also true for the CO2 concentration.",
    salt: "Optimal range: 0-0.1%\nNormally no salt is needed in a koi pond. For certain treatments, however, the salt content may be increased to 0.5% for a short time (4-5 days). Careful: If the salt content is over 0.1%, certain medicaments are NOT allowed to be administered in parallel! This especially applies to medicaments which contain formalin or potassium.",
    totalChlorines: "Optimal range: 0-0.001 mg/l\nIn a lot of countries, chlorine is added to tap water supplies. However, chlorines are toxic to fish (they damage the respiratory system). Thus, in regions where the tap water contains chlorine, the water needs to be dechlorinated before being added to the pond.",
    outdoorTemp: "Optimal range: -40-40 °C\nThe outside temperature is not relevant as long as the water temperature is within a good range.",
    amountFed: "Tracking the amount of food fed allows you to detect causalities with changes in other water parameters. The ideal amount of food depends on the koi in your pond, the current water temperature and the desired growth. Our food calculator takes all of these factors into account to compute the recommended amount of food."
  };

  return (
    <div className="water-parameter-container">
      <ToastContainer />
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
          <input type="number" step="0.01" name="nitrogenDioxide" value={formData.nitrogenDioxide} onChange={handleChange} placeholder='0-0,1 mg/l'/>
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.nitrogenDioxide)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Oxygen (O2) mg/l:
          <input type="number" step="0.01" name="oxygen" value={formData.oxygen} onChange={handleChange} placeholder='>6,5 mg/l'/>
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.oxygen)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Nitrate (NO3) mg/l:
          <input type="number" step="0.01" name="nitrate" value={formData.nitrate} onChange={handleChange} placeholder='0-20 mg/l'/>
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.nitrate)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faThermometerHalf} /> Temperature (°C):
          <input type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange} placeholder='5-26°C' required />
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.temperature)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faFlask} /> Phosphate (PO4) mg/l:
          <input type="number" step="0.01" name="phosphate" value={formData.phosphate} onChange={handleChange} placeholder='0-0,035 mg/l' />
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.phosphate)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faVial} /> pH-Value:
          <input type="number" step="0.1" name="pHValue" value={formData.pHValue} onChange={handleChange} placeholder='6,9-8' />
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.pHValue)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Ammonium (NH4) mg/l:
          <input type="number" step="0.01" name="ammonium" value={formData.ammonium} onChange={handleChange} placeholder='0-0,1 mg/l' />
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.ammonium)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Carbonate Hardness (KH) °dH:
          <input type="number" name="potassiumHydride" value={formData.potassiumHydride} onChange={handleChange} placeholder='>=4°dH'/>
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.potassiumHydride)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> General Hardness (GH) °dH:
          <input type="number" name="generalHardness" value={formData.generalHardness} onChange={handleChange} placeholder='0-21°dH' />
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.generalHardness)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> CO2 mg/l:
          <input type="number" step="0.01" name="carbonDioxide" value={formData.carbonDioxide} onChange={handleChange} placeholder='5-35 mg/l' />
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.carbonDioxide)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Salt %:
          <input type="number" step="0.01" name="salt" value={formData.salt} onChange={handleChange} placeholder='0-0,1%'/>
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.salt)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faTint} /> Total Chlorines mg/l:
          <input type="number" step="0.001" name="totalChlorines" value={formData.totalChlorines} onChange={handleChange} placeholder='0-0,001 mg/l' />
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.totalChlorines)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faCloud} /> Outdoor Temperature (°C):
          <input type="number" step="0.1" name="outdoorTemp" value={formData.outdoorTemp} onChange={handleChange} placeholder='-40 - 40°C'/>
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.outdoorTemp)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faUtensils} /> Amount Fed:
          <input type="number" step="0.01" name="amountFed" value={formData.amountFed} onChange={handleChange} />
          <FontAwesomeIcon icon={faInfoCircle} onClick={() => openModal(recommendations.amountFed)} />
        </label>
        <label>
          <FontAwesomeIcon icon={faStickyNote} /> Note:
          <textarea name="note" value={formData.note} onChange={handleChange} />
        </label>
        <button type="submit">{isEditing ? 'Update' : 'Add'} Water Parameter</button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Recommendations"
        className="modal"
      >
        <h3>Recommendations</h3>
        <p>{modalContent}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}
export default WaterParameter;
