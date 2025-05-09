import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserLoggedIn, getLoggedInUser } from '../services/auth';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const isLoggedIn = isUserLoggedIn();
  const user = getLoggedInUser();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
