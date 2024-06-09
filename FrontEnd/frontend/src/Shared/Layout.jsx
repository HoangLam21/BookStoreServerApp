import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar'
import Header from './Header'
import userData from '../Data/userData'
import Orderbar from './Orderbar'
import Login from '../Components/LOGIN/Login'
export default function Layout() {
  const location = useLocation();


  const isLoginPage = location.pathname === '/admin';
  return (
   
   
    <div>
        {isLoginPage ? (
            <Login />
          ) : (
            <div className='flex flex-row h-screen w-screen overflow-hidden'>
          <Sidebar/>
            <div className=' flex flex-col flex-1'>
              <Header user={userData} />
              <div className="flex flex-1 p-4 pt-0 min-h-0 overflow-auto">
                  <div className='flex flex-1'>
                    <Outlet/>
                  </div>
                  <Orderbar/>
					      
				      </div>
            </div>
            
        </div>
        )}
       
    </div>
  )
}
