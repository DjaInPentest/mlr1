import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const u = JSON.parse(stored);
      axios.defaults.headers.common.Authorization = u.username;
      setCurrentUser(u);
    }
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    axios.defaults.headers.common.Authorization = user.username;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    delete axios.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
