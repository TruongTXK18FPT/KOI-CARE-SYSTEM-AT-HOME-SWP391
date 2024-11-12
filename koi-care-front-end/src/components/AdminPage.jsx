import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPage.css'; // Ensure this path is correct

const AdminPage = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [showEditMemberForm, setShowEditMemberForm] = useState(false);
  const [newMember, setNewMember] = useState({
    email: '',
    password: '',
    accountImg: '',
    role: 'member',
    fullName: '',
    gender: 'male',
    birthDay: '', // Add birthDay field
    phone: '',
    address: '',
    status: 'active'
  });
  const [selectedMember, setSelectedMember] = useState(null);
  const [error, setError] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

  useEffect(() => {
    // Fetch the list of members from the server
    const token = localStorage.getItem('token'); // Get the token from localStorage
    axios.get('http://localhost:8080/api/admin/users', {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the headers
      }
    })
      .then(response => {
        const filteredData = response.data.data.filter(member => member.role !== 'supervisor');
        setMembers(filteredData);
        setFilteredMembers(filteredData); // Initialize filtered members
      })
      .catch(error => console.error('Error fetching members:', error));
  }, []);

  const handleSearch = () => {
    // Implement search functionality here
    const filteredMembers = members.filter(member => 
      (member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
      member.role !== 'supervisor'
    );
    setFilteredMembers(filteredMembers);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleRoleSearch = (role) => {
    if (role === '') {
      setFilteredMembers(members); // Show all members except supervisors
    } else {
      const filteredMembers = members.filter(member => 
        member.role.toLowerCase() === role.toLowerCase() &&
        member.role !== 'supervisor'
      );
      setFilteredMembers(filteredMembers);
    }
    setCurrentPage(1); // Reset to first page after role search
  };

  const handleAddMember = () => {
    // Implement add member functionality here
    const token = localStorage.getItem('token'); // Get the token from localStorage
    axios.post('http://localhost:8080/api/admin/users/add', newMember, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the headers
      }
    })
      .then(response => {
        setMembers([...members, response.data.data]);
        setFilteredMembers([...members, response.data.data]); // Update filtered members as well
        setShowAddMemberForm(false); // Hide the form after adding a member
        setError(''); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error adding member:', error);
        setError('Failed to add member. Please check the input fields.');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleEditMember = (member) => {
    // Format the birthDay to "yyyy-MM-dd"
    if (member.birthDay) {
      member.birthDay = new Date(member.birthDay).toISOString().split('T')[0];
    }
    setSelectedMember(member);
    setShowEditMemberForm(true);
  };

  const handleUpdateMember = () => {
    console.log('Updating member with ID:', selectedMember?.accountId); // Debugging statement
    if (!selectedMember || !selectedMember.accountId) {
      console.error('Invalid member ID for update');
      return;
    }
    const token = localStorage.getItem('token'); // Get the token from localStorage
    axios.put(`http://localhost:8080/api/admin/users/update/${selectedMember.accountId}`, selectedMember, {
      headers: {
        Authorization: `Bearer ${token}` // Include the token in the headers
      }
    })
      .then(response => {
        setMembers(members.map(member => member.accountId === selectedMember.accountId ? response.data.data : member));
        setFilteredMembers(filteredMembers.map(member => member.accountId === selectedMember.accountId ? response.data.data : member));
        setShowEditMemberForm(false); // Hide the form after updating a member
        setError(''); // Clear any previous errors
      })
      .catch(error => {
        console.error('Error updating member:', error);
        setError('Failed to update member. Please check the input fields.');
      });
  };

  // Pagination logic
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin-page-container">
      <h2>Admin Page</h2>
      <div className="admin-actions">
        <input
          type="text"
          placeholder="Search members"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="btn btn-search" onClick={handleSearch}>Search</button>
        <select
          className="role-select"
          value={selectedRole}
          onChange={(e) => {
            setSelectedRole(e.target.value);
            handleRoleSearch(e.target.value);
          }}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="member">Member</option>
          <option value="manager">Manager</option>
        </select>
        <button className="btn btn-add" onClick={() => setShowAddMemberForm(true)}>Add Member</button>
      </div>
      <div className="member-list">
        <table className="member-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Birth Date</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
              <th>Account Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map(member => (
              <tr key={member.accountId}>
                <td>{member.email}</td>
                <td>{member.fullName}</td>
                <td>{member.role}</td>
                <td>{member.gender}</td>
                <td>{member.birthDay}</td>
                <td>{member.phone}</td>
                <td>{member.address}</td>
                <td>{member.status}</td>
                <td><img src={member.accountImg} alt="Account" className="account-img" /></td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEditMember(member)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredMembers.length / membersPerPage) }, (_, index) => (
            <button key={index + 1} onClick={() => paginate(index + 1)} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {showAddMemberForm && (
        <div className="add-member-form">
          <h3>Add New Member</h3>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newMember.email}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newMember.password}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="accountImg"
            placeholder="Account Image URL"
            value={newMember.accountImg}
            onChange={handleInputChange}
            className="form-input"
          />
          <select name="role" value={newMember.role} onChange={handleInputChange} className="form-input role-select">
            <option value="admin">Admin</option>
            <option value="member">Member</option>
            <option value="manager">Manager</option>
          </select>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={newMember.fullName}
            onChange={handleInputChange}
            className="form-input"
          />
          <select name="gender" value={newMember.gender} onChange={handleInputChange} className="form-input">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="date"
            name="birthDay"
            placeholder="Birth Day"
            value={newMember.birthDay}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newMember.phone}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newMember.address}
            onChange={handleInputChange}
            className="form-input"
          />
          <select name="status" value={newMember.status} onChange={handleInputChange} className="form-input">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="form-buttons">
            <button className="btn btn-save" onClick={handleAddMember}>Add Member</button>
            <button className="btn btn-cancel" onClick={() => setShowAddMemberForm(false)}>Cancel</button>
          </div>
        </div>
      )}
      {showEditMemberForm && selectedMember && (
        <div className="edit-member-form">
          <h3>Edit Member</h3>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={selectedMember.email}
            onChange={(e) => setSelectedMember({ ...selectedMember, email: e.target.value })}
            className="form-input"
            disabled
          />
          <input
            type="text"
            name="accountImg"
            placeholder="Account Image URL"
            value={selectedMember.accountImg}
            onChange={(e) => setSelectedMember({ ...selectedMember, accountImg: e.target.value })}
            className="form-input"
          />
          <select name="role" value={selectedMember.role} onChange={(e) => setSelectedMember({ ...selectedMember, role: e.target.value })} className="form-input role-select">
            <option value="admin">Admin</option>
            <option value="member">Member</option>
            <option value="manager">Manager</option>
          </select>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={selectedMember.fullName}
            onChange={(e) => setSelectedMember({ ...selectedMember, fullName: e.target.value })}
            className="form-input"
          />
          <select name="gender" value={selectedMember.gender} onChange={(e) => setSelectedMember({ ...selectedMember, gender: e.target.value })} className="form-input">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input
            type="date"
            name="birthDay"
            placeholder="Birth Day"
            value={selectedMember.birthDay || ''}
            onChange={(e) => setSelectedMember({ ...selectedMember, birthDay: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={selectedMember.phone}
            onChange={(e) => setSelectedMember({ ...selectedMember, phone: e.target.value })}
            className="form-input"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={selectedMember.address}
            onChange={(e) => setSelectedMember({ ...selectedMember, address: e.target.value })}
            className="form-input"
          />
          <select name="status" value={selectedMember.status} onChange={(e) => setSelectedMember({ ...selectedMember, status: e.target.value })} className="form-input">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div className="form-buttons">
            <button className="btn btn-save" onClick={handleUpdateMember}>Update Member</button>
            <button className="btn btn-cancel" onClick={() => setShowEditMemberForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;