import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ApiPage = () => {
  const [message, setMessage] = useState('');

  const handleApiRequest = async (e) => {
    e.preventDefault();
    // Call API logic here
    setMessage('API request sent successfully!');
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h2 className="text-3xl font-bold text-center mb-6">API Page</h2>
        <form onSubmit={handleApiRequest} className="grid gap-4 max-w-md mx-auto">
          <input
            type="text"
            name="apiInput"
            className="p-2 rounded bg-gray-700 text-white"
            placeholder="Enter API details"
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300">
            Send API Request
          </button>
        </form>
        {message && (
          <div className="mt-4 text-center text-green-600">{message}</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ApiPage;
