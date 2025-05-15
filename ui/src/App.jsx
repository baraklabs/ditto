import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Mock from './pages/Mock';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const enableLogin = import.meta.env.VITE_ENABLE_LOGIN == 'true';
  const { user, loading } = useAuth();

 

  if (loading) return <div>Loading...</div>; // You could show a spinner here

  return (
    <Routes>
      <Route
        path="/"
        element={
          user ? <Navigate to="/mock" replace /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/mock"
        element={
          enableLogin ? (
            <ProtectedRoute>
              <Mock />
            </ProtectedRoute>
          ) : (
            <Mock />
          )
        }
      />
      <Route
        path="/admin"
        element={
          enableLogin ? (
            <ProtectedRoute requireAdmin>
              <Admin />
            </ProtectedRoute>
          ) : (
            <Navigate to="/mock" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          enableLogin
            ? (user ? <Navigate to="/mock" replace /> : <Login />)
            : <Navigate to="/mock" replace />
        }
      />
    </Routes>
  );
};

export default App;
