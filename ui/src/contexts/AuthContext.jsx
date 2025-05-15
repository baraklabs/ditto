import React, { createContext, useState, useEffect, useContext } from 'react';
import { isUserLoggedIn, getUsersProfile, getLoggedInUser } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getLoggedInUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const tokenExists = isUserLoggedIn();
      if (tokenExists && !user) {
        try {
          const profile = await getUsersProfile();
          if (profile?.success === false) {
            logout();
            setUser(null);
          } else {
            setUser(profile);
          }
        } catch (err) {
          logout();
          setUser(null);
        }

      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
