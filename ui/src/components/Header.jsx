import React from 'react';
import { getLoggedInUser, logout } from '../services/auth'; // import the necessary functions
import { Link } from 'react-router-dom';

const Header = () => {
  const user = getLoggedInUser(); // get the logged-in user

  const handleLogout = () => {
    logout(); // call the logout function
    window.location.reload(); // reload to reflect the logout action (or navigate to a different page)
  };

  return (
    <header className="w-full py-4 bg-gray-900 border-b border-gray-700 shadow-md text-white">
    <div className="flex justify-between items-center w-full px-4 sm:px-6">
      <Link to="/" className="text-2xl font-bold">
        Ditto
      </Link>

      {user ? (
        <div className="flex items-center space-x-4">
          <span>Hi {user.first_name || user.email_id || 'User'}</span>
          <span className="text-gray-500">|</span>

          <button
                onClick={handleLogout}
                className="hover:underline hover:text-white transition"
              >
                Logout
              </button>
        </div>
      ) : null}
      </div>
    </header>
  );
};

export default Header;
