// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CusUserContext = createContext();

export const CusUserProvider = ({ children }) => {
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
    <CusUserContext.Provider value={{fullname,avatar, login2, logout2 }}>
      {children}
    </CusUserContext.Provider>
  );
};


// import React, { createContext, useState } from 'react';

// export const CusUserContext = createContext();

// const CusUserProvider = ({ children }) => {
//   const [customer, setCustomer] = useState(null);

//   const loginCustomer = (username, token) => {
//     setCustomer({ username, token, role: 'customer' });
//     localStorage.setItem('customerUsername', username);
//     localStorage.setItem('customerToken', token);
//   };

//   return (
//     <CusUserContext.Provider value={{ customer, loginCustomer }}>
//       {children}
//     </CusUserContext.Provider>
//   );
// };

// export default CusUserProvider;

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