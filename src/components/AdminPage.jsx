import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPage.css'; // Ensure this path is correct

const AdminPage = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMember, setNewMember] = useState({ email: '', fullName: '', role: '' });

  useEffect(() => {
    // Fetch the list of members from the server
    axios.get('/api/members')
      .then(response => setMembers(response.data))
      .catch(error => console.error('Error fetching members:', error));
  }, []);

  const handleSearch = () => {
    // Implement search functionality here
    axios.get(`/api/members?search=${searchTerm}`)
      .then(response => setMembers(response.data))
      .catch(error => console.error('Error searching members:', error));
  };

  const handleAddMember = () => {
    // Implement add member functionality here
    axios.post('/api/members', newMember)
      .then(response => setMembers([...members, response.data]))
      .catch(error => console.error('Error adding member:', error));
  };

  const handleDeactivate = (id) => {
    // Implement deactivate member functionality here
    axios.patch(`/api/members/${id}/deactivate`)
      .then(() => setMembers(members.map(member => member.id === id ? { ...member, active: false } : member)))
      .catch(error => console.error('Error deactivating member:', error));
  };

  return (
    <div className="admin-page-container">
      <h2>Admin Page</h2>
      <div className="admin-actions">
        <input
          type="text"
          placeholder="Search members"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-search" onClick={handleSearch}>Search</button>
        <button className="btn btn-add" onClick={() => setNewMember({ email: '', fullName: '', role: '' })}>Add Member</button>
      </div>
      <div className="member-list">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>{member.email}</td>
                <td>{member.fullName}</td>
                <td>{member.role}</td>
                <td>{member.active ? 'Active' : 'Inactive'}</td>
                <td>
                  <button className="btn btn-deactivate" onClick={() => handleDeactivate(member.id)}>Deactivate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {newMember && (
        <div className="add-member-form">
          <h3>Add New Member</h3>
          <input
            type="email"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Full Name"
            value={newMember.fullName}
            onChange={(e) => setNewMember({ ...newMember, fullName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
          />
          <button className="btn btn-save" onClick={handleAddMember}>Add Member</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;