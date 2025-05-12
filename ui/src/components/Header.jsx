import React from 'react';
import { getLoggedInUser, logout } from '../services/auth';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = getLoggedInUser();
  const enableLogin = import.meta.env.VITE_ENABLE_LOGIN === 'true';

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const renderUserInfo = () => {
    if (!enableLogin) {
      return (
        <>
          <Link
            to="/mock"
            className="hover:underline text-indigo-400"
          >
            Mock
          </Link>
          <span className="text-gray-500">|</span>
          <span>Shared Access</span>
        </>
      );
    }

    if (user) {
      return (
        <>
          {user.role === 'admin' && (
            <>
              <Link
                to="/admin"
                className="hover:underline text-indigo-400"
              >
                Admin
              </Link>
              <span className="text-gray-500">|</span>
            </>
          )}
          <Link
            to="/mock"
            className="hover:underline text-indigo-400"
          >
            Mock
          </Link>
          <span className="text-gray-500">|</span>
          <span>Hi {user.first_name || user.email_id || 'User'}</span>
          <span className="text-gray-500">|</span>
          <button
            onClick={handleLogout}
            className="hover:underline hover:text-white transition"
          >
            Logout
          </button>
        </>
      );
    }

    return null;
  };

  return (
    <header className="w-full py-4 bg-gray-900 border-b border-gray-700 shadow-md text-white">
      <div className="flex justify-between items-center w-full px-4 sm:px-6">
        <Link to="/" className="text-2xl font-bold">
          Ditto
        </Link>

        <div className="flex items-center space-x-4">
          {renderUserInfo()}
        </div>
      </div>
    </header>
  );
};

export default Header;
