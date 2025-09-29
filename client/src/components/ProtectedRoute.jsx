// client/src/components/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

//......................... Show a loading indicator while we check for the user..............................
  if (loading) {
    return <div>Loading...</div>;
  }
  
//.......................... If loading is done and there's no user, redirect to homepage.....................
  if (!user) {
    return <Navigate to="/" replace />;
  }

  //......................... If there is a user, show the content (the Dashboard Frame)........................
  return <Outlet />;
};

export default ProtectedRoute;