import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ApiPage from './pages/ApiPage';
import Mock from './pages/Mock';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mock />} />
        <Route path="/api" element={<ApiPage />} />
        <Route path="/mock" element={<Mock />} />
      </Routes>
    </Router>
  );
};

export default App;
