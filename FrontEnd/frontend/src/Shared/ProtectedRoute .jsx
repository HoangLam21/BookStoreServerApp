// // ProtectedRoute.js
// import React, { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { UserContext } from '../Components/context/UserContext'; 
// import {CusUserContext} from '../Components/context/CusUserContext'

// const ProtectedRoute = ({ allowedRoles }) => {

//   const { admin } = useContext(UserContext);
//   const { customer } = useContext(CusUserContext);
//   const user = admin || customer;

//   if (!user) {
//     return <Navigate to="/admin/Login" />;
//   }

 
//   //return <Outlet />;
// };

// export default ProtectedRoute;