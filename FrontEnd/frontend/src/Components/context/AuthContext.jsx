// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [id, setId]=useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const storedId = localStorage.getItem('id');
    if (storedId) {
      setId(storedId);
    }
  }, []);

  const login = (newToken, newId) => {
    setToken(newToken);
    setId(newId)
    localStorage.setItem('token', newToken);
    localStorage.setItem('id',newId)
  };

  const logout = () => {
    setToken(null);
    setId(null)
    localStorage.removeItem('token');
    localStorage.removeItem('id')

  };

  return (
    <AuthContext.Provider value={{ token, id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



// const UserContext = React.createContext({username:'', auth: false});
// // @function  UserProvider

// // Create function to provide UserContext
// const UserProvider = ({ children }) => {
//   const [user, setUser] = React.useState({ username: '', auth: false });

//   const loginContext = (username, token) => {
//     setUser((user) => ({
//       username: username,
//       auth: true,

//     }));
//     console.log(token);
   
//   };


//   const logout = () => {
    
//     setUser((user) => ({
//       userusername: '',
//       auth: false,
//     }));
//   };

//   return (
//     <UserContext.Provider value={{ user, loginContext, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export {UserContext, UserProvider}