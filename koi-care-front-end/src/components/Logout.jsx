import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust the path as necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = () => {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userFullName');
      localStorage.removeItem('accountId'); 
      // Update the authentication state
      logout();

      // Show success toast notification
      toast.success('Logout successful!');

      // Redirect to login page after a short delay to allow the toast to be visible
      setTimeout(() => {
        navigate('/');
        // Refresh the page
        window.location.reload();
      }, 2000); // Adjust the delay as necessary
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <>
      <ToastContainer />
      {/* Optionally, show a loading spinner or message */}
    </>
  );
};

export default Logout;
