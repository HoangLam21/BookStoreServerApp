import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import userData from '../Data/userData'
import Orderbar from './Orderbar'
export default function Layout() {
  return (
    <div>
        <div className='flex flex-row h-screen w-screen overflow-hidden'>
          <Sidebar/>
            <div className=' flex flex-col flex-1'>
              <Header user={userData} />
              <div className="flex flex-1 p-4 min-h-0 overflow-auto">
                  <div className='flex flex-1 bg-primary--color'>
                    <Outlet/>
                    hiiii
                  </div>
                  <Orderbar/>
					      
				      </div>
            </div>
            
        </div>
    </div>
  )
}
