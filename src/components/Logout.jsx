/*import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic here, e.g., clearing authentication tokens
    localStorage.removeItem('authToken'); // Example: remove auth token from local storage

    // Redirect to homepage
    navigate('/');
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;*/
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear localStorage and redirect to login
    localStorage.removeItem('userRole');
    localStorage.removeItem('userFullName');
    navigate('/login');
  }, [navigate]);

  return null; // Optionally, show a loading spinner or message
};

export default Logout;
