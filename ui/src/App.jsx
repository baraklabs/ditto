import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Mock from './pages/Mock';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import { isUserLoggedIn } from './services/auth';

const App = () => {
  const enableLogin = import.meta.env.VITE_ENABLE_LOGIN === 'true';
  const isLoggedIn = isUserLoggedIn();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            enableLogin
              ? (isLoggedIn ? <Navigate to="/mock" replace /> : <Home />)
              : <Navigate to="/mock" replace />
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
      </Routes>
    </Router>
  );
};

export default App;
