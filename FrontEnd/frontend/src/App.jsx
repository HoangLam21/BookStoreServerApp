import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import Layout from './Shared/Layout';
import AdminLayout from './Shared/AdminLayout'; // Create this component for admin layout if needed
import CustomerLayout from './Components/shared/layout'; // Create this component for customer layout if needed
import Dashboard from './Components/DASHBOARD/Dashboard';
import Staff from './Components/STAFF/Staff';
import Book from './Components/BOOK/Book';
import Customer from './Components/CUSTOMER/Customer';
import Order from './Components/ORDER/Order';
import Stock from './Components/STOCK/Stock';
import Revenue from './Components/REVENUE/Revenue';
import Celander from './Components/CELANDER/Celander';
import Chatting from './Components/CHATTING/Chatting';
import Setting from './Components/SETTING/Setting';
import StockDetail from './Components/STOCK/StockDetail';
import CustomerDetail from './Components/CUSTOMER/CustomerDetail';
import OrderDetail from './Components/ORDER/OrderDetail';
import Login from './Components/LOGIN/Login'
import StaffDetail from './Components/STAFF/StaffDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Components/CustomerFrontEnd/Home/home';
import AboutUs from './Components/CustomerFrontEnd/AboutUs/aboutUs';
import Books from './Components/CustomerFrontEnd/Books/books';
import Contact from './Components/CustomerFrontEnd/Contact/contact';
import CustomerCare from './Components/CustomerFrontEnd/CustomerCare/customerCare';
import DetailBook from './Components/CustomerFrontEnd/DetailBook/detailBook';
import Discount from './Components/CustomerFrontEnd/Discount/discount';
import OrderCus from './Components/CustomerFrontEnd/Order/order';
import Recruitment from './Components/CustomerFrontEnd/Recruitment/recruitment';
import Account from './Components/CustomerFrontEnd/Account/account';
import Cart from './Components/CustomerFrontEnd/Cart/cart';
import DetailInfoBook from './Components/CustomerFrontEnd/DetailBook/detailInfoBook';
import OrderCusDetail from './Components/CustomerFrontEnd/Account/orderDetail';
import OrderBuyNow from './Components/CustomerFrontEnd/Order/orderBuyNow';
import BookWithCategory from './Components/CustomerFrontEnd/BookWithCategory/bookWithCategory';


import ProtectedRoute from './Shared/ProtectedRoute '; 
import { UserContext } from './Components/context/UserContext';
import OrderDetailCus from './Components/CustomerFrontEnd/Account/orderDetail';
import LoginCus from './Components/CustomerFrontEnd/Account/login';

import AdminBookDetail from './Components/BOOK/AdminBookDetail';

function App() {
  const {user, loginContext} = useContext(UserContext);

  console.log("=>>> user: ", user)
  useEffect(() => {
    if (localStorage.getItem("token")){
      loginContext(localStorage.getItem("username"), localStorage.getItem("token"));
    }
  }, [])


  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          {/* Routes for admin */}

          {/* Routes for customer */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<Home />} />
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="books" element={<Books />} />
            <Route path="contact" element={<Contact />} />
            <Route path="customerCare" element={<CustomerCare />} />
            <Route path="detailBook" element={<DetailBook />} />
            <Route path="discount" element={<Discount />} />
            <Route path="orderCus" element={<OrderCus />} />
            <Route path="orderBuyNow" element={<OrderBuyNow />} />
            <Route path="recruitment" element={<Recruitment />} />
            <Route path="account" element={<Account />} />
            <Route path="cart" element={<Cart />} />
            <Route path="detailInfoBook" element={<DetailInfoBook />} />
            <Route path="orderDetailCus" element={<OrderDetailCus />} />
            <Route path="bookWithCategory" element={<BookWithCategory />} />
            <Route path="login" element={<LoginCus/>}/>

          </Route>


          <Route path="/manage/" element={<Layout />}>
            <Route index element={<Login />}/>
            <Route path="Book" element={<Book/>}/>
            <Route path="Dashboard" element={<Dashboard/>}/>
            <Route path="Staff" element={<Staff/>}/>
            <Route path="Customer" element={<Customer/>}/>
            <Route path="Stock" element={<Stock/>}/>
            <Route path="Order" element={<Order/>}/>
            <Route path="Revenue" element={<Revenue/>}/>
            <Route path="Celander" element={<Celander/>}/>
            <Route path="Chatting" element={<Chatting/>}/>
            <Route path="Setting" element={<Setting/>}/>
            <Route path="/manage/DonHang/:id" element={<StockDetail />} />
            <Route path="/manage/KhachHang/:id" element={<CustomerDetail />} />
            <Route path="/manage/HoaDon/:id" element={<OrderDetail />} />
            <Route path="/manage/NhanVien/:id" element={<StaffDetail />} />
            <Route path="/manage/detailBook/:id" element={<AdminBookDetail />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}


export default App;
