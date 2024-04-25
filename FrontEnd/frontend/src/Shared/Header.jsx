import React, { Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';

export default function Header({ user }) {
  return (
    <div className='h-16 px-4 flex justify-between items-center'>
      <h2 className='font-medium text-lg text-primary--color border-b w-9/12'>Doanh Thu</h2>
      <div className='flex items-center gap-2 mr-2'>
        <Menu as="div" className="relative ">
          <div>
            <Menu.Button className="ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>
              <div
                className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                style={{ backgroundImage: `url(${user.avatar})` }} 
              >
                <span className="sr-only">{user.name}</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-0.5 bg-white--color ring-1 ring-black ring-opacity-5 focus:outline-none text-primary--color text-xs">
              <Menu.Item>
                <div className="flex px-4 py-2">MNV: {user.employeeId}</div>
              </Menu.Item>
              <Menu.Item>
                <div className="px-4 py-1">Chức vụ: {user.position}</div>
              </Menu.Item>
              <Menu.Item>
                <div className="px-4 py-1">Họ tên: {user.name}</div>
              </Menu.Item>
              <Menu.Item>
                <div className="px-4 py-1">Giới tính: {user.gender}</div>
              </Menu.Item>
              <Menu.Item>
                <div className="px-4 py-1">Ngày sinh: {user.birthDate}</div>
              </Menu.Item>
              <Menu.Item>
                <div className="px-4 py-1">Số điện thoại: {user.phoneNumber}</div>
              </Menu.Item>
              <Menu.Item>
                <div className="px-4 py-1">Địa chỉ: {user.address}</div>
              </Menu.Item>
              
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
