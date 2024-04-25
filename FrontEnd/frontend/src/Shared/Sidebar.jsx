import React from 'react'
import logo from '../Components/Assets/Logo.png'
import {DASHBOARD_SIDEBAR_LINKS } from '../lib/consts/navigation'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { MdLogout } from "react-icons/md";


const linkClasses = 
'flex items-center gap-2  font-light px-3 py-2 hover:bg-primary--color hover:text-white--color hover:no-underline active:bg-neutral-600  rounded-sm text-base text-primary--color mt-1 rounded-md'

export default function Sidebar() {
  return (
    <div className='flex flex-col bg-backgrond--color w-60 p-3  '>
        <div className='flex justify-center'>
            <img src={logo} alt='logo imagee' className='w-30 h-24 '></img>
        </div>
        <div className='flex-1 py-8'>
            {DASHBOARD_SIDEBAR_LINKS.map((item)=>(
                <SidebarLink key={item.key} item={item}/>
            ))}
        </div>
        <div className={classNames('cursor-pointer',linkClasses)}>
            <span className='text-xl'> <MdLogout/> </span>
            <label className='cursor-pointer'>Đăng xuất</label>
        </div>

    </div>
  )
}


function SidebarLink({item}){
    const {pathname} = useLocation()
    return(
        <Link to={item.path} className={classNames(pathname===item.path ? 'text-white--color bg-primary--color':'',linkClasses)}>
        <span className='text-xl'>{item.icon}</span>
        {item.label}
      </Link>
    )
}