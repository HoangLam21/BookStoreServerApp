import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

import { LayoutContext } from '../../Shared/userLayoutTitle';
import StaffDetail from './StaffDetail';


const STAFFALL_URL = 'http://167.172.69.8:8010/BookStore/staff/all';


export default function Staff() {
  const [staff, setStaff] = useState(null);

  const { setTitle } = React.useContext(LayoutContext);
  React.useEffect(() => {
    setTitle('Staff')
  }, [])



  // Drawer
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  return (
    <div style={{ flex: 1 }}>
      <StaffDetail/>
      <div className="row flex-1 float-right mr-2">

      <button className="bg-primary--color m-2 text-[#fff] font-bold py-2 px-4 rounded" onClick={handleDrawerOpen}>Open Editing</button>

      {/* DRAWER */}
      <div className="flex-1">
        <div className="flex">
          <div className=" w-2/5">
            <div
              className={`fixed inset-0 bg-[#33333333] bg-opacity-50 z-50 transition-opacity ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />
              <div
                style={{ background: 'white' }}
                className={`fixed inset-y-0 right-0 w-2/5 bg-white z-50 rounded-2xl transform transition-transform ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
              >
                  {/* Drawer content */}
                <div className=" mt-2 ml-3 text-base text-primary--color p-3">Chỉnh sửa thông tin nhân viên</div>
                <div className=" ml-4 font-medium w-11/12 text-lg text-primary--color border-b"></div>
                        
                <div className='p-4'>
                  <div className="setting-content flex flex-row w-full h-2/3">
                    <div className=' w-1/3 h-3/4 mt-3'>
                      <img
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff5fb3e4398b2a12b0c4655308105d2cc5a933e58190585a1cefd3a7a4cb3277?apiKey=7b5a6c783f57430d80b4e963675be0fc&"
                          alt="avatar"
                          className="rounded-xl"
                      />
                    <button className=" border-2 ml-12 mt-5 m-2 text-header--lightcolor font-semibold py-2 px-4 rounded-full" onClick={handleDrawerClose}>
                        Sửa ảnh
                    </button>                
                  </div>
                      <div className="content-staffinf flex-1 h-3/4 flex flex-col ml-2 w-4/6">
                          <div className="m-2 flex gap-1 text-primary--color">
                              <span className="text-header--lightcolor flex items-center">Mã nhân viên: </span>
                              <input type="text" className="m-2" value="huynh94" readOnly />
                          </div>
                          <div className="m-2 flex gap-1 text-primary--color">
                              <span className="text-header--lightcolor flex items-center">Họ và tên: </span>
                              <input type="text" className="m-2" value="huynh huynh" />
                          </div>
                          <div className="m-2 flex gap-1 text-primary--color">
                          <span className="text-header--lightcolor flex items-center">Giới tính: </span>
                          <select className="m-2">
                            <option value="nu">Nữ</option>
                            <option value="nam">Nam</option>
                            <option value="khongrone">Không rõ</option>
                          </select>
                        </div>
                          <div className="m-2 flex gap-1 text-primary--color">
                              <span className="text-header--lightcolor flex items-center">Ngày sinh: </span>
                              <input type="text" className="m-2" value="13/07/2004" />
                          </div>
                          <div className="m-2 flex gap-1 text-primary--color">
                              <span className="text-header--lightcolor flex items-center">Số điện thoại: </span>
                              <input type="text" className="m-2" value="0987654321" />
                          </div>
                          <div className="m-2 flex gap-1 text-primary--color">
                              <div className="w-20">
                                  <span className="text-header--lightcolor flex items-center">Địa chỉ: </span>
                              </div>
                              <textarea
                                  type="text"
                                  className="m-2 -mt-1"
                                  value="Tổ 1, ấp Tân sơn, xã Ngũ Hiệp, huyện Cai Lậy, tỉnh Tiền Giang"
                              />
                          </div>
                      </div>
                    </div>
                      {/* JobInforEdit */}
                      <div className="z-10 w-full mt-2 max-md:max-w-full">
                          <div className="font-medium text-lg text-primary--color border-b w-full h-5"></div>
                          <div className=" text-base text-primary--color p-3">Chỉnh sửa thông tin làm việc</div>
                          <div className="font-medium text-lg text-primary--color border-b w-full"></div>
                          
                          <div className="content-jobinfor ml-9 flex-1 w-full flex-col pt-2">
                              <div className="m-2 flex gap-1 text-primary--color">
                                <div className='w-30'>
                                  <span className="text-header--lightcolor flex items-center">Chức vụ: </span>
                                </div>  
                                  <input type="text" className="m-2 -mt-0" value="Nhân viên" />
                              </div>
                              <div className="m-2 flex gap-1 text-primary--color">
                                <div className='w-15'>
                                  <span className="text-header--lightcolor flex items-center">Ngày vào làm: </span>
                                </div>  
                                  <input type="text" className="m-2 -mt-0" value="14/07/2020" />
                              </div>
                              <div className="m-2 flex gap-1 text-primary--color">
                                  <span className="text-header--lightcolor flex items-center">Lương: </span>
                                  <input type="text" className="m-2" value="10,000,000 vnđ" />
                              </div>
                              <div className="m-2 flex gap-1 text-primary--color">
                                  <span className="text-header--lightcolor flex items-center">Quản lý chi nhánh: </span>
                                  <input type="text" className="m-2" value="Duong Han" />
                              </div>
                          </div>
                      </div>
                  </div>
                <button className="bg-primary--color m-2 text-[#fff] font-bold py-2 px-4 rounded" onClick={handleDrawerClose}>
                  Close Editing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div >
  </div>
    
  );
}