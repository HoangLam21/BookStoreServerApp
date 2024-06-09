import React, { createContext, useState, useEffect } from 'react';

export const MyInfoContext = createContext();

export const MyInfoProvider = ({ children }) => {
  const [fullname, setFullname] = useState(null);
  const [avatar, setAvatar] = useState(null);


  useEffect(() => {
    const storedToken = localStorage.getItem('fullname');
    if (storedToken) {
      setFullname(storedToken);
    }
  }, []);
  useEffect(() => {
    const storedToken = localStorage.getItem('avatar');
    if (storedToken) {
      setAvatar(storedToken);
    }
  }, []);


  const login2 = (newFullName, newAvatar) => {
    setFullname(newFullName);
    setAvatar(newAvatar)
    
    localStorage.setItem('fullname', newFullName);
    localStorage.setItem('avatar', newAvatar)
  };

  const logout2 = () => {
    setFullname(null);
    setAvatar(null)
   
    localStorage.removeItem('fullname');
    localStorage.removeItem('avatar');


  };

  return (
    <MyInfoContext.Provider value={{fullname,avatar, login2, logout2 }}>
      {children}
    </MyInfoContext.Provider>
  );
};