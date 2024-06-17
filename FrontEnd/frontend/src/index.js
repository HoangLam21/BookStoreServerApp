// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { UserProvider } from './Components/context/UserContext';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import { UserProvider } from './Components/context/UserContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <BrowserRouter>
//       <UserProvider>

//       <App />
//       </UserProvider>

//     </BrowserRouter>
// );

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { AuthProvider } from './Components/context/AuthContext';
// import { CartProvider } from './Components/context/Context';
// import { BookProvider } from './Components/context/BookContext';
// import { OrderProvider } from './Components/context/OrderContext';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { CategoryProvider } from './Components/context/CategoryContext';
// import { UserProvider } from './Components/context/UserContext';
// import { CusUserProvider } from './Components/context/CusUserContext';

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './Components/context/AuthContext';
import { CartProvider } from './Components/context/Context';
import { BookProvider } from './Components/context/BookContext';
import { OrderProvider } from './Components/context/OrderContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CategoryProvider } from './Components/context/CategoryContext';
import { UserProvider } from './Components/context/UserContext';
import {CusUserProvider} from './Components/context/CusUserContext';
import { MyInfoProvider } from './Components/context/MyInfoContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <UserProvider>
    <CusUserProvider>
    <MyInfoProvider>
      <CategoryProvider>
        <BookProvider>
          <CartProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </CartProvider>
        </BookProvider>
      </CategoryProvider>
      </MyInfoProvider>
    </CusUserProvider>
  </UserProvider>
</AuthProvider>
);


