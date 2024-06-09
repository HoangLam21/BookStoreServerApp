// import React from "react";

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

import React from 'react';

const UserContext = React.createContext({ username: '', auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ username: '', auth: false });

  const loginContext = (username, token) => {
    setUser({
      username: username,
      auth: true,
    });
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    console.log(token);
  };

  const logout = () => {
    setUser({
      username: '',
      auth: false,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };