// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    const storedId = localStorage.getItem('id');
    const storedUsername =localStorage.getItem('username')

    if (storedToken && tokenTimestamp && storedId && storedUsername) {
      const currentTime = Date.now();
      const tokenTime = parseInt(tokenTimestamp, 10);
      const threeHoursInMilliseconds = 3 * 60 * 60 * 1000;

      if (currentTime - tokenTime < threeHoursInMilliseconds) {
        setToken(storedToken);
        setId(storedId);
        setUsername(storedUsername);
      } else {
        // Token expired
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
        localStorage.removeItem('id');
        localStorage.removeItem('username');
      }
    }
  }, []);

  const login = (newToken, newId, newUsername) => {
    const timestamp = Date.now();
    setToken(newToken);
    setId(newId);
    setUsername(newUsername)
    localStorage.setItem('token', newToken);
    localStorage.setItem('tokenTimestamp', timestamp.toString());
    localStorage.setItem('id', newId);
    localStorage.setItem('username',newUsername);
  };

  

  const logout = () => {
    setToken(null);
    setId(null);
    setUsername(null)
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ token, id,username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
