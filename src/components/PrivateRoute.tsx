// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Simple route protection: Check for user authentication
const PrivateRoute = () => {
  const isAuthenticated = true; // You can replace this with actual authentication logic

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
