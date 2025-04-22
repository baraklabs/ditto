import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [message, setMessage] = useState('');

  const [isAuthEnabled, setIsAuthEnabled] = useState(true); // You can fetch this from an API or config
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthEnabled) {
      navigate('/mock');
    }
  }, [isAuthEnabled, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    if (username === 'admin' && password === 'admin') {
      navigate('/mock');
    } else {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center p-6 text-white">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to Ditto</h1>
          <p className="text-xl drop-shadow-md max-w-xl mx-auto">
            Build mock APIs, create dynamic responses, and load test AWS SQS, SNS, and REST APIs — all with ease and power.
          </p>
        </div>

        {isAuthEnabled && (
          <form onSubmit={handleLogin} className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4 border border-gray-700">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded font-semibold">
              Login
            </button>
            {message && <p className="text-red-400 text-sm">{message}</p>}
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
