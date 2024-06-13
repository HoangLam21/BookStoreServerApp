import React, { createContext, useState, useEffect } from 'react';

export const MyInfoContext = createContext();

export const MyInfoProvider = ({ children }) => {
  const [fullname, setFullname] = useState(null);
  const [id, setId] = useState(null);
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


  const login2 = (newFullName, newAvatar, newId) => {
    setFullname(newFullName);
    setAvatar(newAvatar)
    setId(newId)
    
    localStorage.setItem('fullname', newFullName);
    localStorage.setItem('avatar', newAvatar)
    localStorage.setItem('id', newId)
  };

  const logout2 = () => {
    setFullname(null);
    setAvatar(null)
   
    localStorage.removeItem('fullname');
    localStorage.removeItem('avatar');
    localStorage.setItem('id')


  };

  return (
    <MyInfoContext.Provider value={{fullname,avatar,id, login2, logout2 }}>
      {children}
    </MyInfoContext.Provider>
  );
};