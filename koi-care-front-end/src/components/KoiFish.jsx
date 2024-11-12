import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFish, faImage, faSortNumericUp, faRulerVertical, faCalendarAlt, faWeight, faVenusMars, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/KoiFish.css'; // Import the CSS file for styling

const koiVarieties = [
  { name: 'Ki Utsuri', description: 'Black koi with yellow patterns.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Ki-Utsuri-696x464.jpg' },
  { name: 'Shiro Utsuri', description: 'Black koi with white patterns.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Shiro-Utsuri-696x464.jpg' },
  { name: 'Hi Utsuri', description: 'Black koi with red patterns.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/hi-utsuri-696x464.jpg' },
  { name: 'Ginrin Ki Utsuri', description: 'Black koi with yellow patterns and metallic scales.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Ginrin-Ki-Utsuri-696x464.jpg' },
  { name: 'Ginrin Hi Utsuri', description: 'Black koi with red patterns and metallic scales.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Ginrin-Hi-Utsuri-696x464.jpg' },
  { name: 'Ginrin Tancho Kohaku', description: 'White koi with a single red spot on the head, with metallic scales.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Ginrin-Tancho-Kohaku-696x464.jpg' },
  { name: 'Old Style Goshiki', description: 'Koi with a mix of five colors, including red, black, and blue.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Old-Style-Goshiki-696x464.jpg' },
  { name: 'Tancho Goshiki', description: 'Goshiki with a single red spot on the head.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Tancho-Goshiki-696x464.jpg' },
  { name: 'Tancho Showa', description: 'Showa with a red spot on the head.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Tancho-Showa-696x464.jpg' },
  { name: 'Ginrin Goshiki', description: 'Goshiki with metallic scales.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Ginrin-Goshiki-696x464.jpg' },
  { name: 'Doitsu Goshiki', description: 'Scaleless Goshiki.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Doitsu-Goshiki-696x464.jpg' },
  { name: 'New Style Goshiki', description: 'Modern Goshiki with brighter colors.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/New-Style-Goshiki-696x464.jpg' },
  { name: 'Budo Goromo', description: 'Koi with a purple net-like overlay on red markings.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Budo-Goromo-696x464.jpg' },
  { name: 'Shusui', description: 'Scaleless blue koi with red sides.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Shusui-696x464.jpg' },
  { name: 'Asagi', description: 'Blue-gray koi with red belly and fins.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Asagi-696x464.jpg' },
  { name: 'Ai Goromo', description: 'White koi with red markings overlaid with a blue net pattern.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Ai-Goromo-696x464.jpg' },
  { name: 'Kujaku', description: 'Platinum koi with red and black net pattern.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Kujaku-696x464.jpg' },
  { name: 'Doitsu Kujaku', description: 'Scaleless Kujaku with a similar net pattern.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Doitsu-Kujaku-696x464.jpg' },
  { name: 'Heisei Nishikigoi', description: 'Known for diverse patterns, often used for many modern varieties.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Heisei-Nishikigoi-696x464.jpg' },
  { name: 'Kikusui', description: 'Scaleless koi with red and white metallic colors.', image: 'https://cachepkoi.com.vn/wp-content/uploads/2016/05/Kikusui-696x464.png' }
];

const KoiFish = () => {
  const [newKoi, setNewKoi] = useState({
    fish_id: '',
    nameFish: '',
    imageFish: '',
    quantity: 1, // Set default quantity to 1
    physique: '',
    age: '',
    length: '',
    weight: '',
    sex: '',
    variety: '',
    inPondSince: '',
    breeder: '',
    purchasePrice: '',
    status: 'live' // Set default status to live
  });
  const [ponds, setPonds] = useState([]);
  const [selectedPond, setSelectedPond] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [currentPage, setCurrentPage] = useState(1); // State to manage current page
  const itemsPerPage = 5; // Number of items per page
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

    const { age, length, weight, physique, variety, breeder, purchasePrice } = newKoi;

    // Validation checks
    if (age <= 0 || age > 200) {
      toast.error('Age must be between 0 and 200.');
      return;
    }
    if (length <= 0 || length > 300) {
      toast.error('Length must be between 0 and 300 cm.');
      return;
    }
    if (weight <= 0 || weight > 50) {
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
    if (!selectedPond) {
      toast.error('Please select a pond.');
      return;
    }
    if (purchasePrice <= 0) {
      toast.error('Purchase price must be greater than 0.');
      return;
    }

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
        quantity: 1, // Reset quantity to 1
        physique: '',
        age: '',
        length: '',
        weight: '',
        sex: '',
        variety: '',
        inPondSince: '',
        breeder: '',
        purchasePrice: '',
        status: 'live' // Reset status to live
      });
      toast.success('Koi fish added successfully!'); // Show success toast notification
    } catch (error) {
      console.error('Error adding koi fish:', error.response ? error.response.data : error.message);
      toast.error('Failed to add koi fish.'); // Show error toast notification
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = koiVarieties.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="koifish-container">
      <ToastContainer />
      <h2>Koi Fish Management</h2>

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
          <input type="number" name="quantity" placeholder="Quantity (0-1000)" value={newKoi.quantity} onChange={handleInputChange} disabled />
        </label>
        <label>
          <FontAwesomeIcon icon={faRulerVertical} className="icon" /> Physique:
          <input type="text" name="physique" placeholder="Physique" value={newKoi.physique} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" /> Age:
          <input type="number" name="age" placeholder="Age (0-200)" value={newKoi.age} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faRulerVertical} className="icon" /> Length:
          <input type="number" name="length" placeholder="Length (0-300 cm)" value={newKoi.length} onChange={handleInputChange} />
        </label>
        <label>
          <FontAwesomeIcon icon={faWeight} className="icon" /> Weight:
          <input type="number" name="weight" placeholder="Weight (0-50 kg)" value={newKoi.weight} onChange={handleInputChange} />
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
        <button onClick={() => setIsModalOpen(true)}>Show Koi Varieties</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Koi Varieties"
        className="variety-modal"
        overlayClassName="variety-modal-overlay"
      >
        <h2>Koi Fish Varieties</h2>
        <div className="variety-koi-list">
          {currentItems.map((variety, index) => (
            <div key={index} className="variety-koi-item">
              <img src={variety.image} alt={variety.name} className="variety-koi-image" />
              <h3>{variety.name}</h3>
              <p>{variety.description}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array.from({ length: Math.ceil(koiVarieties.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={index + 1 === currentPage ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default KoiFish;


