import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in
  const user = localStorage.getItem('user');
  
  if (!user) {
    // Not logged in - redirect to signup page
    return <Navigate to="/" replace />;
  }
  
  // Logged in - show the protected page
  return children;
};

export default ProtectedRoute;