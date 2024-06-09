import React, { Fragment,useContext } from 'react';
import { Transition, Menu } from '@headlessui/react';
import { useLocation } from 'react-router-dom';
import {DASHBOARD_SIDEBAR_LINKS } from '../lib/consts/navigation';
import {MyInfoContext} from '../Components/context/MyInfoContext'



export default function Header({ user  }) {
  const {fullname,avatar} = useContext(MyInfoContext)

  const location = useLocation();
  const currentPage = DASHBOARD_SIDEBAR_LINKS.find(
    (link) => link.path === location.pathname
  );
  
  const pageTitle = currentPage ? currentPage.label :  location.pathname.substring(1);


  
  return (
    <div className='h-16 pl-4  flex justify-between items-center'>
      <h2 className='font-medium text-lg text-primary--color border-b border-border--lightcolor w-9/12'>{pageTitle} </h2>
      <div className='flex items-center gap-4 lg:w-80  '>
              <span className='whitespace-nowrap text-base text-header--lightcolor'>Xin Chào, {fullname}</span>
              <div className="h-10 w-1/3 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center flex">
                <img
                  src={avatar ?  `data:image/jpeg;base64,${avatar}` : 'https://via.placeholder.com/150'}
                  alt="avatar"
                  className="rounded-xl"
                />
              </div>
      </div>
    </div>
  );
}
