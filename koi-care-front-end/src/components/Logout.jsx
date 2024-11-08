// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary

// const Logout = () => {
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   useEffect(() => {
//     const performLogout = () => {
//       // Clear localStorage
//       localStorage.removeItem('authToken');
//       localStorage.removeItem('userRole');
//       localStorage.removeItem('userFullName');
      
//       // Update the authentication state
//       logout();

//       // Redirect to login page
//       navigate('/');

//       // Refresh the page
//       window.location.reload();
//     };

//     performLogout();
//   }, [logout, navigate]);

//   return null; // Optionally, show a loading spinner or message
// };

// export default Logout;
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = () => {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userFullName');
      localStorage.removeItem ('accountId'); 
      // Update the authentication state
      logout();

      // Redirect to login page
      navigate('/');

      // Refresh the page
      window.location.reload();
    };

    performLogout();
  }, [logout, navigate]);

  return null; // Optionally, show a loading spinner or message
};

export default Logout;
