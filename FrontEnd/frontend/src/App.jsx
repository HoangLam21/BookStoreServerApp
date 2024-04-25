import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Layout from './Shared/Layout';
import Dashboard from './Components/Dashboard';
import Staff from './Components/Staff'
import Book from './Components/Book';
import Customer from './Components/Customer';
import Order from './Components/Order';
import Stock from './Components/Stock';
import Revenue from './Components/Revenue';
import Celander from './Components/Celander';
import Setting from './Components/Setting';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path="Book" element={<Book/>}/>
          <Route path="Staff" element={<Staff/>}/>
          <Route path="Customer" element={<Customer/>}/>
          <Route path="Order" element={<Order/>}/>
          <Route path="Stock" element={<Order/>}/>

          <Route path="Revenue" element={<Revenue/>}/>
          <Route path="Celander" element={<Celander/>}/>
          <Route path="Setting" element={<Setting/>}/>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
