import React, { useState } from 'react';
import '../styles/Pond.css'; // Import the CSS file for styling

const Pond = () => {
  const [ponds, setPonds] = useState([]);
  const [newPond, setNewPond] = useState({
    id: '',
    name: '',
    volume: '',
    drainCount: '',
    depth: '',
    skimmerCount: '',
    pumpingCapacity: '',
    image: '',
    totalKoi: 0
  });

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

  const [selectedKoi, setSelectedKoi] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPond({ ...newPond, [name]: value });
  };

  const handleKoiInputChange = (e) => {
    const { name, value } = e.target;
    setNewKoi({ ...newKoi, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPond({ ...newPond, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKoiImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewKoi({ ...newKoi, imageFish: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPond = () => {
    setPonds([...ponds, { ...newPond, id: Date.now().toString() }]);
    setNewPond({
      id: '',
      name: '',
      volume: '',
      drainCount: '',
      depth: '',
      skimmerCount: '',
      pumpingCapacity: '',
      image: '',
      totalKoi: 0
    });
  };

  const handleAddKoi = (pondId) => {
    const quantity = parseInt(newKoi.quantity, 10);
    setPonds(ponds.map(pond => 
      pond.id === pondId ? { 
        ...pond, 
        koiFish: [...(pond.koiFish || []), { ...newKoi, fish_id: Date.now().toString() }],
        totalKoi: pond.totalKoi + quantity
      } : pond
    ));
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
  };

  const handleDeleteKoi = (pondId, fish_id, quantity) => {
    setPonds(ponds.map(pond => 
      pond.id === pondId ? { 
        ...pond, 
        koiFish: pond.koiFish.filter(koi => koi.fish_id !== fish_id),
        totalKoi: pond.totalKoi - quantity
      } : pond
    ));
  };

  const handleUpdateKoi = (pondId, updatedKoi) => {
    setPonds(ponds.map(pond => 
      pond.id === pondId ? { 
        ...pond, 
        koiFish: pond.koiFish.map(koi => koi.fish_id === updatedKoi.fish_id ? updatedKoi : koi) 
      } : pond
    ));
    setIsEditing(false);
    setSelectedKoi(null);
  };

  const handleViewDetails = (koi) => {
    setSelectedKoi(koi);
  };

  const handleEditKoi = (koi) => {
    setSelectedKoi(koi);
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setSelectedKoi(null);
    setIsEditing(false);
  };

  return (
    <div className="pond-container">
      <h2>Pond Management</h2>
      <div className="add-pond-form">
        <h3>Add New Pond</h3>
        <input type="text" name="name" placeholder="Pond Name" value={newPond.name} onChange={handleInputChange} />
        <input type="text" name="volume" placeholder="Volume" value={newPond.volume} onChange={handleInputChange} />
        <input type="text" name="drainCount" placeholder="Drain Count" value={newPond.drainCount} onChange={handleInputChange} />
        <input type="text" name="depth" placeholder="Depth" value={newPond.depth} onChange={handleInputChange} />
        <input type="text" name="skimmerCount" placeholder="Skimmer Count" value={newPond.skimmerCount} onChange={handleInputChange} />
        <input type="text" name="pumpingCapacity" placeholder="Pumping Capacity" value={newPond.pumpingCapacity} onChange={handleInputChange} />
        <input type="file" name="image" onChange={handleImageChange} />
        <button onClick={handleAddPond}>Add Pond</button>
      </div>
      <div className="pond-list">
        {ponds.map(pond => (
          <div key={pond.id} className="pond">
            <h3>{pond.name}</h3>
            <p>Volume: {pond.volume}</p>
            <p>Drain Count: {pond.drainCount}</p>
            <p>Depth: {pond.depth}</p>
            <p>Skimmer Count: {pond.skimmerCount}</p>
            <p>Pumping Capacity: {pond.pumpingCapacity}</p>
            <p>Total Koi Fish: {pond.totalKoi}</p>
            {pond.image && <img src={pond.image} alt={pond.name} />}
            <div className="koi-management">
              <h4>Koi Fish</h4>
              <div className="add-koi-form">
                <input type="text" name="nameFish" placeholder="Koi Name" value={newKoi.nameFish} onChange={handleKoiInputChange} />
                <input type="file" name="imageFish" onChange={handleKoiImageChange} />
                <input type="number" name="quantity" placeholder="Quantity" value={newKoi.quantity} onChange={handleKoiInputChange} />
                <input type="text" name="physique" placeholder="Physique" value={newKoi.physique} onChange={handleKoiInputChange} />
                <input type="number" name="age" placeholder="Age" value={newKoi.age} onChange={handleKoiInputChange} />
                <input type="number" name="length" placeholder="Length" value={newKoi.length} onChange={handleKoiInputChange} />
                <input type="number" name="weight" placeholder="Weight" value={newKoi.weight} onChange={handleKoiInputChange} />
                <select name="sex" value={newKoi.sex} onChange={handleKoiInputChange}>
                  <option value="">Select Sex</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                <input type="text" name="variety" placeholder="Variety" value={newKoi.variety} onChange={handleKoiInputChange} />
                <input type="date" name="inPondSince" placeholder="In Pond Since" value={newKoi.inPondSince} onChange={handleKoiInputChange} />
                <input type="text" name="breeder" placeholder="Breeder" value={newKoi.breeder} onChange={handleKoiInputChange} />
                <input type="number" name="purchasePrice" placeholder="Purchase Price" value={newKoi.purchasePrice} onChange={handleKoiInputChange} />
                <button onClick={() => handleAddKoi(pond.id)}>Add Koi</button>
              </div>
              <ul>
                {pond.koiFish && pond.koiFish.map(koi => (
                  <li key={koi.fish_id}>
                    <p>Name: {koi.nameFish}</p>
                    {koi.imageFish && <img src={koi.imageFish} alt={koi.nameFish} />}
                    <p>Size: {koi.length} cm</p>
                    <p>Age: {koi.age} years</p>
                    <p>Quantity: {koi.quantity}</p>
                    <button onClick={() => handleViewDetails(koi)}>View Details</button>
                    <button onClick={() => handleEditKoi(koi)}>Update</button>
                    <button onClick={() => handleDeleteKoi(pond.id, koi.fish_id, koi.quantity)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      {selectedKoi && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            {isEditing ? (
              <div className="edit-koi-form">
                <h3>Update Koi Fish</h3>
                <input type="text" name="nameFish" placeholder="Koi Name" value={selectedKoi.nameFish} onChange={(e) => setSelectedKoi({ ...selectedKoi, nameFish: e.target.value })} />
                <input type="file" name="imageFish" onChange={(e) => handleKoiImageChange(e)} />
                <input type="number" name="quantity" placeholder="Quantity" value={selectedKoi.quantity} onChange={(e) => setSelectedKoi({ ...selectedKoi, quantity: e.target.value })} />
                <input type="text" name="physique" placeholder="Physique" value={selectedKoi.physique} onChange={(e) => setSelectedKoi({ ...selectedKoi, physique: e.target.value })} />
                <input type="number" name="age" placeholder="Age" value={selectedKoi.age} onChange={(e) => setSelectedKoi({ ...selectedKoi, age: e.target.value })} />
                <input type="number" name="length" placeholder="Length" value={selectedKoi.length} onChange={(e) => setSelectedKoi({ ...selectedKoi, length: e.target.value })} />
                <input type="number" name="weight" placeholder="Weight" value={selectedKoi.weight} onChange={(e) => setSelectedKoi({ ...selectedKoi, weight: e.target.value })} />
                <select name="sex" value={selectedKoi.sex} onChange={(e) => setSelectedKoi({ ...selectedKoi, sex: e.target.value })}>
                  <option value="">Select Sex</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
                <input type="text" name="variety" placeholder="Variety" value={selectedKoi.variety} onChange={(e) => setSelectedKoi({ ...selectedKoi, variety: e.target.value })} />
                <input type="date" name="inPondSince" placeholder="In Pond Since" value={selectedKoi.inPondSince} onChange={(e) => setSelectedKoi({ ...selectedKoi, inPondSince: e.target.value })} />
                <input type="text" name="breeder" placeholder="Breeder" value={selectedKoi.breeder} onChange={(e) => setSelectedKoi({ ...selectedKoi, breeder: e.target.value })} />
                <input type="number" name="purchasePrice" placeholder="Purchase Price" value={selectedKoi.purchasePrice} onChange={(e) => setSelectedKoi({ ...selectedKoi, purchasePrice: e.target.value })} />
                <button onClick={() => handleUpdateKoi(selectedKoi.pondId, selectedKoi)}>Save Changes</button>
              </div>
            ) : (
              <div>
                <h3>Koi Fish Details</h3>
                <p>Name: {selectedKoi.nameFish}</p>
                {selectedKoi.imageFish && <img src={selectedKoi.imageFish} alt={selectedKoi.nameFish} />}
                <p>Quantity: {selectedKoi.quantity}</p>
                <p>Physique: {selectedKoi.physique}</p>
                <p>Age: {selectedKoi.age}</p>
                <p>Length: {selectedKoi.length} cm</p>
                <p>Weight: {selectedKoi.weight} kg</p>
                <p>Sex: {selectedKoi.sex}</p>
                <p>Variety: {selectedKoi.variety}</p>
                <p>In Pond Since: {selectedKoi.inPondSince}</p>
                <p>Breeder: {selectedKoi.breeder}</p>
                <p>Purchase Price: ${selectedKoi.purchasePrice}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pond;