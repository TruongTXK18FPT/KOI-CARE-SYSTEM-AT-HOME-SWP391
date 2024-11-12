import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to check role authorization
  const checkRoleAuthorization = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const currentPath = location.pathname.toLowerCase();

    // First check: If no token, user is not authenticated
    if (!token || !userRole) {
      console.log("No token or role found");
      return false;
    }

    // Second check: Path-specific role requirements
    if (currentPath.includes('/admin')) {
      console.log("Checking admin path access");
      return ['admin', 'supervisor'].includes(userRole);
    }

    if (currentPath.includes('/manager')) {
      console.log("Checking manager path access");
      return userRole === 'manager';
    }

    // Third check: General allowed roles check
    if (allowedRoles.length > 0) {
      console.log("Checking allowed roles:", allowedRoles);
      return allowedRoles.includes(userRole);
    }

    // If no specific roles required and not a protected path, allow access
    return true;
  };

  useEffect(() => {
    const performAuthCheck = () => {
      try {
        const isAuthorized = checkRoleAuthorization();
        console.log("Authorization result:", isAuthorized);
        setIsAuthorized(isAuthorized);
      } catch (error) {
        console.error("Authorization check failed:", error);
        setIsAuthorized(false);
      } finally {
        setIsLoading(false);
      }
    };

    performAuthCheck();
  }, [location.pathname, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    // If no token, redirect to login
    if (!localStorage.getItem('token')) {
      console.log("Redirecting to login");
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    // If has token but unauthorized, redirect to 403 forbidden
    console.log("Redirecting to forbidden");
    return <Navigate to="/forbidden" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;