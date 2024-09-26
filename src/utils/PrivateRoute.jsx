import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

// PrivateRoute Component to protect certain routes
const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');

  // Check if token is available in localStorage
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token to get user information
    const decodedToken = jwtDecode(token);

    // Check token expiration
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token'); // Remove expired token
      return <Navigate to="/login" />; // Redirect to login if token is expired
    }

    // If a specific role is required for the route, verify the user role
    if (requiredRole && decodedToken.role !== requiredRole) {
      return <Navigate to="/unauthorized" />; // Redirect if the user role does not match
    }

    // Render the component if everything is valid
    return children;

  } catch (error) {
    console.error("Invalid token", error);
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
